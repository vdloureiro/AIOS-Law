# Task: Verificar Jurisdição e Legislação Aplicável por Estado

## Metadata
- id: verificar-jurisdicao
- agent: @verificador
- type: quality-gate
- severity: BLOCK

## Objetivo
Garantir que a peça processual utiliza a legislação correta para o foro onde o processo tramita, considerando variações estaduais e municipais.

## Procedimento

### 1. Identificar o Foro do Processo
- [ ] Estado (UF) do foro
- [ ] Comarca/Seção Judiciária
- [ ] Tribunal competente (TJ, TRF, TRT, TRE)
- [ ] Justiça competente (Estadual, Federal, Trabalhista, Eleitoral, Militar)
- [ ] Vara competente (cível, criminal, fazenda pública, família, etc.)

### 2. Verificar Competência
- [ ] A matéria é de competência federal ou estadual?
- [ ] O endereçamento da peça está correto?
- [ ] A competência territorial está correta?
- [ ] Se trabalhista: TRT correto? Vara correta?
- [ ] Se federal: Seção Judiciária correta? TRF correto?

### 3. Verificar Legislação Estadual Aplicável
Para o estado do foro, confirmar:
- [ ] **ICMS:** RICMS do estado correto (se matéria tributária estadual)
- [ ] **ITCMD:** Lei estadual do estado correto (se matéria sucessória/doação)
- [ ] **IPVA:** Lei estadual correta
- [ ] **Custas:** Tabela de custas do tribunal correto
- [ ] **Organização judiciária:** CODJ do estado correto
- [ ] **Meio ambiente:** Legislação do órgão ambiental estadual correto
- [ ] **Código tributário estadual:** Se aplicável

### 4. Verificar Legislação Municipal Aplicável
Para o município do foro, quando aplicável:
- [ ] **ISS:** Lei municipal do município correto
- [ ] **IPTU:** Lei municipal correta
- [ ] **ITBI:** Lei municipal correta
- [ ] **Código de Posturas:** Se aplicável
- [ ] **Plano Diretor:** Se matéria urbanística/imobiliária
- [ ] **Código Tributário Municipal:** Se matéria tributária municipal

### 5. Verificar Variações Processuais por Tribunal

| Aspecto | O que verificar |
|---------|----------------|
| Endereçamento | Formato correto do tribunal (Ex: "Exmo. Juiz de Direito da X Vara Cível da Comarca de Y") |
| Custas | Valor correto conforme tabela do tribunal |
| Protocolo | Sistema correto (PJe, e-SAJ, PROJUDI, e-Proc) |
| Limites de arquivo | Tamanho máximo de PDF do sistema |
| Formato de citação | Conforme praxe do tribunal |

### 6. Checklist de Conflitos Normativos

| Conflito | Regra |
|----------|-------|
| Lei federal × lei estadual | CF art. 24 — competência concorrente: federal é geral, estadual suplementa |
| Lei estadual × lei municipal | Lei Orgânica do município — competência do município em assuntos locais |
| Norma regulatória × lei | Lei prevalece sobre norma infralegal |
| Tratado internacional × lei ordinária | Tratado de DH: status constitucional ou supralegal |

## Veredicto
- JURISDIÇÃO CORRETA: Legislação aplicável ao foro está correta
- AJUSTE NECESSÁRIO: Legislação estadual/municipal precisa de correção
- INCOMPETÊNCIA: Foro ou competência incorretos — BLOCK

## Output
- Confirmação de jurisdição e competência
- Lista de legislação estadual/municipal aplicável verificada
- Alertas de variação por estado/município
