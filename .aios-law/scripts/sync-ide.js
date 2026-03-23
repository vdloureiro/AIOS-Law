#!/usr/bin/env node

/**
 * AIOS-Law — Sync IDE
 * Sincroniza definições de agentes para formatos específicos de cada IDE.
 * Lê de .aios-law/law-practice/agents/ e escreve nos diretórios-alvo.
 *
 * Uso:
 *   npm run sync:ide            # Sincroniza todos os targets
 *   npm run sync:ide:claude     # Apenas Claude Code
 *   npm run sync:ide:cursor     # Apenas Cursor
 *   npm run sync:ide:codex      # Apenas Codex
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const AGENTS_DIR = path.join(ROOT, '.aios-law/law-practice/agents');
const FRAMEWORK_CFG = path.join(ROOT, '.aios-law/framework-config.yaml');

// ─── Targets ────────────────────────────────────────────────────────

const TARGETS = {
  'claude-code': {
    path: '.claude/commands/AIOS-Law/agents',
    format: 'full-markdown-yaml',
  },
  cursor: {
    path: '.cursor/rules/agents',
    format: 'condensed-rules',
  },
  codex: {
    path: '.codex/agents',
    format: 'full-markdown-yaml',
  },
  gemini: {
    path: '.gemini/rules/AIOS-Law/agents',
    format: 'full-markdown-yaml',
  },
};

// ─── Formatters ─────────────────────────────────────────────────────

function formatFullMarkdownYaml(content, _filename) {
  // Full copy — preserva o markdown completo do agente
  return content;
}

function formatCondensedRules(content, filename) {
  // Extrai apenas: Identity, Scope, Principles, Commands, Restrictions
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let currentLines = [];
  let keepSection = false;

  const keepSections = ['identity', 'scope', 'principles', 'commands', 'restrictions'];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)/);
    if (headingMatch) {
      if (keepSection && currentSection) {
        sections.push({ heading: currentSection, lines: [...currentLines] });
      }
      currentSection = headingMatch[1].trim();
      currentLines = [line];
      keepSection = keepSections.some(s => currentSection.toLowerCase().includes(s));
      continue;
    }
    if (currentSection) currentLines.push(line);
  }
  if (keepSection && currentSection) {
    sections.push({ heading: currentSection, lines: [...currentLines] });
  }

  // Extrair título do agente da primeira linha
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : filename.replace('.md', '');

  let output = `# ${title}\n\n`;
  output += `> Condensed rules — gerado automaticamente por sync-ide.js\n`;
  output += `> Source: .aios-law/law-practice/agents/${filename}\n\n`;
  output += '---\n\n';

  for (const section of sections) {
    output += section.lines.join('\n') + '\n\n---\n\n';
  }

  return output.trim() + '\n';
}

const FORMATTERS = {
  'full-markdown-yaml': formatFullMarkdownYaml,
  'condensed-rules': formatCondensedRules,
};

// ─── Sync Logic ─────────────────────────────────────────────────────

function syncTarget(targetName, targetConfig) {
  const targetDir = path.join(ROOT, targetConfig.path);
  const formatter = FORMATTERS[targetConfig.format];

  if (!formatter) {
    console.error(`  ❌ Formato desconhecido: ${targetConfig.format}`);
    return { synced: 0, errors: 1 };
  }

  // Criar diretório-alvo se não existir
  fs.mkdirSync(targetDir, { recursive: true });

  const agentFiles = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
  let synced = 0;
  let errors = 0;

  for (const file of agentFiles) {
    try {
      const content = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf-8');
      const formatted = formatter(content, file);
      const destPath = path.join(targetDir, file);
      fs.writeFileSync(destPath, formatted, 'utf-8');
      synced++;
    } catch (err) {
      console.error(`  ❌ Erro ao sincronizar ${file}: ${err.message}`);
      errors++;
    }
  }

  return { synced, errors };
}

// ─── CLI ────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const targetFlag = args.find(a => a.startsWith('--target'));
  let selectedTarget = null;

  if (targetFlag) {
    const idx = args.indexOf(targetFlag);
    if (targetFlag.includes('=')) {
      selectedTarget = targetFlag.split('=')[1];
    } else if (args[idx + 1]) {
      selectedTarget = args[idx + 1];
    }
  }

  if (!fs.existsSync(AGENTS_DIR)) {
    console.error('❌ Diretório de agentes não encontrado:', AGENTS_DIR);
    process.exit(1);
  }

  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║         AIOS-Law — Sync IDE Agents          ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');

  const agentCount = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md')).length;
  console.log(`  Agentes na source: ${agentCount}`);
  console.log('');

  const targetsToSync = selectedTarget
    ? { [selectedTarget]: TARGETS[selectedTarget] }
    : TARGETS;

  if (selectedTarget && !TARGETS[selectedTarget]) {
    console.error(`  ❌ Target desconhecido: "${selectedTarget}"`);
    console.error(`  Targets disponíveis: ${Object.keys(TARGETS).join(', ')}`);
    process.exit(1);
  }

  let totalSynced = 0;
  let totalErrors = 0;

  for (const [name, config] of Object.entries(targetsToSync)) {
    console.log(`  📂 ${name} → ${config.path} (${config.format})`);
    const result = syncTarget(name, config);
    console.log(`     ✅ ${result.synced} agentes sincronizados${result.errors ? `, ❌ ${result.errors} erros` : ''}`);
    totalSynced += result.synced;
    totalErrors += result.errors;
  }

  console.log('');
  console.log(`  Total: ${totalSynced} sincronizados, ${totalErrors} erros`);
  console.log('');

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
