# TEMPLATE: Petição Inicial Cível

---

EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA {{VARA}} DA COMARCA DE {{CIDADE}} — {{ESTADO}}

{{NOME_AUTOR}}, {{NACIONALIDADE}}, {{ESTADO_CIVIL}}, {{PROFISSÃO}}, inscrito(a) no CPF sob o n° {{CPF}}, portador(a) do RG n° {{RG}}, residente e domiciliado(a) em {{ENDEREÇO_AUTOR}}, neste ato representado(a) por seu advogado que esta subscreve (procuração anexa), com escritório profissional em {{ENDEREÇO_ESCRITÓRIO}}, onde recebe intimações, vem, respeitosamente, à presença de Vossa Excelência, propor

**AÇÃO DE {{TIPO_AÇÃO}}**
{{#SE TUTELA_URGENCIA}}(com pedido de tutela de urgência){{/SE}}

em face de

{{NOME_RÉU}}, {{QUALIFICAÇÃO_RÉU}}, residente e domiciliado(a) em {{ENDEREÇO_RÉU}},

pelos fatos e fundamentos a seguir expostos:

---

## I — DOS FATOS

{{NARRATIVA_FATOS}}

---

## II — DO DIREITO

### a) Da fundamentação legal

{{FUNDAMENTAÇÃO_LEGAL}}

### b) Da jurisprudência aplicável

{{JURISPRUDÊNCIA}}

---

{{#SE TUTELA_URGENCIA}}
## III — DA TUTELA DE URGÊNCIA

### a) Da probabilidade do direito

{{PROBABILIDADE_DIREITO}}

### b) Do perigo de dano ou do risco ao resultado útil do processo

{{PERIGO_DANO}}

---
{{/SE}}

## {{NUMERO_SECAO}} — DOS PEDIDOS

Ante o exposto, requer a Vossa Excelência:

{{#SE TUTELA_URGENCIA}}
**Em sede de tutela de urgência:**
a) {{PEDIDO_TUTELA}}

**No mérito:**
{{/SE}}

{{LISTA_PEDIDOS}}

{{#SE JUSTICA_GRATUITA}}
Requer, ainda, os benefícios da **Justiça Gratuita**, nos termos do art. 98 do CPC, por não possuir condições de arcar com as custas processuais e honorários advocatícios sem prejuízo do sustento próprio e de sua família.
{{/SE}}

---

## {{NUMERO_SECAO}} — DAS PROVAS

Protesta provar o alegado por todos os meios de prova em direito admitidos, especialmente:
{{LISTA_PROVAS}}

---

## {{NUMERO_SECAO}} — DO VALOR DA CAUSA

Dá-se à causa o valor de **R$ {{VALOR_CAUSA}}** ({{VALOR_EXTENSO}}), nos termos do art. 292 do CPC.

---

Termos em que,
pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{NOME_ADVOGADO}}**
OAB/{{UF}} n° {{NUMERO_OAB}}
