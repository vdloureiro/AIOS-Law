#!/usr/bin/env node

/**
 * AIOS-Law CLI
 * Ponto de entrada principal — npx aios-law <comando>
 *
 * Comandos:
 *   init     Instalar e configurar o framework (onboarding)
 *   doctor   Verificar saúde do projeto
 *   info     Exibir informações do projeto
 *   export   Exportar documento para Word (.docx)
 */

const path = require('path');
const command = process.argv[2];

const COMMANDS = {
  init: '.aios-law/scripts/init.js',
  doctor: 'aios-law.js',
  info: 'aios-law.js',
  export: '.aios-law/scripts/export-docx.js',
};

function showHelp() {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║              AIOS-Law CLI v1.0.0             ║');
  console.log('  ║   Framework Multi-Agente para Advocacia BR   ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
  console.log('  Uso: npx aios-law <comando>');
  console.log('');
  console.log('  Comandos:');
  console.log('    init       Instalar e configurar o AIOS-Law (onboarding interativo)');
  console.log('    doctor     Verificar saúde do projeto');
  console.log('    info       Exibir informações do projeto');
  console.log('    export     Exportar documento Markdown para Word (.docx)');
  console.log('');
  console.log('  Exemplos:');
  console.log('    npx aios-law init');
  console.log('    npx aios-law doctor');
  console.log('    npx aios-law export docs/cases/peticao.md');
  console.log('');
  process.exit(0);
}

if (!command || command === '--help' || command === '-h') {
  showHelp();
}

switch (command) {
  case 'init': {
    const initPath = path.resolve(__dirname, '..', COMMANDS.init);
    require(initPath);
    break;
  }
  case 'doctor': {
    process.argv[2] = 'doctor';
    require(path.resolve(__dirname, 'aios-law.js'));
    break;
  }
  case 'info': {
    process.argv[2] = 'info';
    require(path.resolve(__dirname, 'aios-law.js'));
    break;
  }
  case 'export': {
    const exportPath = path.resolve(__dirname, '..', COMMANDS.export);
    require(exportPath);
    break;
  }
  default:
    console.error(`\n  ❌ Comando desconhecido: "${command}"\n`);
    showHelp();
}
