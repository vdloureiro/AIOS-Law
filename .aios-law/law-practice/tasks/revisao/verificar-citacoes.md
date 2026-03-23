# Task: Verificar Citações Legais

## Metadata
- id: verificar-citacoes
- agent: @verificador
- type: quality-gate
- severity: BLOCK

## Objetivo
Verificar se TODAS as citações legais (legislação, jurisprudência, súmulas, doutrina, normas regulatórias) em uma peça processual são válidas, existentes e corretamente referenciadas.

## Procedimento

### 1. Extrair Todas as Citações
- [ ] Identificar TODA citação de lei (Lei n° X.XXX/AAAA, art. XX)
- [ ] Identificar TODA citação de jurisprudência (Tribunal, Recurso n°, Relator, Data)
- [ ] Identificar TODA citação de súmula (Súmula n° XX do STF/STJ/TST)
- [ ] Identificar TODA citação de norma regulatória (Resolução, IN, Portaria)
- [ ] Identificar TODA citação de doutrina (Autor, Obra, Ano)

### 2. Verificar Legislação
Para CADA dispositivo legal citado:
- [ ] O diploma legal existe
- [ ] O artigo/parágrafo/inciso/alínea existe no diploma
- [ ] A redação citada corresponde à redação atual
- [ ] O dispositivo está vigente (não foi revogado)
- [ ] Se foi alterado, a alteração está refletida
- [ ] O dispositivo é aplicável ao caso (matéria, jurisdição)

### 3. Verificar Jurisprudência
Para CADA julgado citado:
- [ ] O número do processo/recurso está correto
- [ ] O tribunal e turma/câmara estão corretos
- [ ] O relator está correto
- [ ] A data de julgamento está correta
- [ ] A ementa transcrita confere com o original
- [ ] O julgado não foi superado por entendimento posterior

### 4. Verificar Súmulas
Para CADA súmula citada:
- [ ] O número está correto
- [ ] O tribunal está correto (STF/STJ/TST/TSE)
- [ ] A súmula está vigente (não cancelada, não revisada)
- [ ] O enunciado transcrito confere
- [ ] Se vinculante: os efeitos estão corretamente aplicados

### 5. Verificar Normas Regulatórias
Para CADA norma regulatória citada:
- [ ] O órgão emissor está correto
- [ ] O número e data da norma estão corretos
- [ ] A norma está vigente (não foi substituída por outra)
- [ ] O órgão tem competência para regular a matéria

## Classificação de Problemas

| Severidade | Tipo | Ação |
|-----------|------|------|
| BLOCK | Artigo inexistente ou revogado sem menção | Bloqueia — deve corrigir |
| BLOCK | Jurisprudência fabricada/inexistente | Bloqueia — deve remover ou substituir |
| BLOCK | Súmula cancelada citada como vigente | Bloqueia — deve corrigir |
| HIGH | Redação do artigo diverge da atual | Deve atualizar |
| HIGH | Jurisprudência superada por entendimento posterior | Deve atualizar |
| MEDIUM | Julgado antigo (>5 anos) sem julgado mais recente | Recomenda atualizar |
| LOW | Dados incompletos da jurisprudência (falta relator/data) | Recomenda completar |

## Veredicto
- VERIFICADO: Todas as citações são válidas e atualizadas
- VERIFICADO COM RESSALVAS: Citações válidas, mas com recomendações
- REPROVADO: Citações inválidas encontradas — bloqueia até correção

## Output
- Relatório de verificação com status de cada citação
- Lista de correções necessárias (BLOCK) e recomendadas (HIGH/MEDIUM)
- Selo de verificação
