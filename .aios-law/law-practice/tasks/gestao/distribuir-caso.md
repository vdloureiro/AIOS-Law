# Task: Distribuir Caso para Especialista

## Metadata
- id: distribuir-caso
- agent: @case-manager
- type: management

## Objetivo
Distribuir caso para o advogado especialista correto com base na classificação.

## Regras de Distribuição

| Área | Agente |
|------|--------|
| Civil (contratos, responsabilidade, família, consumidor) | @civil |
| Trabalhista (CLT, empregado, empregador) | @labor |
| Penal (crimes, defesa criminal) | @criminal |
| Tributário (impostos, fiscal, CARF) | @tax |
| Empresarial (societário, M&A, startup) | @corporate |
| Administrativo (licitação, servidor, Estado) | @admin-law |

## Casos Multidisciplinares
- Identificar área PRINCIPAL e área SECUNDÁRIA
- Atribuir ao agente da área principal
- Registrar necessidade de consulta à área secundária

## Procedimento
- [ ] Verificar classificação feita por @intake
- [ ] Confirmar área com base na análise de @strategist
- [ ] Atribuir ao agente correto
- [ ] Notificar agente da atribuição
- [ ] Cadastrar prazos iniciais
- [ ] Registrar distribuição no caso

## Output
- Caso atribuído ao agente correto
- Notificação enviada
- Prazos cadastrados
