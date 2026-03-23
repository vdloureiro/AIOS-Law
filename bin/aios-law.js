#!/usr/bin/env node

/**
 * AIOS-Law CLI
 * Comandos de diagnóstico e informação do framework.
 *
 * Uso:
 *   npm run doctor   → Verifica saúde do projeto
 *   npm run info     → Exibe informações do projeto
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ─── Helpers ────────────────────────────────────────────────────────

function fileExists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function dirExists(relativePath) {
  const full = path.join(ROOT, relativePath);
  return fs.existsSync(full) && fs.statSync(full).isDirectory();
}

function countFiles(relativePath, ext = '.md') {
  const full = path.join(ROOT, relativePath);
  if (!fs.existsSync(full)) return 0;
  return fs.readdirSync(full).filter(f => f.endsWith(ext)).length;
}

function readYamlField(filePath, fieldPath) {
  try {
    const content = fs.readFileSync(path.join(ROOT, filePath), 'utf-8');
    // Simple YAML value extraction (no dependency needed)
    for (const line of content.split('\n')) {
      const match = line.match(new RegExp(`^\\s*${fieldPath}:\\s*"?(.+?)"?\\s*$`));
      if (match) return match[1];
    }
  } catch { /* ignore */ }
  return null;
}

// ─── Doctor Command ─────────────────────────────────────────────────

function doctor() {
  const checks = [];
  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;

  function pass(msg) { checks.push({ status: '✅', msg }); passCount++; }
  function fail(msg) { checks.push({ status: '❌', msg }); failCount++; }
  function warn(msg) { checks.push({ status: '⚠️ ', msg }); warnCount++; }

  // ─── Core Files ───────────────────────────────────────────────
  const coreFiles = [
    ['.aios-law/constitution.md', 'Constituição'],
    ['.aios-law/core-config.yaml', 'Core Config'],
    ['.aios-law/framework-config.yaml', 'Framework Config'],
    ['.aios-law/project-config.yaml', 'Project Config'],
    ['.aios-law/user-guide.md', 'User Guide'],
    ['CLAUDE.md', 'CLAUDE.md'],
    ['package.json', 'package.json'],
  ];

  for (const [filePath, label] of coreFiles) {
    fileExists(filePath) ? pass(`${label}`) : fail(`${label} não encontrado (${filePath})`);
  }

  // ─── Directories ──────────────────────────────────────────────
  const dirs = [
    ['.aios-law/law-practice/agents', 'Agentes'],
    ['.aios-law/law-practice/agent-teams', 'Agent Teams'],
    ['.aios-law/law-practice/tasks', 'Tasks'],
    ['.aios-law/law-practice/templates', 'Templates'],
    ['.aios-law/law-practice/workflows', 'Workflows'],
    ['.aios-law/law-practice/checklists', 'Checklists'],
    ['.aios-law/schemas', 'Schemas'],
    ['.aios-law/scripts', 'Scripts'],
    ['docs/cases', 'Diretório de Casos'],
    ['docs/knowledge-base', 'Knowledge Base'],
    ['.ai', 'Diretório .ai'],
    ['.ai/workflow-state', 'Workflow State'],
    ['squads', 'Squads'],
  ];

  for (const [dirPath, label] of dirs) {
    dirExists(dirPath) ? pass(`${label}`) : fail(`${label} não encontrado (${dirPath})`);
  }

  // ─── Agents ───────────────────────────────────────────────────
  const agentCount = countFiles('.aios-law/law-practice/agents');
  if (agentCount >= 11) pass(`${agentCount} agentes definidos`);
  else if (agentCount > 0) warn(`Apenas ${agentCount} agentes (esperado: 11)`);
  else fail('Nenhum agente encontrado');

  // ─── Tasks ────────────────────────────────────────────────────
  const taskDirs = ['intake', 'analise', 'pesquisa', 'redacao', 'revisao', 'gestao'];
  let totalTasks = 0;
  for (const dir of taskDirs) {
    const count = countFiles(`.aios-law/law-practice/tasks/${dir}`);
    totalTasks += count;
    if (count === 0) warn(`Nenhuma task em tasks/${dir}/`);
  }
  pass(`${totalTasks} tasks definidas`);

  // ─── Quality Gates ────────────────────────────────────────────
  const gates = [
    'revisao/revisar-fundamentacao.md',
    'revisao/revisar-conformidade-oab.md',
    'revisao/revisar-prazos.md',
    'revisao/revisar-coerencia.md',
    'revisao/revisar-formatacao.md',
  ];
  for (const gate of gates) {
    const name = path.basename(gate, '.md');
    fileExists(`.aios-law/law-practice/tasks/${gate}`)
      ? pass(`Quality gate: ${name}`)
      : fail(`Quality gate ausente: ${gate}`);
  }

  // ─── Workflows ────────────────────────────────────────────────
  const workflows = countFiles('.aios-law/law-practice/workflows', '.yaml');
  if (workflows >= 5) pass(`${workflows} workflows definidos`);
  else warn(`Apenas ${workflows} workflows (esperado: 5)`);

  // ─── Templates ────────────────────────────────────────────────
  let templateCount = 0;
  const templateDirs = ['peticoes', 'pareceres', 'contratos', 'trabalhista', 'penal', 'extrajudicial', 'execucao', 'procuracoes', 'squad-template'];
  for (const dir of templateDirs) {
    templateCount += countFiles(`.aios-law/law-practice/templates/${dir}`);
  }
  // Contar templates na raiz do diretório templates
  templateCount += countFiles('.aios-law/law-practice/templates');
  pass(`${templateCount} templates definidos`);

  // ─── Infrastructure ───────────────────────────────────────────
  fileExists('.ai/debug-log.md') ? pass('Debug log') : warn('Debug log não encontrado');
  fileExists('.ai/audit-trail.md') ? pass('Audit trail') : warn('Audit trail não encontrado');

  // ─── Project Config Completeness ──────────────────────────────
  const officeName = readYamlField('.aios-law/project-config.yaml', 'name');
  if (officeName && officeName !== 'Escritório de Advocacia') {
    pass('Escritório configurado');
  } else {
    warn('project-config.yaml: nome do escritório não personalizado');
  }

  // ─── Output ─────────────────────────────────────────────────
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║        AIOS-Law — Diagnóstico (Doctor)      ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');

  for (const { status, msg } of checks) {
    console.log(`  ${status} ${msg}`);
  }

  console.log('');
  console.log('  ──────────────────────────────────────────');
  console.log(`  ✅ ${passCount} OK   ⚠️  ${warnCount} Avisos   ❌ ${failCount} Erros`);
  console.log('');

  if (failCount > 0) {
    console.log('  💡 Corrija os erros acima para garantir o funcionamento do framework.');
    console.log('');
  } else if (warnCount > 0) {
    console.log('  💡 O framework está funcional. Corrija os avisos para completude total.');
    console.log('');
  } else {
    console.log('  🎉 Projeto em perfeita saúde!');
    console.log('');
  }

  process.exit(failCount > 0 ? 1 : 0);
}

// ─── Info Command ───────────────────────────────────────────────────

function info() {
  const version = readYamlField('.aios-law/framework-config.yaml', 'version') || '?';
  const officeName = readYamlField('.aios-law/project-config.yaml', 'name') || 'Não configurado';
  const state = readYamlField('.aios-law/project-config.yaml', 'defaultState') || '?';
  const model = readYamlField('.aios-law/project-config.yaml', 'defaultModel') || '?';
  const team = readYamlField('.aios-law/project-config.yaml', 'activeTeam') || '?';

  const agentCount = countFiles('.aios-law/law-practice/agents');
  const workflowCount = countFiles('.aios-law/law-practice/workflows', '.yaml');
  const teamCount = countFiles('.aios-law/law-practice/agent-teams', '.yaml');
  const squadCount = fs.existsSync(path.join(ROOT, 'squads'))
    ? fs.readdirSync(path.join(ROOT, 'squads')).filter(d =>
        fs.statSync(path.join(ROOT, 'squads', d)).isDirectory()
      ).length
    : 0;

  let taskCount = 0;
  const taskDirs = ['intake', 'analise', 'pesquisa', 'redacao', 'revisao', 'gestao'];
  for (const dir of taskDirs) taskCount += countFiles(`.aios-law/law-practice/tasks/${dir}`);

  let templateCount = 0;
  const tplDirs = ['peticoes', 'pareceres', 'contratos', 'trabalhista', 'penal', 'extrajudicial', 'execucao', 'procuracoes'];
  for (const dir of tplDirs) templateCount += countFiles(`.aios-law/law-practice/templates/${dir}`);
  templateCount += countFiles('.aios-law/law-practice/templates');

  const checklistCount = countFiles('.aios-law/law-practice/checklists');
  const kbCount = countFiles('docs/knowledge-base');

  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║          AIOS-Law — Informações             ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Nome:        AIOS-Law`);
  console.log(`  Versão:      ${version}`);
  console.log(`  Escritório:  ${officeName}`);
  console.log(`  Estado:      ${state}`);
  console.log(`  Modelo IA:   ${model}`);
  console.log(`  Team ativa:  ${team}`);
  console.log('');
  console.log('  ─── Componentes ──────────────────────────');
  console.log(`  Agentes:     ${agentCount}`);
  console.log(`  Teams:       ${teamCount}`);
  console.log(`  Squads:      ${squadCount}`);
  console.log(`  Workflows:   ${workflowCount}`);
  console.log(`  Tasks:       ${taskCount}`);
  console.log(`  Templates:   ${templateCount}`);
  console.log(`  Checklists:  ${checklistCount}`);
  console.log(`  Knowledge:   ${kbCount} referências`);
  console.log('');
}

// ─── CLI Router ─────────────────────────────────────────────────────

const command = process.argv[2];

switch (command) {
  case 'doctor':
    doctor();
    break;
  case 'info':
    info();
    break;
  default:
    console.log('');
    console.log('  AIOS-Law CLI');
    console.log('');
    console.log('  Comandos:');
    console.log('    doctor   Verifica saúde do projeto');
    console.log('    info     Exibe informações do projeto');
    console.log('');
    console.log('  Uso: node bin/aios-law.js <comando>');
    console.log('');
    process.exit(1);
}
