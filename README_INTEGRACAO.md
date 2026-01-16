# 🔗 Integração Frontend ↔ Backend - MRISE TECH

## ✅ Integração Completa Implementada

A integração entre o frontend (Next.js) e backend (NestJS) foi concluída com sucesso!

## 📁 Arquivos Criados

### 🔧 Configuração
- [`.env.local`](.env.local) - Variáveis de ambiente
- [`lib/api.ts`](lib/api.ts) - Cliente Axios configurado com interceptadores

### 🔐 Autenticação
- [`services/auth.service.ts`](services/auth.service.ts) - Serviço de autenticação
- [`hooks/use-auth.ts`](hooks/use-auth.ts) - Hook de autenticação
- [`contexts/auth-context.tsx`](contexts/auth-context.tsx) - Context Provider (opcional)
- [`components/protected-route.tsx`](components/protected-route.tsx) - Componente de proteção de rotas

### 📡 Serviços de API
- [`services/messages.service.ts`](services/messages.service.ts) - Gerenciamento de mensagens
- [`services/projects.service.ts`](services/projects.service.ts) - Gerenciamento de projetos
- [`services/services.service.ts`](services/services.service.ts) - Gerenciamento de serviços
- [`services/stack.service.ts`](services/stack.service.ts) - Gerenciamento de stack tecnológica
- [`services/index.ts`](services/index.ts) - Exportações centralizadas

### 📝 Tipos
- [`types/index.ts`](types/index.ts) - Tipos TypeScript atualizados com campos do backend

### 📚 Documentação
- [`docs/GUIA_USO_SERVICOS.md`](docs/GUIA_USO_SERVICOS.md) - Guia completo de uso

## 🚀 Como Usar

### 1️⃣ Configuração Inicial

Certifique-se de que o backend está rodando:
```bash
cd backend
npm run start:dev
```

O backend deve estar disponível em: `http://localhost:3001`

### 2️⃣ Usar os Serviços

#### Exemplo: Login
```typescript
import { authService } from '@/services';

const handleLogin = async () => {
  try {
    const { user, tokens } = await authService.login({
      email: 'admin@mrisetech.com',
      password: 'senha123'
    });
    console.log('Login bem-sucedido!', user);
  } catch (error) {
    console.error(error.message);
  }
};
```

#### Exemplo: Listar Projetos
```typescript
import { projectsService } from '@/services';

const loadProjects = async () => {
  try {
    const { projects } = await projectsService.getProjects({
      featured: true,
      isActive: true
    });
    console.log('Projetos:', projects);
  } catch (error) {
    console.error(error.message);
  }
};
```

### 3️⃣ Proteger Rotas

#### Opção 1: Usando o Hook
```typescript
'use client';

import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { user, loading } = useAuth(); // Requer autenticação automaticamente

  if (loading) return <div>Carregando...</div>;

  return <div>Bem-vindo, {user?.name}!</div>;
}
```

#### Opção 2: Usando o Componente
```typescript
import ProtectedRoute from '@/components/protected-route';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div>Conteúdo protegido</div>
    </ProtectedRoute>
  );
}
```

#### Opção 3: Usando o Context
```typescript
'use client';

import { useAuthContext } from '@/contexts/auth-context';

export default function ProfilePage() {
  const { user, logout } = useAuthContext();

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## 📦 Estrutura dos Serviços

Todos os serviços seguem o mesmo padrão:

```typescript
class Service {
  async create(data) { }      // Criar (POST)
  async getAll(params) { }    // Listar (GET)
  async getById(id) { }       // Buscar por ID (GET)
  async update(id, data) { }  // Atualizar (PATCH)
  async delete(id) { }        // Deletar (DELETE)
}
```

## 🔒 Segurança

### Token JWT Automático
- Token é adicionado automaticamente em todas as requisições autenticadas
- Renovação automática quando expira
- Redirecionamento automático para login quando não autorizado

### Proteção de Rotas
- Verificação de autenticação
- Verificação de role (admin/super_admin)
- Redirecionamento automático

## 📋 Endpoints Disponíveis

### Autenticação (`/api/auth`)
- ✅ POST `/login` - Login
- ✅ POST `/register` - Registrar usuário
- ✅ POST `/refresh` - Renovar token
- ✅ POST `/logout` - Logout

### Mensagens (`/api/messages`)
- ✅ POST `/` - Criar mensagem (público)
- ✅ GET `/` - Listar mensagens (admin)
- ✅ GET `/:id` - Buscar mensagem (admin)
- ✅ PATCH `/:id` - Atualizar mensagem (admin)
- ✅ PATCH `/:id/read` - Marcar como lida (admin)
- ✅ PATCH `/:id/respond` - Marcar como respondida (admin)
- ✅ DELETE `/:id` - Deletar mensagem (admin)
- ✅ GET `/stats` - Estatísticas (admin)
- ✅ GET `/recent` - Mensagens recentes (admin)

### Projetos (`/api/projects`)
- ✅ POST `/` - Criar projeto (admin)
- ✅ GET `/` - Listar projetos (público)
- ✅ GET `/:id` - Buscar projeto (público)
- ✅ PATCH `/:id` - Atualizar projeto (admin)
- ✅ DELETE `/:id` - Deletar projeto (admin)
- ✅ PATCH `/:id/featured` - Toggle destaque (admin)
- ✅ PATCH `/:id/toggle-active` - Toggle ativo (admin)
- ✅ PATCH `/reorder` - Reordenar (admin)

### Serviços (`/api/services`)
- ✅ POST `/` - Criar serviço (admin)
- ✅ GET `/` - Listar serviços (público)
- ✅ GET `/:id` - Buscar serviço (público)
- ✅ PATCH `/:id` - Atualizar serviço (admin)
- ✅ DELETE `/:id` - Deletar serviço (admin)
- ✅ PATCH `/:id/toggle-active` - Toggle ativo (admin)
- ✅ PATCH `/reorder` - Reordenar (admin)

### Stack (`/api/stack`)
- ✅ POST `/` - Criar tecnologia (admin)
- ✅ GET `/` - Listar tecnologias (público)
- ✅ GET `/:id` - Buscar tecnologia (público)
- ✅ PATCH `/:id` - Atualizar tecnologia (admin)
- ✅ DELETE `/:id` - Deletar tecnologia (admin)
- ✅ GET `/stats` - Estatísticas (público)
- ✅ GET `/by-category` - Por categoria (público)
- ✅ PATCH `/:id/toggle-active` - Toggle ativo (admin)
- ✅ PATCH `/reorder` - Reordenar (admin)

## 🎯 Recursos Implementados

### ✅ Cliente API (Axios)
- Interceptadores de requisição e resposta
- Tratamento automático de erros
- Renovação automática de token
- Timeout configurável
- Headers automáticos

### ✅ Serviços Completos
- Tipagem TypeScript completa
- Tratamento de erros consistente
- Métodos para todos os endpoints
- Paginação e filtros
- Buscar, criar, atualizar e deletar

### ✅ Autenticação
- Login e registro
- Gerenciamento de tokens (access + refresh)
- Verificação de autenticação
- Logout com limpeza
- Proteção de rotas

### ✅ Tipos TypeScript
- Interfaces para todas as entidades
- Tipos de request e response
- Enums e constantes
- Aliases para compatibilidade (`_id` e `id`)

### ✅ Utilitários
- Hook de autenticação (`useAuth`)
- Context Provider (`AuthContext`)
- Componente de proteção (`ProtectedRoute`)
- Helpers de erro

## 📖 Documentação Completa

Para exemplos detalhados de uso, consulte:
- 📄 [`docs/GUIA_USO_SERVICOS.md`](docs/GUIA_USO_SERVICOS.md) - Guia completo com exemplos
- 📄 [`docs/backend/README_INTEGRACAO.md`](docs/backend/README_INTEGRACAO.md) - Documentação da API
- 🌐 Swagger: `http://localhost:3001/api/docs` - Documentação interativa

## 🆘 Troubleshooting

### Erro de CORS
Se receber erro de CORS, verifique se o backend está configurado para aceitar requisições do frontend:
```typescript
// backend/src/main.ts
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

### Token Expirado
O sistema renova automaticamente. Se falhar, fará logout e redirecionará para login.

### 401 Não Autorizado
Verifique se:
1. O backend está rodando
2. Você está logado
3. O token está válido (localStorage)

### Tipo não encontrado
Certifique-se de importar os tipos de `@/types`:
```typescript
import type { User, Project, Message } from '@/types';
```

## 🎉 Pronto para Usar!

A integração está completa e pronta para uso. Todos os serviços estão implementados, tipados e documentados.

### Próximos Passos:
1. ✅ Integração completa - **FEITO**
2. 🔄 Implementar nos componentes existentes
3. 🎨 Atualizar páginas admin para usar os serviços
4. 🧪 Testar funcionalidades
5. 🚀 Deploy

---

**Desenvolvido para MRISE TECH Portfolio** 🚀
