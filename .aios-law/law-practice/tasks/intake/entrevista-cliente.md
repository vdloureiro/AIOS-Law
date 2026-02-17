# Task: Entrevista com Cliente

## Metadata
- id: entrevista-cliente
- agent: @intake
- type: elicitation
- elicit: true

## Objetivo
Conduzir entrevista estruturada com o cliente para coletar todos os fatos, documentos e informações necessárias para análise jurídica do caso.

## Pré-condições
- [ ] Cliente identificado (nome, contato)

## Passos

### 1. Identificação do Cliente
- [ ] Nome completo
- [ ] CPF ou CNPJ
- [ ] Endereço completo
- [ ] Telefone e email
- [ ] Profissão/atividade

### 2. Relato dos Fatos
- [ ] Solicitar relato cronológico dos fatos
- [ ] Identificar datas relevantes
- [ ] Identificar local dos fatos (jurisdição)
- [ ] Identificar partes envolvidas (nomes, qualificação)
- [ ] Verificar se houve tentativa prévia de resolução
- [ ] Verificar se há processo judicial em andamento

### 3. Documentação
- [ ] Listar documentos que o cliente possui
- [ ] Identificar documentos faltantes mas necessários
- [ ] Solicitar cópias dos documentos disponíveis
- [ ] Verificar autenticidade/validade dos documentos

### 4. Expectativa e Urgência
- [ ] Qual resultado o cliente espera?
- [ ] Há prazo correndo? Qual?
- [ ] Já consultou outro advogado?
- [ ] Há urgência (tutela de urgência)?

### 5. Classificação Inicial
- [ ] Identificar área do direito (civil, trabalhista, penal, etc.)
- [ ] Identificar sub-área específica
- [ ] Avaliar complexidade preliminar (alta/média/baixa)
- [ ] Avaliar urgência (alta/média/baixa)

## Output
- Ficha do caso preenchida (template: ficha-caso-tmpl.md)
- Resumo dos fatos
- Lista de documentos (recebidos + pendentes)
- Classificação da área jurídica
- Nível de urgência

## Próximo Passo
Encaminhar para `@strategist` via `@case-manager`
