# Task: Criar Ficha do Cliente/Caso

## Metadata
- id: ficha-cliente
- agent: @intake
- type: documentation

## Objetivo
Criar ficha padronizada do caso com todas as informações coletadas.

## Template da Ficha

```yaml
caso:
  numero: ""
  data_abertura: ""
  status: "intake"
  urgencia: ""
  area: ""
  sub_area: ""

cliente:
  nome: ""
  cpf_cnpj: ""
  telefone: ""
  email: ""
  endereco: ""
  profissao: ""

parte_contraria:
  nome: ""
  cpf_cnpj: ""
  endereco: ""
  advogado: ""

fatos:
  resumo: ""
  data_fatos: ""
  local: ""
  cronologia: []

documentos:
  recebidos: []
  pendentes: []

classificacao:
  area: ""
  sub_area: ""
  complexidade: ""
  urgencia: ""

expectativa_cliente: ""
valor_estimado: ""
observacoes: ""

encaminhamento:
  agente_destino: ""
  data: ""
  motivo: ""
```

## Output
- Ficha YAML preenchida e salva em docs/cases/
