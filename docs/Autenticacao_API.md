# Documentação da API - Autenticação

## Visão Geral
Esta documentação descreve a estrutura de dados e endpoints necessários para implementar a autenticação do sistema administrativo.

## Modelo de Dados

### User (Usuário Admin)
```typescript
interface User {
  id: string                    // UUID único do usuário
  name: string                  // Nome completo do administrador
  email: string                 // Email (usado para login)
  password: string              // Senha hash (bcrypt ou similar)
  role: "admin" | "super_admin" // Nível de acesso
  avatar?: string               // URL da foto de perfil (opcional)
  createdAt: string             // Data de criação (ISO 8601)
  updatedAt: string             // Data da última atualização (ISO 8601)
  lastLogin?: string            // Data do último login (ISO 8601)
  isActive: boolean             // Status da conta (ativo/inativo)
}
```

### AuthToken
```typescript
interface AuthToken {
  accessToken: string     // JWT token de acesso
  refreshToken: string    // JWT token de renovação
  expiresIn: number       // Tempo de expiração em segundos (ex: 3600)
  tokenType: "Bearer"     // Tipo do token
}
```

### LoginCredentials
```typescript
interface LoginCredentials {
  email: string     // Email do usuário
  password: string  // Senha em texto plano (será enviada via HTTPS)
}
```

## Endpoints da API

### 1. Login
Autentica um usuário e retorna tokens de acesso.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "admin@mrisetech.com",
  "password": "senha_segura"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Administrador",
      "email": "admin@mrisetech.com",
      "role": "admin",
      "avatar": "https://example.com/avatar.jpg",
      "lastLogin": "2026-01-13T10:30:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  },
  "message": "Login realizado com sucesso"
}
```

**Response Error (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email ou senha inválidos"
  }
}
```

### 2. Logout
Invalida o token atual do usuário.

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

### 3. Refresh Token
Renova o token de acesso usando o refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "tokenType": "Bearer"
  }
}
```

### 4. Verificar Token
Verifica se o token atual é válido.

**Endpoint:** `GET /api/auth/verify`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "admin@mrisetech.com",
      "role": "admin"
    }
  }
}
```

### 5. Obter Perfil do Usuário Logado
Retorna informações do usuário autenticado.

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Administrador",
    "email": "admin@mrisetech.com",
    "role": "admin",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "lastLogin": "2026-01-13T10:30:00Z"
  }
}
```

### 6. Atualizar Senha
Permite que o usuário autenticado altere sua senha.

**Endpoint:** `PUT /api/auth/change-password`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "currentPassword": "senha_atual",
  "newPassword": "nova_senha_segura",
  "confirmPassword": "nova_senha_segura"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Senha alterada com sucesso"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": {
    "code": "PASSWORD_MISMATCH",
    "message": "A senha atual está incorreta"
  }
}
```

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `INVALID_CREDENTIALS` | Email ou senha inválidos |
| `ACCOUNT_DISABLED` | Conta de usuário desativada |
| `TOKEN_EXPIRED` | Token de acesso expirado |
| `TOKEN_INVALID` | Token inválido ou malformado |
| `UNAUTHORIZED` | Acesso não autorizado |
| `PASSWORD_MISMATCH` | Senha atual incorreta |
| `WEAK_PASSWORD` | Senha não atende aos requisitos mínimos |

## Segurança

### Headers Obrigatórios
Todas as requisições autenticadas devem incluir:
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### JWT Payload
```typescript
interface JWTPayload {
  userId: string        // ID do usuário
  email: string         // Email do usuário
  role: string          // Papel do usuário
  iat: number          // Issued at (timestamp)
  exp: number          // Expiration (timestamp)
}
```

### Requisitos de Senha
- Mínimo de 8 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número
- Pelo menos um caractere especial

## Exemplo de Integração (Frontend)

```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Salvar tokens no localStorage ou cookie seguro
    localStorage.setItem('accessToken', data.data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
    return data.data.user;
  }
  
  throw new Error(data.error.message);
};

// Requisição autenticada
const fetchProtectedData = async () => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/protected-endpoint', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response.json();
};
```

## Notas de Implementação

1. **Armazenamento de Senha**: Use bcrypt com salt rounds >= 10
2. **Token Expiration**: AccessToken: 1 hora, RefreshToken: 7 dias
3. **HTTPS**: Todas as requisições devem usar HTTPS em produção
4. **Rate Limiting**: Implemente rate limiting no endpoint de login (ex: 5 tentativas por 15 minutos)
5. **CORS**: Configure CORS apropriadamente para o domínio do frontend
6. **Cookie HttpOnly**: Considere usar cookies HttpOnly para o refresh token em produção
