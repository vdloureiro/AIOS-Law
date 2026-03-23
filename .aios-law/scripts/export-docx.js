#!/usr/bin/env node

/**
 * AIOS-Law — Exportar para Word (.docx)
 * Converte Markdown para documento Word formatado com padrões do escritório.
 *
 * Uso:
 *   npx aios-law export <arquivo.md> [destino.docx]
 *   npx aios-law export docs/cases/peticao.md
 */

const fs = require('fs');
const path = require('path');
const docx = require('docx');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '../..');
const ESCRITORIO_CFG = path.join(ROOT, '.aios-law/escritorio.yaml');

// ─── Carregar config do escritório ──────────────────────────────────

function loadConfig() {
  const defaults = {
    fonte: 'Arial',
    tamanhoFonte: 11,
    espacamentoLinhas: 1.5,
    escritorio: '',
    endereco: '',
    telefone: '',
    email: '',
    advogados: [],
  };

  try {
    const raw = fs.readFileSync(ESCRITORIO_CFG, 'utf-8');
    const getFld = (field) => {
      const m = raw.match(new RegExp(`${field}:\\s*"?(.+?)"?\\s*$`, 'm'));
      return m ? m[1] : '';
    };
    defaults.fonte = getFld('fonte') || 'Arial';
    defaults.tamanhoFonte = parseInt(getFld('tamanhoFonte')) || 11;
    defaults.espacamentoLinhas = parseFloat(getFld('espacamentoLinhas')) || 1.5;
    defaults.escritorio = getFld('nome') || '';
    defaults.endereco = getFld('endereco') || '';
    defaults.telefone = getFld('telefone') || '';
    defaults.email = getFld('email') || '';
  } catch { /* use defaults */ }

  return defaults;
}

// ─── Parser de Markdown ─────────────────────────────────────────────

function parseMarkdown(content) {
  const lines = content.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', text: line.replace(/^###\s+/, '') });
    }
    // Horizontal rule
    else if (line.match(/^---+\s*$/)) {
      elements.push({ type: 'hr' });
    }
    // Table row
    else if (line.startsWith('|') && line.endsWith('|')) {
      if (line.match(/^\|[\s-:|]+\|$/)) continue; // separator row
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
      elements.push({ type: 'table-row', cells });
    }
    // List item
    else if (line.match(/^[-*]\s/)) {
      elements.push({ type: 'list', text: line.replace(/^[-*]\s+/, '') });
    }
    // Numbered list
    else if (line.match(/^\d+[.)]\s/)) {
      elements.push({ type: 'numbered-list', text: line.replace(/^\d+[.)]\s+/, '') });
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push({ type: 'empty' });
    }
    // Regular text
    else {
      elements.push({ type: 'text', text: line });
    }
  }

  return elements;
}

// ─── Criar TextRuns com formatação inline ───────────────────────────

function createTextRuns(text, config) {
  const runs = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      runs.push(new docx.TextRun({
        text: part.slice(2, -2),
        bold: true,
        font: config.fonte,
        size: config.tamanhoFonte * 2,
      }));
    } else if (part) {
      runs.push(new docx.TextRun({
        text: part,
        font: config.fonte,
        size: config.tamanhoFonte * 2,
      }));
    }
  }

  return runs;
}

// ─── Gerar Documento ────────────────────────────────────────────────

function generateDocx(elements, config) {
  const children = [];
  let tableRows = [];

  function flushTable() {
    if (tableRows.length === 0) return;

    const rows = tableRows.map((row, idx) =>
      new docx.TableRow({
        children: row.cells.map(cell =>
          new docx.TableCell({
            children: [new docx.Paragraph({
              children: [new docx.TextRun({
                text: cell,
                bold: idx === 0,
                font: config.fonte,
                size: config.tamanhoFonte * 2,
              })],
              spacing: { after: 40 },
            })],
            width: { size: Math.floor(9000 / row.cells.length), type: docx.WidthType.DXA },
          })
        ),
      })
    );

    children.push(new docx.Table({
      rows,
      width: { size: 9000, type: docx.WidthType.DXA },
    }));

    children.push(new docx.Paragraph({ text: '' }));
    tableRows = [];
  }

  for (const el of elements) {
    if (el.type !== 'table-row') flushTable();

    switch (el.type) {
      case 'h1':
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({
            text: el.text.toUpperCase(),
            bold: true,
            font: config.fonte,
            size: 32,
          })],
          spacing: { before: 240, after: 120 },
          alignment: docx.AlignmentType.CENTER,
        }));
        break;

      case 'h2':
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({
            text: el.text,
            bold: true,
            font: config.fonte,
            size: 28,
          })],
          spacing: { before: 200, after: 100 },
        }));
        break;

      case 'h3':
        children.push(new docx.Paragraph({
          children: [new docx.TextRun({
            text: el.text,
            bold: true,
            font: config.fonte,
            size: 24,
          })],
          spacing: { before: 160, after: 80 },
        }));
        break;

      case 'text':
        children.push(new docx.Paragraph({
          children: createTextRuns(el.text, config),
          spacing: { after: 80, line: Math.round(config.espacamentoLinhas * 240) },
          indent: { firstLine: 709 }, // ~1.25cm
        }));
        break;

      case 'list':
        children.push(new docx.Paragraph({
          children: createTextRuns(el.text, config),
          spacing: { after: 40, line: Math.round(config.espacamentoLinhas * 240) },
          indent: { left: 720 },
          bullet: { level: 0 },
        }));
        break;

      case 'numbered-list':
        children.push(new docx.Paragraph({
          children: createTextRuns(el.text, config),
          spacing: { after: 40, line: Math.round(config.espacamentoLinhas * 240) },
          indent: { left: 720 },
        }));
        break;

      case 'table-row':
        tableRows.push(el);
        break;

      case 'hr':
        children.push(new docx.Paragraph({
          children: [],
          border: { bottom: { style: docx.BorderStyle.SINGLE, size: 1, space: 1 } },
          spacing: { before: 100, after: 100 },
        }));
        break;

      case 'empty':
        children.push(new docx.Paragraph({ text: '', spacing: { after: 40 } }));
        break;
    }
  }

  flushTable();

  // Header com dados do escritório
  const headerChildren = [];
  if (config.escritorio) {
    headerChildren.push(new docx.TextRun({
      text: config.escritorio,
      bold: true,
      font: config.fonte,
      size: 18,
    }));
  }
  if (config.endereco) {
    headerChildren.push(new docx.TextRun({ break: 1 }));
    headerChildren.push(new docx.TextRun({
      text: config.endereco,
      font: config.fonte,
      size: 14,
      color: '666666',
    }));
  }
  if (config.telefone || config.email) {
    headerChildren.push(new docx.TextRun({ break: 1 }));
    headerChildren.push(new docx.TextRun({
      text: [config.telefone, config.email].filter(Boolean).join(' | '),
      font: config.fonte,
      size: 14,
      color: '666666',
    }));
  }

  const doc = new docx.Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1701,    // 3cm
            bottom: 1134,  // 2cm
            left: 1701,    // 3cm
            right: 1134,   // 2cm
          },
        },
      },
      headers: headerChildren.length > 0 ? {
        default: new docx.Header({
          children: [new docx.Paragraph({
            children: headerChildren,
            alignment: docx.AlignmentType.CENTER,
            border: { bottom: { style: docx.BorderStyle.SINGLE, size: 1, space: 8, color: '999999' } },
            spacing: { after: 200 },
          })],
        }),
      } : undefined,
      footers: {
        default: new docx.Footer({
          children: [new docx.Paragraph({
            children: [new docx.TextRun({
              children: [docx.PageNumber.CURRENT, ' / ', docx.PageNumber.TOTAL_PAGES],
              font: config.fonte,
              size: 16,
              color: '999999',
            })],
            alignment: docx.AlignmentType.CENTER,
          })],
        }),
      },
      children,
    }],
  });

  return doc;
}

// ─── Perguntar onde salvar ──────────────────────────────────────────

function askDestination(rl, defaultPath) {
  return new Promise((resolve) => {
    rl.question(`\n  Onde deseja salvar o arquivo? (${defaultPath}): `, (answer) => {
      resolve(answer.trim() || defaultPath);
    });
  });
}

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  const inputFile = process.argv[3];
  let outputFile = process.argv[4];

  if (!inputFile) {
    console.log('');
    console.log('  AIOS-Law — Exportar para Word (.docx)');
    console.log('');
    console.log('  Uso: npx aios-law export <arquivo.md> [destino.docx]');
    console.log('');
    console.log('  Exemplos:');
    console.log('    npx aios-law export docs/cases/peticao.md');
    console.log('    npx aios-law export peticao.md ~/Desktop/peticao.docx');
    console.log('');
    process.exit(1);
  }

  const inputPath = path.resolve(ROOT, inputFile);

  if (!fs.existsSync(inputPath)) {
    console.error(`\n  ❌ Arquivo não encontrado: ${inputPath}\n`);
    process.exit(1);
  }

  const config = loadConfig();

  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║      AIOS-Law — Exportar para Word          ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
  console.log(`  Arquivo: ${inputFile}`);
  console.log(`  Fonte: ${config.fonte} ${config.tamanhoFonte}pt`);
  console.log(`  Espaçamento: ${config.espacamentoLinhas}`);
  if (config.escritorio) console.log(`  Escritório: ${config.escritorio}`);

  // Se destino não informado, perguntar
  if (!outputFile) {
    const defaultDest = inputFile.replace(/\.md$/, '.docx');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    outputFile = await askDestination(rl, defaultDest);
    rl.close();
  }

  const outputPath = path.resolve(ROOT, outputFile);

  // Gerar documento
  const content = fs.readFileSync(inputPath, 'utf-8');
  const elements = parseMarkdown(content);
  const doc = generateDocx(elements, config);

  // Salvar
  const buffer = await docx.Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);

  console.log('');
  console.log(`  ✅ Documento exportado: ${outputPath}`);
  console.log(`  📄 Tamanho: ${(buffer.length / 1024).toFixed(1)} KB`);
  console.log('');
}

main().catch((err) => {
  console.error(`\n  ❌ Erro na exportação: ${err.message}\n`);
  process.exit(1);
});
