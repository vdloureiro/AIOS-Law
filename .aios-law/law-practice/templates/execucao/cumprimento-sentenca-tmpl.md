# TEMPLATE: Cumprimento de Sentença

---

EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA {{VARA}} DA COMARCA DE {{CIDADE}} — {{ESTADO}}

**Processo n°:** {{NUMERO_PROCESSO}}

{{NOME_EXEQUENTE}}, já qualificado(a) nos autos da ação {{TIPO_ACAO}} que move em face de {{NOME_EXECUTADO}}, vem, respeitosamente, por seu advogado, com fundamento nos arts. 523 e seguintes do Código de Processo Civil, requerer o

**CUMPRIMENTO DE SENTENÇA**
{{#SE PROVISORIO}}(Provisório — art. 520, CPC){{/SE PROVISORIO}}

pelos fundamentos a seguir expostos:

---

## I — DO TÍTULO EXECUTIVO

{{#SE SENTENCA}}
A sentença proferida em {{DATA_SENTENCA}} julgou procedente {{RESUMO_DISPOSITIVO}}, condenando o(a) executado(a) a:

{{CONDENACAO}}
{{/SE SENTENCA}}

{{#SE ACORDAO}}
O v. acórdão proferido pela {{TURMA_CAMARA}} em {{DATA_ACORDAO}} manteve/reformou a sentença, {{RESUMO_DISPOSITIVO_ACORDAO}}.
{{/SE ACORDAO}}

{{#SE TRANSITO}}
A decisão transitou em julgado em {{DATA_TRANSITO}}, conforme certidão anexa.
{{/SE TRANSITO}}

---

## II — DO DEMONSTRATIVO DE CÁLCULO

O débito atualizado é de **R$ {{VALOR_TOTAL}}** ({{VALOR_EXTENSO}}), conforme demonstrativo de cálculo em anexo, assim composto:

| Verba | Valor |
|-------|-------|
| Principal (valor da condenação) | R$ {{VALOR_PRINCIPAL}} |
| Correção monetária ({{INDICE}}) | R$ {{VALOR_CORRECAO}} |
| Juros de mora ({{TAXA_JUROS}}) | R$ {{VALOR_JUROS}} |
| Honorários advocatícios ({{PERCENTUAL_HONORARIOS}}%) | R$ {{VALOR_HONORARIOS}} |
| Multa de 10% (art. 523, §1°, CPC) | R$ {{VALOR_MULTA}} |
| **TOTAL** | **R$ {{VALOR_TOTAL}}** |

**Período de cálculo:** {{DATA_INICIO}} a {{DATA_CALCULO}}
**Índice de correção:** {{INDICE_CORRECAO}}
**Taxa de juros:** {{TAXA_JUROS_DESCRICAO}}

---

## III — DOS PEDIDOS

Ante o exposto, requer:

a) A **intimação** do(a) executado(a), na pessoa de seu advogado, para que efetue o pagamento do valor de **R$ {{VALOR_TOTAL}}** no prazo de **15 (quinze) dias**, sob pena de:
   - **Multa de 10%** sobre o débito (art. 523, §1°, CPC);
   - **Honorários advocatícios de 10%** sobre o débito (art. 523, §1°, CPC);

b) Decorrido o prazo sem pagamento, seja determinada a **penhora** de bens do(a) executado(a), na forma do art. 523, §3°, do CPC, preferencialmente:
   {{BENS_PENHORA}}

c) {{#SE PENHORA_ONLINE}} Seja deferida a **penhora online** (SISBAJUD/BACENJUD) de valores em contas bancárias do(a) executado(a), nos termos do art. 854 do CPC; {{/SE PENHORA_ONLINE}}

d) {{#SE PROTESTO}} Seja determinada a inclusão do(a) executado(a) no **cadastro de inadimplentes** e o **protesto** do título judicial, nos termos do art. 517 do CPC; {{/SE PROTESTO}}

e) Sejam pagas as custas processuais e honorários advocatícios do cumprimento de sentença.

---

Termos em que,
pede deferimento.

{{CIDADE}}, {{DATA}}.

---

**{{NOME_ADVOGADO}}**
OAB/{{UF}} n° {{NUMERO_OAB}}
