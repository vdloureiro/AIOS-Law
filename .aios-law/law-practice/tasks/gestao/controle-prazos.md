# Task: Controle de Prazos Processuais

## Metadata
- id: controle-prazos
- agent: @case-manager
- type: management
- severity: BLOCK
- frequency: daily

## Objetivo
Monitorar e alertar sobre todos os prazos processuais ativos.

## Procedimento Diário

### 1. Verificação Matinal
- [ ] Consultar todos os prazos vencendo nas próximas 48h
- [ ] Emitir alertas CRITICAL para prazos < 24h
- [ ] Emitir alertas WARNING para prazos 24-48h
- [ ] Verificar publicações no Diário Oficial

### 2. Para cada prazo identificado
- [ ] Confirmar que o agente responsável está ciente
- [ ] Verificar se a peça está em andamento
- [ ] Verificar se a revisão está agendada
- [ ] Verificar se o checkpoint human-in-the-loop está previsto

### 3. Registro
- [ ] Atualizar status de cada prazo (pendente/em andamento/cumprido)
- [ ] Registrar prazos cumpridos com data e protocolo
- [ ] Cadastrar novos prazos identificados

## Níveis de Alerta
| Nível | Tempo | Ação |
|-------|-------|------|
| CRITICAL | < 24h | Notificação imediata |
| WARNING | 24-48h | Alerta ao responsável |
| ATTENTION | 48h-5dias | Lembrete |
| INFO | > 5 dias | Dashboard |

## Output
- Relatório diário de prazos
- Alertas emitidos
- Status atualizado
