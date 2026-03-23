# Task: Revisar Coerência Argumentativa

## Metadata
- id: revisar-coerencia
- agent: @reviewer
- type: quality-gate
- severity: WARN

## Objetivo
Verificar se a argumentação da peça é logicamente encadeada, consistente e livre de contradições internas.

## Checklist

### Causa de Pedir vs Pedidos
- [ ] A causa de pedir (fatos + fundamentos) sustenta cada pedido formulado
- [ ] Não há pedido sem correspondente fundamentação
- [ ] Não há fundamentação sem correspondente pedido
- [ ] Os pedidos são compatíveis entre si

### Encadeamento Lógico
- [ ] Os argumentos seguem ordem lógica (premissa → conclusão)
- [ ] Não há saltos lógicos ou argumentos sem conexão
- [ ] As transições entre seções são coerentes
- [ ] A conclusão decorre naturalmente dos argumentos apresentados

### Contradições Internas
- [ ] Não há afirmações contraditórias dentro da mesma peça
- [ ] Não há pedido subsidiário que contradiga o principal sem ressalva
- [ ] Fatos narrados são consistentes entre si
- [ ] Valores e datas mencionados são consistentes ao longo do texto

### Provas e Alegações
- [ ] Cada alegação de fato tem indicação de prova correspondente
- [ ] Provas requeridas são pertinentes às alegações
- [ ] Não há requerimento de prova para fato não alegado
- [ ] O ônus da prova está corretamente distribuído (art. 373, CPC)

### Consistência Jurídica
- [ ] Os dispositivos legais citados não se contradizem
- [ ] A jurisprudência citada é compatível com a tese sustentada
- [ ] Não há citação de precedentes que contrariem a própria argumentação
- [ ] A tese principal é coerente com as teses subsidiárias

## Classificação de Problemas

| Tipo | Severidade | Exemplo |
|------|-----------|---------|
| Contradição direta | HIGH | Afirma rescisão indireta e pede verbas de acordo |
| Pedido sem fundamentação | HIGH | Formula pedido de dano moral sem narrar o dano |
| Salto lógico | MEDIUM | Conclui sem demonstrar as premissas |
| Inconsistência de valores | MEDIUM | Valor do pedido difere do cálculo apresentado |
| Desorganização argumentativa | LOW | Argumentos fora de ordem lógica |

## Veredicto
- COERENTE: Argumentação sólida e logicamente encadeada
- AJUSTES: Problemas pontuais de coerência que não comprometem a tese
- INCOERENTE: Contradições graves que comprometem a peça

## Output
- Relatório de coerência argumentativa
- Lista de inconsistências com severidade e sugestão de correção
- Veredicto
