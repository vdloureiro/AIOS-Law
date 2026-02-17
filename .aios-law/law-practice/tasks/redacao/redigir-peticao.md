# Task: Redigir Petição

## Metadata
- id: redigir-peticao
- agent: @civil | @labor | @criminal | @tax | @corporate | @admin-law
- type: drafting

## Objetivo
Redigir peça processual completa, fundamentada e pronta para revisão.

## Pré-condições
- [ ] Ficha do caso disponível
- [ ] Estratégia definida por @strategist
- [ ] Pesquisa jurisprudencial disponível (se solicitada a @researcher)
- [ ] Checkpoint human-in-the-loop aprovado

## Estrutura da Petição

### 1. Endereçamento
- [ ] Juízo competente correto
- [ ] Formato conforme tribunal

### 2. Qualificação das Partes
- [ ] Autor: nome, nacionalidade, estado civil, profissão, CPF/CNPJ, endereço
- [ ] Réu: mesmas informações (ou o que estiver disponível)
- [ ] Representação processual: advogado, OAB, endereço profissional

### 3. Fatos
- [ ] Narrativa cronológica e objetiva
- [ ] Apenas fatos juridicamente relevantes
- [ ] Cada alegação sustentada por prova

### 4. Fundamentação Jurídica
- [ ] Artigos de lei específicos e vigentes
- [ ] Jurisprudência verificável (tribunal, turma, relator, data, número)
- [ ] Doutrina (se relevante)
- [ ] Tese principal claramente exposta
- [ ] Contra-argumentos antecipados (se estratégico)

### 5. Pedidos
- [ ] Pedidos claros e específicos
- [ ] Compatíveis entre si
- [ ] Compatíveis com a causa de pedir
- [ ] Pedido de tutela de urgência (se aplicável)
- [ ] Pedido de justiça gratuita (se aplicável)
- [ ] Pedido de condenação em honorários

### 6. Provas
- [ ] Provas documentais listadas
- [ ] Prova testemunhal (se necessária)
- [ ] Prova pericial (se necessária)
- [ ] Depoimento pessoal (se necessário)

### 7. Valor da Causa
- [ ] Cálculo fundamentado
- [ ] Conforme art. 292, CPC (ou equivalente)

### 8. Fechamento
- [ ] Data e local
- [ ] Nome e OAB do advogado
- [ ] Documentos anexos listados

## Quality Gates
- [ ] Fundamentação legal verificável
- [ ] Conformidade OAB
- [ ] Coerência argumentativa
- [ ] Requisitos formais completos

## Output
- Petição redigida em formato markdown
- Lista de documentos a anexar

## Próximo Passo
Encaminhar para `@reviewer *revisar`
