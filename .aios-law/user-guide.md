# AIOS-Law — Guia do Usuário

> Framework de Orquestração Multi-Agente para Prática Jurídica v1.0.0

---

## Início Rápido

### 1. Ative um agente

Cada agente é ativado com o prefixo `@`:

```
@intake      → Triagem e entrevista com cliente
@strategist  → Análise de viabilidade e estratégia
@researcher  → Pesquisa jurisprudencial e legislativa
@civil       → Direito civil, contratos, família
@labor       → Direito do trabalho
@criminal    → Direito penal, defesa criminal
@tax         → Direito tributário
@corporate   → Direito empresarial, societário
@admin-law   → Direito administrativo
@reviewer    → Revisão de qualidade de peças
@case-manager → Gestão de prazos e casos
```

### 2. Use comandos

Cada agente tem comandos prefixados com `*`:

```
@civil *peticao-inicial    → Redigir petição inicial cível
@labor *reclamacao          → Redigir reclamação trabalhista
@criminal *habeas-corpus    → Redigir habeas corpus
@reviewer *revisar          → Revisar peça processual
@case-manager *prazos       → Ver prazos próximos
```

### 3. Siga o fluxo

O fluxo recomendado para um caso novo é:

```
@intake *atender
  → @strategist *viabilidade
    → [Advogado aprova]
      → @especialista *peticao-inicial
        → @reviewer *revisar
          → [Advogado aprova peça final]
```

---

## Agentes Disponíveis

| Agente | ID | Papel | Comandos-chave |
|--------|-----|-------|----------------|
| Dra. Helena | `@intake` | Triagem | `*atender`, `*ficha`, `*classificar` |
| Dr. Marcus | `@strategist` | Estratégia | `*viabilidade`, `*estrategia`, `*parecer` |
| Dra. Sophia | `@researcher` | Pesquisa | `*jurisprudencia`, `*legislacao`, `*sumulas` |
| Dr. Cívil | `@civil` | Civil | `*peticao-inicial`, `*contestacao`, `*contrato` |
| Dra. Clara | `@labor` | Trabalhista | `*reclamacao`, `*calcular-rescisao` |
| Dr. Defensor | `@criminal` | Penal | `*habeas-corpus`, `*resposta-acusacao` |
| Dr. Fiscal | `@tax` | Tributário | `*anulatoria`, `*planejamento-tributario` |
| Dra. Victoria | `@corporate` | Empresarial | `*contrato-social`, `*due-diligence` |
| Dr. Público | `@admin-law` | Administrativo | `*mandado-seguranca`, `*impugnar-edital` |
| Dr. Revisor | `@reviewer` | Revisão | `*revisar`, `*gate`, `*checklist` |
| Dra. Gestora | `@case-manager` | Gestão | `*prazos`, `*casos`, `*distribuir` |

---

## Equipes (Agent Teams)

| Equipe | Descrição | Uso |
|--------|-----------|-----|
| `team-full` | Escritório completo | Casos multidisciplinares |
| `team-litigation` | Contencioso cível | Ações judiciais cíveis |
| `team-corporate` | Empresarial | M&A, societário, compliance |
| `team-criminal` | Criminal | Defesa penal |
| `team-labor` | Trabalhista | Reclamações e defesas |
| `team-advisory` | Consultivo | Pareceres e contratos |

---

## Workflows

| Workflow | Descrição |
|----------|-----------|
| `intake-cycle` | Triagem → Análise → Distribuição |
| `litigation-cycle` | Pesquisa → Redação → Revisão → Protocolo |
| `advisory-cycle` | Pesquisa → Elaboração → Revisão → Entrega |
| `appeal-cycle` | Análise → Pesquisa → Redação → Revisão → Protocolo |
| `contract-review-cycle` | Análise → Pesquisa → Parecer → Revisão |

---

## Princípios Fundamentais

1. **Ética OAB** — Todo output respeita o Código de Ética
2. **Sigilo** — Dados de clientes nunca são cruzados entre casos
3. **Fundamentação** — Toda orientação tem base legal
4. **Prazos** — Alertas automáticos sobre prazos processuais
5. **Human-in-the-loop** — Advogado humano aprova decisões finais

---

## Configuração

- `project-config.yaml` — Configure seu escritório (nome, OAB, estado, áreas)
- `core-config.yaml` — Configurações do sistema (prazos, alertas, modelo de IA)

---

*"A advocacia é indispensável à administração da justiça." — Art. 133, CF/88*
