# Task: Análise de Prescrição e Decadência

## Metadata
- id: analise-prescricao
- agent: @strategist
- type: analysis
- urgency: high

## Objetivo
Verificar se o direito de ação está prescrito ou se houve decadência.

## Prazos Prescricionais Comuns (Código Civil)

### Art. 205 — Prazo Geral
- 10 anos (quando a lei não fixar prazo menor)

### Art. 206 — Prazos Especiais
- **1 ano:** hospedagem, alimentos, seguro, segurado contra segurador
- **2 anos:** alimentos (prestações vencidas)
- **3 anos:** aluguéis, reparação civil, enriquecimento sem causa, honorários, seguro obrigatório
- **4 anos:** tutela (a contar da maioridade)
- **5 anos:** dívidas líquidas (instrumento público/particular), profissionais liberais

### Trabalhista (Art. 7°, XXIX, CF)
- 5 anos na vigência do contrato
- 2 anos após a extinção

### Penal (Art. 109, CP)
- Varia conforme pena máxima em abstrato (3 a 20 anos)

### Tributária (CTN)
- Decadência: 5 anos (arts. 150, §4° e 173)
- Prescrição: 5 anos (art. 174)

### CDC (Art. 27)
- 5 anos (fato do produto/serviço)

## Verificações
- [ ] Identificar tipo de prazo (prescrição ou decadência)
- [ ] Identificar termo inicial (data do fato, ciência, etc.)
- [ ] Verificar causas de suspensão (art. 197-201, CC)
- [ ] Verificar causas de interrupção (art. 202, CC)
- [ ] Calcular data final considerando suspensões/interrupções
- [ ] Resultado: DENTRO DO PRAZO / PRESCRITO / EM RISCO

## Output
- Análise de prescrição/decadência com fundamentação
- Data limite para ajuizamento
- Alerta de urgência (se aplicável)
