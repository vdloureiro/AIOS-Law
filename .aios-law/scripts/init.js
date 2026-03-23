#!/usr/bin/env node

/**
 * AIOS-Law — Init & Onboarding
 * Wizard interativo para configurar o framework para o escritório.
 *
 * Uso: npx aios-law init
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '../..');
const PROJECT_CFG = path.join(ROOT, '.aios-law/project-config.yaml');
const ESCRITORIO_CFG = path.join(ROOT, '.aios-law/escritorio.yaml');
const BRANDING_DIR = path.join(ROOT, '.aios-law/escritorio');

// ─── Helpers ────────────────────────────────────────────────────────

function ask(rl, question, defaultValue) {
  const suffix = defaultValue ? ` (${defaultValue})` : '';
  return new Promise((resolve) => {
    rl.question(`  ${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

function askYN(rl, question, defaultYes = true) {
  const hint = defaultYes ? '[S/n]' : '[s/N]';
  return new Promise((resolve) => {
    rl.question(`  ${question} ${hint}: `, (answer) => {
      const a = answer.trim().toLowerCase();
      if (!a) return resolve(defaultYes);
      resolve(a === 's' || a === 'sim' || a === 'y' || a === 'yes');
    });
  });
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const ESTADOS = {
  AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá',
  BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo',
  GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul',
  MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco',
  PI: 'Piauí', PR: 'Paraná', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
  RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul', SC: 'Santa Catarina',
  SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins',
};

const AREAS = [
  'civil', 'trabalhista', 'penal', 'tributario', 'empresarial',
  'administrativo', 'consumidor', 'familia', 'previdenciario',
  'ambiental', 'digital', 'imobiliario', 'eleitoral', 'bancario',
  'internacional', 'saude', 'agrario', 'militar', 'maritimo',
  'desportivo', 'propriedade-intelectual',
];

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('');
  console.log('  ╔══════════════════════════════════════════════════════════╗');
  console.log('  ║           AIOS-Law — Configuração do Escritório         ║');
  console.log('  ║      Framework Multi-Agente para Advocacia Brasileira   ║');
  console.log('  ╚══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('  Vamos configurar o AIOS-Law para o seu escritório.');
  console.log('  Pressione ENTER para aceitar o valor padrão entre parênteses.');
  console.log('');

  // ─── 1. Dados do Escritório ─────────────────────────────────────
  console.log('  ─── Dados do Escritório ───────────────────────────────');
  console.log('');

  const officeName = await ask(rl, 'Nome do escritório', 'Escritório de Advocacia');
  const cnpj = await ask(rl, 'CNPJ (ou deixe vazio)');
  const state = await ask(rl, 'Estado (sigla, ex: SP)', 'SP');
  const city = await ask(rl, 'Cidade', 'São Paulo');
  const address = await ask(rl, 'Endereço completo do escritório');
  const phone = await ask(rl, 'Telefone');
  const email = await ask(rl, 'E-mail do escritório');
  const website = await ask(rl, 'Website (ou deixe vazio)');

  console.log('');

  // ─── 2. Advogados Responsáveis ──────────────────────────────────
  console.log('  ─── Advogados Responsáveis ─────────────────────────────');
  console.log('');

  const lawyers = [];
  let addMore = true;

  while (addMore) {
    const lawyerName = await ask(rl, `Nome do advogado(a) ${lawyers.length + 1}`);
    if (!lawyerName) break;

    const oab = await ask(rl, `OAB (ex: SP 123.456)`);
    const lawyerEmail = await ask(rl, `E-mail`);
    const lawyerAreas = await ask(rl, `Áreas de atuação (separadas por vírgula)`, 'civil, empresarial');

    lawyers.push({
      name: lawyerName,
      oab,
      email: lawyerEmail,
      areas: lawyerAreas.split(',').map(a => a.trim()),
    });

    console.log(`  ✅ ${lawyerName} (OAB ${oab}) adicionado(a).`);
    addMore = await askYN(rl, 'Adicionar outro advogado?', false);
  }

  console.log('');

  // ─── 3. Áreas de Atuação ───────────────────────────────────────
  console.log('  ─── Áreas de Atuação ──────────────────────────────────');
  console.log('  Áreas disponíveis:');
  console.log(`  ${AREAS.join(', ')}`);
  console.log('');

  const areasInput = await ask(rl, 'Suas áreas (separadas por vírgula)', 'civil, trabalhista, empresarial');
  const selectedAreas = areasInput.split(',').map(a => a.trim().toLowerCase());

  console.log('');

  // ─── 4. Branding (Papel Timbrado) ──────────────────────────────
  console.log('  ─── Papel Timbrado & Logo ─────────────────────────────');
  console.log('');

  const hasLogo = await askYN(rl, 'Possui arquivo de logo?', false);
  let logoPath = '';
  if (hasLogo) {
    logoPath = await ask(rl, 'Caminho do arquivo de logo (PNG/JPG)');
  }

  const hasLetterhead = await askYN(rl, 'Possui papel timbrado em arquivo?', false);
  let letterheadPath = '';
  if (hasLetterhead) {
    letterheadPath = await ask(rl, 'Caminho do arquivo de papel timbrado (PNG/JPG/DOCX)');
  }

  console.log('');

  // ─── 5. Preferências de Documento ──────────────────────────────
  console.log('  ─── Preferências de Documento ─────────────────────────');
  console.log('');

  const font = await ask(rl, 'Fonte padrão', 'Arial');
  const fontSize = await ask(rl, 'Tamanho do texto (pt)', '11');
  const lineSpacing = await ask(rl, 'Espaçamento entre linhas', '1.5');

  console.log('');

  // ─── 6. Modelo de IA ───────────────────────────────────────────
  console.log('  ─── Modelo de IA ──────────────────────────────────────');
  console.log('');

  const aiModel = await ask(rl, 'Modelo padrão', 'claude-sonnet-4-5-20250929');
  const temperature = await ask(rl, 'Temperature (0.0 a 1.0, menor = mais preciso)', '0.2');

  console.log('');
  rl.close();

  // ─── Gerar Configuração ─────────────────────────────────────────

  console.log('  ─── Gerando configuração... ────────────────────────────');

  // Criar diretórios
  ensureDir(BRANDING_DIR);
  ensureDir(path.join(ROOT, 'docs/cases'));
  ensureDir(path.join(ROOT, 'docs/knowledge-base'));
  ensureDir(path.join(ROOT, '.ai/workflow-state'));

  // Copiar logo se fornecido
  if (logoPath && fs.existsSync(logoPath)) {
    const ext = path.extname(logoPath);
    fs.copyFileSync(logoPath, path.join(BRANDING_DIR, `logo${ext}`));
    console.log('  ✅ Logo copiado para .aios-law/escritorio/');
  }

  if (letterheadPath && fs.existsSync(letterheadPath)) {
    const ext = path.extname(letterheadPath);
    fs.copyFileSync(letterheadPath, path.join(BRANDING_DIR, `papel-timbrado${ext}`));
    console.log('  ✅ Papel timbrado copiado para .aios-law/escritorio/');
  }

  // Gerar escritorio.yaml
  const lawyersYaml = lawyers.map((l, i) => `
  - name: "${l.name}"
    oab: "${l.oab}"
    email: "${l.email}"
    areas: [${l.areas.map(a => `"${a}"`).join(', ')}]`).join('');

  const escritorioYaml = `# ─────────────────────────────────────────────────────────────────────
# AIOS-Law — Dados do Escritório
# Gerado automaticamente por: npx aios-law init
# Data: ${new Date().toISOString().split('T')[0]}
# ─────────────────────────────────────────────────────────────────────

escritorio:
  nome: "${officeName}"
  cnpj: "${cnpj}"
  estado: "${state}"
  cidade: "${city}"
  endereco: "${address}"
  telefone: "${phone}"
  email: "${email}"
  website: "${website}"

advogados:${lawyersYaml || '\n  []'}

areasAtuacao:
${selectedAreas.map(a => `  - ${a}`).join('\n')}

branding:
  logo: "${logoPath ? `escritorio/logo${path.extname(logoPath)}` : ''}"
  papelTimbrado: "${letterheadPath ? `escritorio/papel-timbrado${path.extname(letterheadPath)}` : ''}"

documentos:
  fonte: "${font}"
  tamanhoFonte: ${fontSize}
  espacamentoLinhas: ${lineSpacing}
  margens:
    superior: "3cm"
    inferior: "2cm"
    esquerda: "3cm"
    direita: "2cm"
  recuoParagrafo: "1.25cm"
  estilos:
    h1:
      fonte: "${font}"
      tamanho: 16
      negrito: true
      caixaAlta: true
    h2:
      fonte: "${font}"
      tamanho: 14
      negrito: true
    h3:
      fonte: "${font}"
      tamanho: 12
      negrito: true
    corpo:
      fonte: "${font}"
      tamanho: ${fontSize}
      negrito: false

ia:
  modelo: "${aiModel}"
  temperature: ${temperature}
  maxTokens: 8192
`;

  fs.writeFileSync(ESCRITORIO_CFG, escritorioYaml, 'utf-8');
  console.log('  ✅ Configuração do escritório salva em .aios-law/escritorio.yaml');

  // Atualizar project-config.yaml
  const projectYaml = `# ─────────────────────────────────────────────────────────────────────
# AIOS-Law Project Configuration (Level 2 — Per Office)
# Gerado por: npx aios-law init — ${new Date().toISOString().split('T')[0]}
# ─────────────────────────────────────────────────────────────────────

office:
  name: "${officeName}"
  oabNumber: "${lawyers[0]?.oab || ''}"
  cnpj: "${cnpj}"
  state: "${state}"
  city: "${city}"
  areas:
${selectedAreas.map(a => `    - ${a}`).join('\n')}

# ─── Jurisdição Local ────────────────────────────────────────────────

jurisdiction:
  defaultState: "${state}"
  activeTribunals:
    estadual:
      - "TJ${state}"
    federal:
      - "${getTRF(state)}"
    trabalhista:
      - "${getTRT(state)}"

# ─── Advogados Responsáveis ──────────────────────────────────────────

lawyers:
${lawyers.map(l => `  - name: "${l.name}"
    oab: "${l.oab}"
    areas: [${l.areas.map(a => `"${a}"`).join(', ')}]
    email: "${l.email}"`).join('\n') || '  []'}

# ─── Active Agent Team ───────────────────────────────────────────────

activeTeam: "team-full"

# ─── Modelo de IA ────────────────────────────────────────────────────

ai:
  defaultModel: "${aiModel}"
  fallbackModel: "gpt-4o"
  temperature: ${temperature}
  maxTokens: 8192

# ─── Templates Preferences ──────────────────────────────────────────

templates:
  petitionHeader:
    showLogo: ${hasLogo}
    showOAB: true
    defaultFont: "${font}"
    fontSize: ${fontSize}
  formatting:
    lineSpacing: ${lineSpacing}
    margins: "3cm top, 2cm others"
    paragraphIndent: "1.25cm"

# ─── Integrations ───────────────────────────────────────────────────

integrations:
  pje:
    enabled: false
    url: ""
    certificate: ""
  esaj:
    enabled: false
    url: ""
`;

  fs.writeFileSync(PROJECT_CFG, projectYaml, 'utf-8');
  console.log('  ✅ Project config atualizado');

  // Sync IDE agents
  console.log('  ⏳ Sincronizando agentes para IDEs...');
  try {
    require('./sync-ide.js');
  } catch (e) { /* ignore sync errors during init */ }

  // Final
  console.log('');
  console.log('  ╔══════════════════════════════════════════════════════════╗');
  console.log('  ║            ✅ AIOS-Law configurado com sucesso!         ║');
  console.log('  ╚══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Escritório: ${officeName}`);
  console.log(`  Estado: ${ESTADOS[state] || state} (${state})`);
  console.log(`  Advogados: ${lawyers.length}`);
  console.log(`  Áreas: ${selectedAreas.join(', ')}`);
  console.log('');
  console.log('  Próximos passos:');
  console.log('    1. Abra o projeto no VS Code, Cursor ou sua IDE');
  console.log('    2. Ative o Claude Code ou assistente de IA');
  console.log('    3. Digite @intake *atender para iniciar um caso');
  console.log('');
  console.log('  Comandos úteis:');
  console.log('    npx aios-law doctor   — Verificar saúde do projeto');
  console.log('    npx aios-law info     — Ver informações do projeto');
  console.log('    npx aios-law export   — Exportar documento para Word');
  console.log('');
}

// ─── Helpers de Jurisdição ──────────────────────────────────────────

function getTRF(state) {
  const map = {
    AC: 'TRF1', AM: 'TRF1', AP: 'TRF1', BA: 'TRF1', DF: 'TRF1',
    GO: 'TRF1', MA: 'TRF1', MT: 'TRF1', PA: 'TRF1', PI: 'TRF1',
    RO: 'TRF1', RR: 'TRF1', TO: 'TRF1',
    ES: 'TRF2', RJ: 'TRF2',
    MS: 'TRF3', SP: 'TRF3',
    PR: 'TRF4', RS: 'TRF4', SC: 'TRF4',
    AL: 'TRF5', CE: 'TRF5', PB: 'TRF5', PE: 'TRF5', RN: 'TRF5', SE: 'TRF5',
    MG: 'TRF6',
  };
  return map[state] || 'TRF1';
}

function getTRT(state) {
  const map = {
    RJ: 'TRT1', SP: 'TRT2', MG: 'TRT3', RS: 'TRT4', BA: 'TRT5',
    PE: 'TRT6', CE: 'TRT7', PA: 'TRT8', PR: 'TRT9', DF: 'TRT10',
    AM: 'TRT11', SC: 'TRT12', PB: 'TRT13', RO: 'TRT14', AC: 'TRT14',
    MA: 'TRT16', ES: 'TRT17', GO: 'TRT18', AL: 'TRT19', SE: 'TRT20',
    RN: 'TRT21', PI: 'TRT22', MT: 'TRT23', MS: 'TRT24', AP: 'TRT8',
    RR: 'TRT11', TO: 'TRT10',
  };
  return map[state] || 'TRT1';
}

main().catch((err) => {
  console.error('  ❌ Erro durante configuração:', err.message);
  process.exit(1);
});
