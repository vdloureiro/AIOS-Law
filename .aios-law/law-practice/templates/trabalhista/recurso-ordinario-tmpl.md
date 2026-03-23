# TEMPLATE: Recurso Ordinário Trabalhista

---

EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DO TRABALHO DA {{VARA}} VARA DO TRABALHO DE {{CIDADE}} — {{ESTADO}}

**Processo n°:** {{NUMERO_PROCESSO}}

{{NOME_RECORRENTE}}, já qualificado(a) nos autos da Reclamação Trabalhista que {{POSICAO_RECORRENTE}} em face de {{NOME_RECORRIDO}}, vem, respeitosamente, por seu advogado, com fundamento no art. 895, I, da CLT, interpor

**RECURSO ORDINÁRIO**

para o Egrégio Tribunal Regional do Trabalho da {{REGIAO}} Região, requerendo seja recebido e encaminhado com as razões inclusas.

{{#SE DEPOSITO_RECURSAL}}
Comprova o recolhimento do **depósito recursal** no valor de R$ {{VALOR_DEPOSITO}}, conforme guia em anexo (art. 899, §1°, CLT).
{{/SE DEPOSITO_RECURSAL}}

Comprova o recolhimento das **custas processuais** no valor de R$ {{VALOR_CUSTAS}}, conforme guia em anexo.

{{#SE JUSTICA_GRATUITA}}
Requer os benefícios da **Justiça Gratuita**, nos termos do art. 790, §3°, da CLT, sendo dispensado(a) do recolhimento de custas e depósito recursal.
{{/SE JUSTICA_GRATUITA}}

---

Termos em que,
pede deferimento.

{{CIDADE}}, {{DATA}}.

**{{NOME_ADVOGADO}}**
OAB/{{UF}} n° {{NUMERO_OAB}}

---

# RAZÕES DE RECURSO ORDINÁRIO

**Processo n°:** {{NUMERO_PROCESSO}}
**Recorrente:** {{NOME_RECORRENTE}}
**Recorrido(a):** {{NOME_RECORRIDO}}
**Origem:** {{VARA}} Vara do Trabalho de {{CIDADE}}/{{ESTADO}}

Egrégio Tribunal,
Colenda Turma,
Eminentes Desembargadores,

---

## I — DA TEMPESTIVIDADE

A sentença foi publicada em {{DATA_PUBLICACAO}}. O presente recurso é interposto em {{DATA_PROTOCOLO}}, dentro do prazo legal de **8 (oito) dias** previsto no art. 895, I, da CLT.

---

## II — DA SENTENÇA RECORRIDA

{{SINTESE_SENTENCA}}

---

## III — DAS RAZÕES DO RECURSO

{{#PARA_CADA MATERIA_RECORRIDA}}

### {{NUMERO}}. {{TITULO_MATERIA}}

#### a) Da decisão de origem

{{DECISAO_ORIGEM}}

#### b) Das razões de reforma

{{RAZOES_REFORMA}}

#### c) Da fundamentação legal

{{FUNDAMENTACAO_CLT}}

#### d) Da jurisprudência

{{JURISPRUDENCIA_TST}}

{{/PARA_CADA MATERIA_RECORRIDA}}

---

## IV — DOS CÁLCULOS

{{#SE CALCULOS}}
Caso este Tribunal entenda por dar provimento ao recurso, requer sejam observados os seguintes parâmetros para apuração dos créditos:

| Verba | Base de Cálculo | Período | Reflexos |
|-------|----------------|---------|----------|
| {{VERBA_1}} | {{BASE_1}} | {{PERIODO_1}} | {{REFLEXOS_1}} |
| {{VERBA_2}} | {{BASE_2}} | {{PERIODO_2}} | {{REFLEXOS_2}} |
{{/SE CALCULOS}}

---

## V — DOS PEDIDOS

Ante o exposto, requer:

a) O recebimento e conhecimento do presente recurso ordinário;

b) No mérito, o seu **provimento** para **reformar** a r. sentença, {{PEDIDO_REFORMA}};

c) {{#SE PEDIDO_SUBSIDIARIO}} Subsidiariamente, {{PEDIDO_SUBSIDIARIO}}; {{/SE PEDIDO_SUBSIDIARIO}}

d) A condenação do(a) recorrido(a) ao pagamento de honorários advocatícios sucumbenciais, nos termos do art. 791-A da CLT;

e) A inversão do ônus da sucumbência.

---

Termos em que,
pede deferimento.

{{CIDADE}}, {{DATA}}.

---

**{{NOME_ADVOGADO}}**
OAB/{{UF}} n° {{NUMERO_OAB}}
