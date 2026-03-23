# AIOS-Law

**Framework de Orquestração Multi-Agente para Advocacia Brasileira**

Sistema **gratuito e open-source** que transforma assistentes de IA (Claude Code, Cursor, Codex, Gemini) em um escritório de advocacia virtual com **27 agentes especializados** em todas as áreas do direito brasileiro.

---

## Pré-requisitos

Antes de instalar o AIOS-Law, você precisa ter no seu computador:

| Requisito | O que é | Como instalar |
|-----------|---------|---------------|
| **Node.js 18+** | Runtime JavaScript necessário para rodar os scripts do framework | [nodejs.org/pt-br/download](https://nodejs.org/pt-br/download) — Baixe e instale a versão LTS |
| **Git** | Controle de versão para clonar o repositório | [git-scm.com/downloads](https://git-scm.com/downloads) |
| **IDE com IA** | Editor de código com assistente de IA integrado | Veja a seção "IDEs Compatíveis" abaixo |

> **Não é necessário** saber programar. O AIOS-Law funciona por comandos de texto simples dentro da IDE.
>
> **Não é necessário** Python, Docker, banco de dados ou qualquer outro software adicional.

### IDEs Compatíveis

O AIOS-Law funciona com qualquer IDE que tenha assistente de IA com suporte a instruções de projeto:

| IDE | Assistente de IA | Gratuito? | Melhor para |
|-----|-----------------|-----------|-------------|
| **VS Code + Claude Code** | Claude (Anthropic) | Sim (com limites) | Melhor experiência — recomendado |
| **Cursor** | Claude / GPT | Plano grátis disponível | Alternativa popular |
| **VS Code + Copilot** | GPT (OpenAI) | Requer assinatura | Se já usa Copilot |
| **Windsurf** | Claude / GPT | Plano grátis disponível | Alternativa |

---

## Instalação

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/vdloureiro/AIOS-Law.git
cd AIOS-Law
```

### Passo 2 — Instalar dependências

```bash
npm install
```

### Passo 3 — Configurar seu escritório (onboarding interativo)

```bash
npx aios-law init
```

O wizard vai perguntar:
- Nome do escritório, CNPJ, endereço, contato
- Nome e OAB de cada advogado responsável
- Áreas de atuação do escritório
- Logo e papel timbrado (opcional — aceita PNG/JPG)
- Preferências de formatação dos documentos

### Passo 4 — Abrir na IDE e começar a usar

Abra a pasta do projeto na sua IDE com IA e comece a usar os agentes:

```
@intake *atender
```

---

## Como Usar

### Ativar um agente

Digite `@` seguido do nome do agente:

```
@intake          → Iniciar atendimento de novo cliente
@strategist      → Analisar viabilidade de um caso
@civil           → Trabalhar com direito civil
@criminal        → Trabalhar com direito penal
```

### Usar comandos do agente

Cada agente tem comandos prefixados com `*`:

```
@civil *peticao-inicial       → Redigir petição inicial cível
@labor *reclamacao            → Redigir reclamação trabalhista
@criminal *habeas-corpus      → Redigir habeas corpus
@tax *anulatoria              → Redigir ação anulatória tributária
@family *divorcio-consensual  → Redigir divórcio consensual
@reviewer *revisar            → Revisar peça processual
@case-manager *prazos         → Ver prazos próximos
```

### Fluxo recomendado para um caso novo

```
1. @intake *atender                    → Entrevistar cliente, coletar fatos e documentos
2. @strategist *viabilidade            → Analisar viabilidade, riscos e estratégia
3. [Advogado aprova a estratégia]
4. @especialista *peticao-inicial      → Redigir a peça (agente da área correta)
5. @verificador *verificar             → Auditar TODAS as citações legais
6. @reviewer *revisar                  → Revisar qualidade, OAB, coerência
7. [Advogado aprova a peça final]
8. npx aios-law export peticao.md      → Exportar para Word (.docx)
```

---

## Todos os Agentes

### Agentes de Operação (Core)

Estes agentes coordenam o fluxo de trabalho do escritório:

| Agente | Nome | O que faz | Comandos principais |
|--------|------|-----------|---------------------|
| `@intake` | Dra. Helena | Primeiro contato com o cliente. Faz a entrevista, coleta fatos e documentos, classifica a área jurídica e encaminha para o especialista correto. | `*atender`, `*ficha`, `*classificar`, `*encaminhar` |
| `@strategist` | Dr. Marcus | Analisa a viabilidade jurídica do caso, mapeia riscos, identifica teses possíveis e recomenda a melhor estratégia (judicial ou extrajudicial). | `*viabilidade`, `*estrategia`, `*parecer`, `*riscos`, `*teses` |
| `@researcher` | Dra. Sophia | Pesquisa jurisprudência, legislação, doutrina e direito comparado. Identifica posição majoritária/minoritária e precedentes vinculantes. | `*jurisprudencia`, `*legislacao`, `*sumulas`, `*doutrina` |
| `@verificador` | Dr. Verificador | Audita CADA citação legal da peça: verifica se artigos existem, se estão vigentes, se jurisprudência é real e se a legislação estadual está correta. | `*verificar`, `*verificar-vigencia`, `*verificar-jurisdicao`, `*selo` |
| `@reviewer` | Dr. Revisor | Revisa qualidade geral da peça: conformidade com OAB, coerência argumentativa, completude de requisitos e formatação. | `*revisar`, `*gate`, `*checklist`, `*devolver` |
| `@case-manager` | Dra. Gestora | Controla prazos processuais, distribui casos entre especialistas, monitora andamento e gera relatórios gerenciais. | `*prazos`, `*casos`, `*distribuir`, `*relatorio-geral` |

### Agentes Especialistas (21 Áreas do Direito)

Cada especialista domina sua área, com comandos específicos para redigir peças, analisar casos e calcular valores:

| Agente | Nome | Área do Direito | O que faz | Comandos principais |
|--------|------|-----------------|-----------|---------------------|
| `@civil` | Dr. Cívil | **Civil** | Petições iniciais, contestações, contratos, recursos cíveis, cumprimento de sentença. | `*peticao-inicial`, `*contestacao`, `*contrato`, `*apelacao` |
| `@labor` | Dra. Clara | **Trabalhista** | Reclamações trabalhistas, defesas, cálculos de verbas rescisórias, horas extras, recursos. | `*reclamacao`, `*calcular-rescisao`, `*recurso-ordinario` |
| `@criminal` | Dr. Defensor | **Penal** | Defesas criminais, habeas corpus, liberdade provisória, recursos criminais, execução penal. | `*habeas-corpus`, `*resposta-acusacao`, `*apelacao-criminal` |
| `@tax` | Dr. Fiscal | **Tributário** | Ações anulatórias, mandados de segurança tributários, planejamento fiscal, defesas no CARF. | `*anulatoria`, `*mandado-seguranca-trib`, `*planejamento-tributario` |
| `@corporate` | Dra. Victoria | **Empresarial** | Contratos societários, M&A, due diligence, compliance, SAF, startups, recuperação judicial. | `*contrato-social`, `*due-diligence`, `*vesting`, `*recuperacao-judicial` |
| `@admin-law` | Dr. Público | **Administrativo** | Mandados de segurança, licitações, defesas em PAD, ações contra o Estado. | `*mandado-seguranca`, `*impugnar-edital`, `*defesa-pad` |
| `@consumer` | Dra. Consumo | **Consumidor** | Ações consumeristas, vícios de produto/serviço, dano moral, práticas abusivas, superendividamento. | `*reclamacao-consumidor`, `*dano-moral-consumidor`, `*vicio-produto` |
| `@family` | Dra. Acolhida | **Família e Sucessões** | Divórcio, guarda, alimentos, inventário, testamento, adoção, alienação parental. | `*divorcio-consensual`, `*alimentos`, `*inventario`, `*guarda` |
| `@previdenciario` | Dr. Previdência | **Previdenciário** | Aposentadorias, auxílio-doença, pensão por morte, BPC/LOAS, revisões de benefício. | `*aposentadoria-idade`, `*auxilio-doenca`, `*bpc-loas`, `*revisao-beneficio` |
| `@ambiental` | Dra. Sustenta | **Ambiental** | Licenciamento ambiental, defesa em crimes ambientais, TAC, APP, reserva legal, compliance ambiental. | `*licenciamento`, `*defesa-criminal-ambiental`, `*tac`, `*compliance-ambiental` |
| `@digital` | Dr. Dados | **Digital / LGPD** | Compliance LGPD, políticas de privacidade, termos de uso, crimes cibernéticos, contratos SaaS, regulação de IA. | `*compliance-lgpd`, `*politica-privacidade`, `*termos-uso`, `*crime-cibernetico` |
| `@realestate` | Dr. Propriedade | **Imobiliário** | Compra e venda, locação, usucapião, despejo, incorporação, regularização fundiária, distrato. | `*compra-venda`, `*despejo`, `*usucapiao`, `*contrato-locacao` |
| `@electoral` | Dra. Cívica | **Eleitoral** | Registro de candidatura, propaganda eleitoral, AIJE/AIME, crimes eleitorais, prestação de contas. | `*registro-candidatura`, `*aije`, `*propaganda-eleitoral` |
| `@banking` | Dr. Financeiro | **Bancário / Financeiro** | Revisional de contratos, juros abusivos, busca e apreensão, inscrição indevida em SPC/Serasa. | `*revisional-contrato`, `*juros-abusivos`, `*inscricao-indevida` |
| `@international` | Dra. Diplomata | **Internacional** | Homologação de sentença estrangeira, cooperação jurídica, imigração, contratos internacionais, arbitragem. | `*homologacao-sentenca`, `*imigracao`, `*contrato-internacional` |
| `@health` | Dr. Vital | **Direito da Saúde** | Negativa de plano de saúde, erro médico, medicamentos via SUS, reajuste abusivo de plano. | `*negativa-cobertura`, `*erro-medico`, `*medicamento-judicial` |
| `@agrario` | Dr. Terra | **Agrário** | Usucapião rural, contratos agrários, reforma agrária, regularização fundiária, ITR, CAR. | `*usucapiao-rural`, `*contrato-arrendamento`, `*reforma-agraria` |
| `@military` | Dr. Ordem | **Militar** | Defesa em conselhos de disciplina, crimes militares, habeas corpus militar, reforma militar. | `*defesa-conselho-disciplina`, `*crime-militar`, `*habeas-corpus-militar` |
| `@maritime` | Dra. Navegação | **Marítimo / Portuário** | Transporte marítimo, avaria grossa, seguro marítimo, Tribunal Marítimo, poluição marítima. | `*avaria-grossa`, `*seguro-maritimo`, `*tribunal-maritimo` |
| `@sports` | Dr. Arena | **Desportivo** | Contratos de atleta, transferências, direito de imagem, doping, Justiça Desportiva, SAF. | `*contrato-atleta`, `*transferencia`, `*direito-imagem`, `*saf` |
| `@ip` | Dra. Inovação | **Propriedade Intelectual** | Registro de marca/patente, direitos autorais, software, contrafação, licenciamento, nomes de domínio. | `*registro-marca`, `*registro-patente`, `*contrafacao`, `*direito-autoral` |

---

## Áreas do Direito Cobertas

O AIOS-Law cobre **todas as principais áreas do direito brasileiro**:

| # | Área | Agente | Legislação principal |
|---|------|--------|---------------------|
| 1 | Civil | `@civil` | CC/2002, CPC/2015 |
| 2 | Trabalhista | `@labor` | CLT, CF art. 7° |
| 3 | Penal | `@criminal` | CP, CPP |
| 4 | Tributário | `@tax` | CTN, CF arts. 145-162 |
| 5 | Empresarial | `@corporate` | CC (Livro II), Lei S.A., Lei Falências |
| 6 | Administrativo | `@admin-law` | CF art. 37, Lei 14.133/2021 |
| 7 | Consumidor | `@consumer` | CDC (Lei 8.078/90) |
| 8 | Família e Sucessões | `@family` | CC (Livros IV-V), ECA |
| 9 | Previdenciário | `@previdenciario` | Lei 8.213/91, EC 103/2019 |
| 10 | Ambiental | `@ambiental` | Lei 9.605/98, Código Florestal |
| 11 | Digital / LGPD | `@digital` | LGPD (Lei 13.709/18), Marco Civil |
| 12 | Imobiliário | `@realestate` | Lei 8.245/91, Lei 6.015/73 |
| 13 | Eleitoral | `@electoral` | CE, Lei 9.504/97, LC 64/90 |
| 14 | Bancário | `@banking` | CDC, Lei 4.595/64 |
| 15 | Internacional | `@international` | LINDB, Lei 13.445/17 |
| 16 | Saúde | `@health` | CF art. 196, Lei 9.656/98 |
| 17 | Agrário | `@agrario` | Estatuto da Terra, Lei 8.629/93 |
| 18 | Militar | `@military` | CPM, CPPM, Lei 6.880/80 |
| 19 | Marítimo | `@maritime` | Lei 7.652/88, Lei 12.815/13 |
| 20 | Desportivo | `@sports` | Lei Pelé, Lei 14.597/23 |
| 21 | Propriedade Intelectual | `@ip` | LPI (Lei 9.279/96), Lei 9.610/98 |

---

## Templates de Peças Prontos

O framework inclui **23 templates** de peças jurídicas com placeholders preenchíveis:

### Petições
- Petição Inicial Cível
- Contestação
- Embargos de Declaração
- Agravo de Instrumento
- Recurso de Apelação
- Recurso Especial (STJ)
- Mandado de Segurança
- Habeas Corpus

### Trabalhista
- Reclamação Trabalhista
- Defesa Trabalhista (Contestação)
- Recurso Ordinário Trabalhista

### Penal
- Resposta à Acusação
- Apelação Criminal
- Habeas Corpus

### Contratos e Extrajudicial
- Contrato de Prestação de Serviços
- Notificação Extrajudicial
- Acordo Extrajudicial
- Procuração Ad Judicia

### Execução
- Cumprimento de Sentença

### Pareceres
- Parecer Jurídico
- Parecer de Viabilidade

---

## Pipeline de Qualidade

O AIOS-Law garante que nenhuma peça saia com erros. Toda peça passa por **8 quality gates**:

| Gate | O que verifica | Quem faz | Se falhar |
|------|---------------|----------|-----------|
| Verificação de Citações | Cada artigo, súmula e jurisprudência citados existem | `@verificador` | Bloqueia |
| Verificação de Vigência | Nenhuma lei revogada ou súmula cancelada | `@verificador` | Bloqueia |
| Verificação de Jurisdição | Legislação estadual/municipal correta para o foro | `@verificador` | Bloqueia |
| Fundamentação Legal | Toda afirmação tem base legal | `@reviewer` | Bloqueia |
| Conformidade OAB | Respeita Código de Ética da OAB | `@reviewer` | Bloqueia |
| Prazos | Prazos processuais verificados | `@case-manager` | Bloqueia |
| Coerência | Argumentação lógica sem contradições | `@reviewer` | Alerta |
| Formatação | Padrões do tribunal destinatário | `@reviewer` | Informativo |

---

## Consciência Estadual

O direito brasileiro varia por estado. O AIOS-Law sabe disso:

- **ICMS** — Cada estado tem seu próprio RICMS
- **ITCMD** — Alíquotas e regras variam por estado
- **Custas processuais** — Cada tribunal tem tabela própria
- **Organização judiciária** — Cada TJ tem suas varas e competências
- **Meio ambiente** — Cada estado tem órgão ambiental próprio (CETESB em SP, INEA no RJ, etc.)

O agente `@verificador` garante que a legislação estadual citada é a do foro correto.

---

## Exportação para Word

Toda peça finalizada pode ser exportada para `.docx` com formatação profissional:

```bash
npx aios-law export minha-peticao.md
```

O documento Word gerado inclui:
- Cabeçalho com dados do escritório (nome, endereço, contato)
- Fonte **Arial** em todo o documento
- Títulos formatados (H1 = 16pt, H2 = 14pt, H3 = 12pt, corpo = 11pt)
- Espaçamento 1,5 entre linhas
- Margens jurídicas (3cm superior/esquerda, 2cm inferior/direita)
- Rodapé com numeração de páginas

---

## Knowledge Base Incluída

O framework vem com **8 referências** de consulta rápida:

| Referência | Conteúdo |
|-----------|----------|
| Súmulas Vinculantes STF | ~57 súmulas organizadas por área |
| Súmulas STJ | ~80 súmulas mais citadas |
| Súmulas e OJs TST | ~60 enunciados trabalhistas |
| Tabela de Prazos | Prazos de CPC, CLT, CPP, tributário, administrativo |
| Calendário Forense | Feriados 2026, recesso, suspensões por tribunal |
| Tabela de Custas | Custas por tribunal (TJSP, TRF3, TRT2, STJ/STF) |
| Prescrição e Decadência | Prazos completos: civil, consumidor, trabalhista, penal, tributário |
| Fontes Jurídicas | Catálogo de todas as fontes legais do Brasil (federal, estadual, municipal, regulatório) |

---

## Comandos CLI

```bash
npx aios-law init       # Configurar escritório (wizard interativo)
npx aios-law doctor     # Verificar saúde do projeto (31 checks)
npx aios-law info       # Informações do projeto
npx aios-law export     # Exportar Markdown para Word (.docx)
npx aios-law --help     # Ajuda
```

---

## Estrutura do Projeto

```
AIOS-Law/
├── .aios-law/
│   ├── constitution.md           # Princípios invioláveis do sistema
│   ├── escritorio.yaml           # Dados do seu escritório (gerado no init)
│   ├── escritorio/               # Logo e papel timbrado
│   ├── core-config.yaml          # Configuração do sistema
│   ├── framework-config.yaml     # Registro de agentes e gates
│   ├── project-config.yaml       # Configuração do escritório
│   ├── user-guide.md             # Guia do usuário
│   ├── law-practice/
│   │   ├── agents/               # 27 agentes especializados
│   │   ├── agent-teams/          # 6 equipes pré-configuradas
│   │   ├── tasks/                # 24 tasks operacionais
│   │   ├── templates/            # 23 templates de peças jurídicas
│   │   ├── checklists/           # 4 checklists de qualidade
│   │   └── workflows/            # 5 workflows de orquestração
│   └── scripts/                  # Scripts de automação
├── squads/                       # 15 squads por área jurídica
├── docs/
│   ├── cases/                    # Fichas de caso (runtime)
│   └── knowledge-base/           # 8 referências de consulta
├── bin/                          # CLI (npx aios-law)
├── CLAUDE.md                     # Instruções para o assistente de IA
├── package.json
└── README.md
```

---

## Perguntas Frequentes

### Preciso saber programar?
**Não.** O AIOS-Law funciona por comandos de texto simples. Você digita `@intake *atender` e o assistente de IA faz o resto.

### Quanto custa?
**Nada.** O framework é gratuito e open-source (licença MIT). Você só precisa de um assistente de IA (Claude Code tem plano gratuito).

### Preciso instalar Python, Docker ou algo assim?
**Só Node.js.** Baixe em [nodejs.org](https://nodejs.org/pt-br/download), instale, e pronto. Nada mais.

### É seguro usar com dados de clientes?
O AIOS-Law roda **localmente no seu computador**. Nenhum dado é enviado para servidores do AIOS-Law. Os dados são processados pelo assistente de IA que você escolher (Claude, GPT, etc.) — verifique a política de privacidade do seu provedor de IA.

### Funciona com qualquer estado do Brasil?
**Sim.** Na configuração (`npx aios-law init`) você define o estado do escritório. Os agentes usam a legislação correta do estado e o `@verificador` garante que não há mistura.

### Posso usar para casos reais?
O AIOS-Law é uma **ferramenta de assistência**. Toda peça gerada deve ser revisada e aprovada por um advogado humano antes de protocolar. O framework foi projetado com human-in-the-loop obrigatório.

### Como atualizo o framework?
```bash
cd AIOS-Law
git pull origin main
npm install
```

---

## Princípios Fundamentais

1. **Ética OAB** — Todo output respeita o Código de Ética e Disciplina da OAB
2. **Sigilo** — Dados de clientes nunca são cruzados entre casos
3. **Fundamentação Verificada** — Toda citação legal é auditada pelo `@verificador`
4. **Vigência Garantida** — Nenhuma lei revogada ou súmula cancelada passa
5. **Consciência Estadual** — Respeita legislação que varia por estado e município
6. **Prazos são Sagrados** — Alertas automáticos sobre prazos processuais
7. **Human-in-the-Loop** — O advogado humano SEMPRE aprova decisões finais

---

## Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request no GitHub.

---

## Licença

MIT — Use, modifique e distribua livremente.

---

*"A advocacia é indispensável à administração da justiça." — Art. 133, CF/88*
