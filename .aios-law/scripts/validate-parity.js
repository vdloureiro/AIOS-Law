#!/usr/bin/env node

/**
 * AIOS-Law — Validate Parity
 * Verifica se os agentes sincronizados nos diretórios IDE estão
 * atualizados em relação à source (.aios-law/law-practice/agents/).
 *
 * Uso: npm run validate:parity
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '../..');
const AGENTS_DIR = path.join(ROOT, '.aios-law/law-practice/agents');

// ─── Targets (espelha sync-ide.js) ─────────────────────────────────

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

// ─── Helpers ────────────────────────────────────────────────────────

function hash(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
}

function getSourceFiles() {
  if (!fs.existsSync(AGENTS_DIR)) return [];
  return fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
}

function getTargetFiles(targetPath) {
  const fullPath = path.join(ROOT, targetPath);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter(f => f.endsWith('.md'));
}

// ─── Main ───────────────────────────────────────────────────────────

function validate() {
  const errors = [];
  const warnings = [];
  const sourceFiles = getSourceFiles();

  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║      AIOS-Law — Validação de Paridade       ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Source: ${AGENTS_DIR}`);
  console.log(`  Agentes na source: ${sourceFiles.length}`);
  console.log('');

  for (const [name, config] of Object.entries(TARGETS)) {
    const targetDir = path.join(ROOT, config.path);

    if (!fs.existsSync(targetDir)) {
      warnings.push(`[${name}] Diretório não encontrado: ${config.path} (execute npm run sync:ide primeiro)`);
      continue;
    }

    const targetFiles = getTargetFiles(config.path);
    console.log(`  📂 ${name} (${config.path})`);

    // Para full-markdown-yaml, comparamos conteúdo direto
    // Para condensed-rules, verificamos apenas se os arquivos existem
    const isFullFormat = config.format === 'full-markdown-yaml';

    // Verificar agentes faltantes no target
    for (const file of sourceFiles) {
      if (!targetFiles.includes(file)) {
        errors.push(`[${name}] Agente ausente no target: ${file}`);
        continue;
      }

      if (isFullFormat) {
        const sourceContent = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf-8');
        const targetContent = fs.readFileSync(path.join(targetDir, file), 'utf-8');
        const sourceHash = hash(sourceContent);
        const targetHash = hash(targetContent);

        if (sourceHash !== targetHash) {
          errors.push(`[${name}] Drift detectado em ${file} (source: ${sourceHash}, target: ${targetHash})`);
        }
      }
    }

    // Verificar agentes órfãos no target (existem no target mas não na source)
    for (const file of targetFiles) {
      if (file === '.gitkeep') continue;
      if (!sourceFiles.includes(file)) {
        warnings.push(`[${name}] Arquivo órfão no target: ${file}`);
      }
    }

    const missing = sourceFiles.filter(f => !targetFiles.includes(f));
    const synced = sourceFiles.length - missing.length;
    console.log(`     ${synced}/${sourceFiles.length} agentes sincronizados`);
  }

  // ─── Output ─────────────────────────────────────────────────────
  console.log('');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('  ✅ Paridade OK! Todos os targets estão sincronizados.\n');
    process.exit(0);
  }

  if (errors.length > 0) {
    console.log(`  ❌ ERROS (${errors.length}):`);
    for (const e of errors) console.log(`     • ${e}`);
    console.log('');
    console.log('  💡 Execute "npm run sync:ide" para corrigir.');
    console.log('');
  }

  if (warnings.length > 0) {
    console.log(`  ⚠️  AVISOS (${warnings.length}):`);
    for (const w of warnings) console.log(`     • ${w}`);
    console.log('');
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

validate();
