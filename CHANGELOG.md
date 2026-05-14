# Changelog

## [1.0.3] - 14/05/2026

### Adicionado
- Novo contexto `UserRegistration` com persistencia no SecureStore e headers de autenticacao (`getAuthHeaders`).

### Alterado
- Telas e componentes agora usam dados de `UserRegistration` no lugar do contexto antigo de localizacao atual.
- Tipos e schemas renomeados: `CollectionSchedule` -> `CollectionDays`, `UserLocation` -> `UserRegistration`, e modelos de request/response relacionados.
- Hook/servico de websocket de caminhoes agora usa `phoneId` (camelCase) e envia no query.
- Fluxo de cadastro usa os caminhos atualizados de mapper/servico para registro de usuario.

### Removido
- Provider e hook `useCurrentLocation` foram removidos.
