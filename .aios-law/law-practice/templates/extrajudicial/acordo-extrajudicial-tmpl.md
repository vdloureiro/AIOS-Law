# TEMPLATE: Acordo Extrajudicial

---

## TERMO DE ACORDO EXTRAJUDICIAL

Pelo presente instrumento particular de acordo extrajudicial, as partes abaixo qualificadas:

---

**PARTE 1 ({{QUALIFICACAO_PARTE_1}}):** {{NOME_PARTE_1}}, {{NACIONALIDADE_P1}}, {{ESTADO_CIVIL_P1}}, {{PROFISSAO_P1}}, inscrito(a) no CPF/CNPJ sob o n° {{CPF_CNPJ_P1}}, residente/com sede em {{ENDERECO_P1}}, doravante denominado(a) **"{{DENOMINACAO_P1}}"**.

**PARTE 2 ({{QUALIFICACAO_PARTE_2}}):** {{NOME_PARTE_2}}, {{NACIONALIDADE_P2}}, {{ESTADO_CIVIL_P2}}, {{PROFISSAO_P2}}, inscrito(a) no CPF/CNPJ sob o n° {{CPF_CNPJ_P2}}, residente/com sede em {{ENDERECO_P2}}, doravante denominado(a) **"{{DENOMINACAO_P2}}"**.

---

Resolvem, de comum acordo e por livre e espontânea vontade, celebrar o presente **TERMO DE ACORDO**, que se regerá pelas cláusulas e condições seguintes:

---

## CLÁUSULA 1ª — DO OBJETO

O presente acordo tem por objeto {{OBJETO_ACORDO}}.

{{#SE PROCESSO_EXISTENTE}}
**Ref. Processo n°:** {{NUMERO_PROCESSO}}, em trâmite perante a {{VARA}} de {{CIDADE}}/{{ESTADO}}.
{{/SE PROCESSO_EXISTENTE}}

---

## CLÁUSULA 2ª — DOS FATOS

{{NARRATIVA_FATOS}}

---

## CLÁUSULA 3ª — DAS CONCESSÕES RECÍPROCAS

Para fins de transação (arts. 840 a 850 do Código Civil), as partes fazem as seguintes concessões recíprocas:

**{{DENOMINACAO_P1}}** concede:
{{CONCESSOES_P1}}

**{{DENOMINACAO_P2}}** concede:
{{CONCESSOES_P2}}

---

## CLÁUSULA 4ª — DO VALOR E FORMA DE PAGAMENTO

{{#SE PAGAMENTO}}
A título de transação, **{{DENOMINACAO_PAGADOR}}** pagará a **{{DENOMINACAO_RECEBEDOR}}** o valor de **R$ {{VALOR_ACORDO}}** ({{VALOR_EXTENSO}}), na seguinte forma:

{{FORMA_PAGAMENTO}}

**Dados para pagamento:**
{{DADOS_BANCARIOS}}
{{/SE PAGAMENTO}}

---

## CLÁUSULA 5ª — DA QUITAÇÃO

Mediante o integral cumprimento das obrigações aqui assumidas, as partes se dão **plena, geral, irrevogável e irretratável quitação**, nada mais tendo a reclamar uma da outra, seja a que título for, em relação aos fatos objeto deste acordo.

{{#SE QUITACAO_PARCIAL}}
A quitação aqui referida restringe-se exclusivamente a {{ESCOPO_QUITACAO}}, permanecendo ressalvados quaisquer outros direitos não abrangidos por este termo.
{{/SE QUITACAO_PARCIAL}}

---

## CLÁUSULA 6ª — DO DESCUMPRIMENTO

Em caso de descumprimento de qualquer obrigação prevista neste acordo, a parte inadimplente ficará sujeita a:

a) **Multa** de {{PERCENTUAL_MULTA}}% sobre o valor total do acordo;
b) **Juros de mora** de {{JUROS_MORA}}% ao mês;
c) **Correção monetária** pelo {{INDICE_CORRECAO}};
d) {{CONSEQUENCIAS_ADICIONAIS}}

---

{{#SE PROCESSO_EXISTENTE}}
## CLÁUSULA 7ª — DA HOMOLOGAÇÃO JUDICIAL

As partes requerem a **homologação** do presente acordo nos autos do processo n° {{NUMERO_PROCESSO}}, nos termos do art. 515, II e III, do CPC, para que produza os efeitos de título executivo judicial.

Após a homologação, requerem a **extinção do processo** com resolução do mérito, nos termos do art. 487, III, "b", do CPC.

---
{{/SE PROCESSO_EXISTENTE}}

## CLÁUSULA {{NUMERO_CLAUSULA}} — DA CONFIDENCIALIDADE

{{#SE CONFIDENCIALIDADE}}
As partes se comprometem a manter em **sigilo** os termos e condições deste acordo, não divulgando seu conteúdo a terceiros, exceto quando obrigadas por lei ou determinação judicial.
{{/SE CONFIDENCIALIDADE}}

---

## CLÁUSULA {{NUMERO_CLAUSULA}} — DO FORO

As partes elegem o foro da Comarca de {{CIDADE}}/{{ESTADO}} para dirimir quaisquer dúvidas ou litígios decorrentes do presente acordo.

---

E por estarem assim justas e acordadas, as partes firmam o presente instrumento em 2 (duas) vias de igual teor e forma, na presença de 2 (duas) testemunhas.

{{CIDADE}}, {{DATA}}.

---

________________________________________
**{{NOME_PARTE_1}}**
CPF/CNPJ: {{CPF_CNPJ_P1}}

________________________________________
**{{NOME_PARTE_2}}**
CPF/CNPJ: {{CPF_CNPJ_P2}}

---

**Testemunhas:**

1) ______________________________________
Nome: {{TESTEMUNHA_1}}
CPF: {{CPF_T1}}

2) ______________________________________
Nome: {{TESTEMUNHA_2}}
CPF: {{CPF_T2}}

---

{{#SE ADVOGADOS}}
**Advogados assistentes:**

________________________________________
**{{NOME_ADVOGADO_P1}}** — OAB/{{UF_P1}} n° {{OAB_P1}}
Advogado(a) de {{DENOMINACAO_P1}}

________________________________________
**{{NOME_ADVOGADO_P2}}** — OAB/{{UF_P2}} n° {{OAB_P2}}
Advogado(a) de {{DENOMINACAO_P2}}
{{/SE ADVOGADOS}}
