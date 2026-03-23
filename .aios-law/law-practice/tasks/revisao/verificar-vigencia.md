# Task: Verificar Vigência de Dispositivos Legais

## Metadata
- id: verificar-vigencia
- agent: @verificador
- type: quality-gate
- severity: BLOCK

## Objetivo
Confirmar que todos os dispositivos legais citados em uma peça estão em plena vigência, não foram revogados, alterados ou suspensos.

## Procedimento

### 1. Verificação de Vigência — Legislação Federal
Para CADA lei federal citada:
- [ ] Consultar portal planalto.gov.br para confirmar vigência
- [ ] Verificar se houve revogação total ou parcial por lei posterior
- [ ] Verificar se houve alteração de redação por lei posterior
- [ ] Verificar se há ADI pendente questionando constitucionalidade
- [ ] Verificar se há medida cautelar suspendendo vigência
- [ ] Se MP: verificar se foi convertida em lei ou caducou

### 2. Verificação de Vigência — Legislação Estadual
Para CADA lei estadual citada:
- [ ] Confirmar que é a legislação do estado do foro
- [ ] Verificar vigência no portal da Assembleia Legislativa do estado
- [ ] Verificar se houve revogação/alteração por lei estadual posterior
- [ ] Verificar se há ADI estadual questionando constitucionalidade

### 3. Verificação de Vigência — Legislação Municipal
Para CADA lei municipal citada:
- [ ] Confirmar que é a legislação do município correto
- [ ] Verificar vigência no portal da Câmara Municipal
- [ ] Verificar se houve alteração por lei municipal posterior

### 4. Verificação de Vigência — Normas Regulatórias
Para CADA norma regulatória citada:
- [ ] Verificar se a resolução/IN/portaria ainda está vigente
- [ ] Verificar se foi substituída por norma posterior do mesmo órgão
- [ ] Verificar se o órgão regulador mudou de entendimento

### 5. Verificação de Vigência — Súmulas e Precedentes
- [ ] Súmulas vinculantes: verificar se não foram revisadas ou canceladas
- [ ] Súmulas STJ/TST: verificar se não foram superadas
- [ ] Teses de repercussão geral/repetitivos: verificar se estão mantidas
- [ ] OJs do TST: verificar vigência

## Sinais de Alerta para Investigação Prioritária

| Sinal | Ação |
|-------|------|
| Lei anterior a 2002 (antes do CC/2002) | Verificar se não foi absorvida/revogada |
| Lei anterior a 2015 (antes do CPC/2015) | Verificar dispositivos processuais |
| Norma trabalhista pré-2017 | Verificar impacto da Reforma Trabalhista |
| Norma previdenciária pré-2019 | Verificar impacto da EC 103/2019 |
| Resolução regulatória >3 anos | Verificar se foi substituída |
| Súmula TST pré-Reforma | Verificar aplicabilidade atual |
| Lei de licitações pré-2021 | Verificar se aplica Lei 14.133/2021 ou Lei 8.666/93 |

## Mapeamento de Revogações Frequentes

| Lei Revogada | Revogada por | Cuidado |
|-------------|-------------|---------|
| CC/1916 (Lei 3.071/16) | CC/2002 (Lei 10.406/02) | Dispositivos de transição |
| CPC/1973 (Lei 5.869/73) | CPC/2015 (Lei 13.105/15) | Numeração de artigos mudou |
| Lei 8.666/93 (Licitações) | Lei 14.133/2021 | Período de transição até 2024 |
| CLT original (vários arts) | Reforma Trabalhista (Lei 13.467/17) | Muitos artigos alterados |
| Previdência (vários) | EC 103/2019 | Regras de transição complexas |

## Veredicto
- VIGENTE: Todos os dispositivos estão em plena vigência
- VIGENTE COM ALTERAÇÕES: Dispositivos vigentes, mas com redação atualizada
- REVOGAÇÃO DETECTADA: Dispositivo revogado encontrado — BLOCK

## Output
- Lista de dispositivos verificados com status de vigência
- Alerta de alterações legislativas recentes
- Mapeamento de revogações encontradas
