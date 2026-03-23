#!/usr/bin/env node

/**
 * AIOS-Law — Validate Agents
 * Verifica se todos os arquivos de agente possuem as seções obrigatórias
 * e se os metadados estão consistentes com o framework-config.yaml.
 *
 * Uso: npm run validate:agents
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const AGENTS_DIR = path.join(ROOT, '.aios-law/law-practice/agents');
const FRAMEWORK_CFG = path.join(ROOT, '.aios-law/framework-config.yaml');

// ─── Seções obrigatórias em cada agent .md ──────────────────────────
const REQUIRED_SECTIONS = [
  'Identity',
  'Persona',
  'Scope',
  'Principles',
  'Activation Flow',
  'Commands',
  'Delegation Matrix',
  'Tools',
  'Restrictions',
  'Dependencies',
];

// ─── Campos obrigatórios no bloco Identity (YAML) ──────────────────
const REQUIRED_IDENTITY_FIELDS = ['name', 'id', 'title', 'icon', 'tone', 'greeting'];

// ─── Helpers ────────────────────────────────────────────────────────

function extractSections(content) {
  const headings = [];
  for (const line of content.split('\n')) {
    const match = line.match(/^##\s+(.+)/);
    if (match) headings.push(match[1].trim());
  }
  return headings;
}

function extractIdentityBlock(content) {
  const match = content.match(/```yaml\n([\s\S]*?)```/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*"?(.+?)"?\s*$/);
    if (kv) fields[kv[1]] = kv[2];
  }
  return fields;
}

function parseRegisteredAgents() {
  try {
    const raw = fs.readFileSync(FRAMEWORK_CFG, 'utf-8');
    const ids = [];
    let inAgents = false;
    for (const line of raw.split('\n')) {
      if (line.match(/^\s+available:/)) { inAgents = true; continue; }
      if (inAgents && line.match(/^\s+-\s+id:\s+(\S+)/)) {
        ids.push(RegExp.$1);
      }
      if (inAgents && /^\w/.test(line)) break;
    }
    return ids;
  } catch { return []; }
}

// ─── Main ───────────────────────────────────────────────────────────

function validate() {
  const errors = [];
  const warnings = [];
  let agentCount = 0;

  if (!fs.existsSync(AGENTS_DIR)) {
    console.error('❌ Diretório de agentes não encontrado:', AGENTS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
  const registeredIds = parseRegisteredAgents();

  for (const file of files) {
    agentCount++;
    const filePath = path.join(AGENTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const sections = extractSections(content);
    const identity = extractIdentityBlock(content);

    // Verificar seções obrigatórias
    for (const req of REQUIRED_SECTIONS) {
      if (!sections.some(s => s.toLowerCase().includes(req.toLowerCase()))) {
        errors.push(`[${file}] Seção obrigatória ausente: "${req}"`);
      }
    }

    // Verificar bloco Identity
    if (!identity) {
      errors.push(`[${file}] Bloco Identity (YAML) não encontrado`);
    } else {
      for (const field of REQUIRED_IDENTITY_FIELDS) {
        if (!identity[field]) {
          errors.push(`[${file}] Campo obrigatório ausente no Identity: "${field}"`);
        }
      }

      // Verificar se o id está registrado no framework-config
      if (identity.id && registeredIds.length > 0 && !registeredIds.includes(identity.id)) {
        warnings.push(`[${file}] Agente "${identity.id}" não está registrado em framework-config.yaml`);
      }
    }

    // Verificar se tem pelo menos 1 comando
    const hasCommands = content.includes('| `*');
    if (!hasCommands) {
      warnings.push(`[${file}] Nenhum comando (*command) encontrado`);
    }

    // Verificar se há restrições NUNCA/SEMPRE
    const hasRestrictions = content.includes('**NUNCA**') || content.includes('**SEMPRE**');
    if (!hasRestrictions) {
      warnings.push(`[${file}] Nenhuma restrição NUNCA/SEMPRE encontrada`);
    }
  }

  // Verificar agentes registrados sem arquivo
  for (const id of registeredIds) {
    const expectedFile = `${id}.md`;
    if (!files.includes(expectedFile)) {
      errors.push(`[framework-config] Agente registrado "${id}" sem arquivo: ${expectedFile}`);
    }
  }

  // ─── Output ─────────────────────────────────────────────────────
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║       AIOS-Law — Validação de Agentes       ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Agentes encontrados: ${agentCount}`);
  console.log(`  Registrados no framework: ${registeredIds.length}`);
  console.log('');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('  ✅ Todos os agentes estão válidos!\n');
    process.exit(0);
  }

  if (errors.length > 0) {
    console.log(`  ❌ ERROS (${errors.length}):`);
    for (const e of errors) console.log(`     • ${e}`);
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
