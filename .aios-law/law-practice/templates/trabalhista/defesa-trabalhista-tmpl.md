# TEMPLATE: Defesa Trabalhista (Contestação)

---

EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DO TRABALHO DA {{VARA}} VARA DO TRABALHO DE {{CIDADE}} — {{ESTADO}}

**Processo n°:** {{NUMERO_PROCESSO}}

{{NOME_RECLAMADA}}, pessoa jurídica de direito privado, inscrita no CNPJ sob o n° {{CNPJ}}, com sede em {{ENDERECO_RECLAMADA}}, vem, respeitosamente, por seu advogado, apresentar

**CONTESTAÇÃO**

à Reclamação Trabalhista proposta por {{NOME_RECLAMANTE}}, pelos fatos e fundamentos a seguir:

---

## I — BREVE SÍNTESE DA INICIAL

{{SINTESE_INICIAL}}

---

## II — PRELIMINARES

{{#SE PRELIMINARES}}

### {{NOME_PRELIMINAR}}

{{FUNDAMENTACAO_PRELIMINAR}}

{{/SE PRELIMINARES}}

{{#SE PRESCRICAO}}
### Da Prescrição

{{FUNDAMENTACAO_PRESCRICAO}}

Requer seja reconhecida a prescrição {{QUINQUENAL|BIENAL}}, nos termos do art. 7°, XXIX, da CF/88 e art. 11 da CLT.
{{/SE PRESCRICAO}}

---

## III — DO MÉRITO

### a) Do Contrato de Trabalho

{{DESCRICAO_CONTRATO}}

### b) Dos Fatos

{{FATOS_DEFESA}}

### c) Do Direito

{{FUNDAMENTACAO_CLT}}

### d) Da Jurisprudência

{{JURISPRUDENCIA_DEFESA}}

---

## IV — IMPUGNAÇÃO ESPECÍFICA DOS PEDIDOS

{{#PARA_CADA PEDIDO}}

### {{NUMERO_PEDIDO}}. {{DESCRICAO_PEDIDO}}

**Impugnação:** {{FUNDAMENTACAO_IMPUGNACAO}}

**Valor impugnado:** {{VALOR_IMPUGNADO}}

{{/PARA_CADA PEDIDO}}

---

## V — DOS CÁLCULOS

{{#SE CALCULOS}}

Caso este juízo entenda por deferir algum pedido, o que se admite apenas por argumentar, requer sejam observados os seguintes parâmetros:

| Verba | Parâmetro correto | Base legal |
|-------|-------------------|-----------|
| {{VERBA_1}} | {{PARAMETRO_1}} | {{BASE_1}} |
| {{VERBA_2}} | {{PARAMETRO_2}} | {{BASE_2}} |

{{/SE CALCULOS}}

---

## VI — DA LITIGÂNCIA DE MÁ-FÉ

{{#SE MA_FE}}
{{FUNDAMENTACAO_MA_FE}}
{{/SE MA_FE}}

---

## VII — DOS PEDIDOS

Diante do exposto, requer:

a) O acolhimento das preliminares arguidas, com a extinção do feito sem resolução de mérito;

b) {{#SE PRESCRICAO}} O reconhecimento da prescrição {{QUINQUENAL|BIENAL}}; {{/SE PRESCRICAO}}

c) No mérito, a **total improcedência** dos pedidos formulados na inicial;

d) A condenação do(a) reclamante ao pagamento de **honorários advocatícios** sucumbenciais, nos termos do art. 791-A da CLT;

e) {{#SE MA_FE}} A condenação do(a) reclamante por **litigância de má-fé**, nos termos do art. 793-B da CLT; {{/SE MA_FE}}

f) A produção de todas as provas admitidas em direito, especialmente documental, testemunhal e pericial.

---

## VIII — ROL DE TESTEMUNHAS

| N° | Nome | Endereço |
|----|------|----------|
| 1 | {{TESTEMUNHA_1}} | {{ENDERECO_T1}} |
| 2 | {{TESTEMUNHA_2}} | {{ENDERECO_T2}} |
| 3 | {{TESTEMUNHA_3}} | {{ENDERECO_T3}} |

---

Termos em que,
pede deferimento.

{{CIDADE}}, {{DATA}}.

---

**{{NOME_ADVOGADO}}**
OAB/{{UF}} n° {{NUMERO_OAB}}
