# TEMPLATE: Ficha do Caso

---

```yaml
# ─── Dados do Caso ──────────────────────────────────────────────────
caso:
  numero: "CASE-{{ANO}}-{{SEQ}}"
  data_abertura: "{{DATA_ABERTURA}}"
  status: "intake"
  urgencia: "{{URGENCIA}}"  # alta | media | baixa
  area: "{{AREA}}"
  sub_area: "{{SUB_AREA}}"

# ─── Dados do Cliente ───────────────────────────────────────────────
cliente:
  tipo: "{{PF|PJ}}"
  nome: "{{NOME_CLIENTE}}"
  cpf_cnpj: "{{CPF_CNPJ}}"
  rg: "{{RG}}"
  nacionalidade: "{{NACIONALIDADE}}"
  estado_civil: "{{ESTADO_CIVIL}}"
  profissao: "{{PROFISSAO}}"
  telefone: "{{TELEFONE}}"
  email: "{{EMAIL}}"
  endereco:
    logradouro: "{{LOGRADOURO}}"
    numero: "{{NUMERO}}"
    complemento: "{{COMPLEMENTO}}"
    bairro: "{{BAIRRO}}"
    cidade: "{{CIDADE}}"
    estado: "{{UF}}"
    cep: "{{CEP}}"

# ─── Parte Contrária ────────────────────────────────────────────────
parte_contraria:
  nome: "{{NOME_PARTE_CONTRARIA}}"
  cpf_cnpj: "{{CPF_CNPJ_PC}}"
  endereco: "{{ENDERECO_PC}}"
  advogado: "{{ADVOGADO_PC}}"
  oab_advogado: "{{OAB_ADV_PC}}"

# ─── Fatos ──────────────────────────────────────────────────────────
fatos:
  resumo: |
    {{RESUMO_FATOS}}
  data_fatos: "{{DATA_FATOS}}"
  local: "{{LOCAL_FATOS}}"
  jurisdicao: "{{JURISDICAO}}"
  cronologia:
    - data: "{{DATA_1}}"
      evento: "{{EVENTO_1}}"
    - data: "{{DATA_2}}"
      evento: "{{EVENTO_2}}"
  partes_envolvidas:
    - nome: "{{PARTE_1}}"
      papel: "{{PAPEL_1}}"
  tentativa_resolucao: "{{TENTATIVA_ANTERIOR}}"

# ─── Documentos ─────────────────────────────────────────────────────
documentos:
  recebidos:
    - nome: "{{DOC_1}}"
      tipo: "{{TIPO_DOC_1}}"
      data_recebimento: "{{DATA_REC_1}}"
  pendentes:
    - nome: "{{DOC_PEND_1}}"
      importancia: "{{ESSENCIAL|RECOMENDADO|COMPLEMENTAR}}"
      prazo: "{{PRAZO_DOC}}"

# ─── Classificação ──────────────────────────────────────────────────
classificacao:
  area: "{{AREA_DIREITO}}"
  sub_area: "{{SUB_AREA_DIREITO}}"
  complexidade: "{{ALTA|MEDIA|BAIXA}}"
  urgencia: "{{ALTA|MEDIA|BAIXA}}"
  viabilidade_preliminar: "{{ALTA|MEDIA|BAIXA|INCERTA}}"
  multidisciplinar: false
  areas_secundarias: []

# ─── Expectativa do Cliente ─────────────────────────────────────────
expectativa:
  descricao: "{{EXPECTATIVA_CLIENTE}}"
  valor_estimado: "{{VALOR_ESTIMADO}}"
  prazo_desejado: "{{PRAZO_DESEJADO}}"

# ─── Encaminhamento ─────────────────────────────────────────────────
encaminhamento:
  agente_destino: "{{AGENTE_DESTINO}}"
  data_encaminhamento: "{{DATA_ENCAMINHAMENTO}}"
  motivo: "{{MOTIVO_ENCAMINHAMENTO}}"

# ─── Observações ────────────────────────────────────────────────────
observacoes: |
  {{OBSERVACOES}}

# ─── Metadados ──────────────────────────────────────────────────────
metadados:
  criado_por: "@intake"
  data_criacao: "{{DATA_CRIACAO}}"
  ultima_atualizacao: "{{DATA_ATUALIZACAO}}"
  atualizado_por: "{{AGENTE_ATUALIZACAO}}"
```
