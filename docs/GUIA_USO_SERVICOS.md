# 🚀 Guia de Uso dos Serviços de Integração

Este guia mostra como utilizar os serviços de integração com o backend no frontend.

## 📦 Estrutura Criada

```
├── .env.local                    # Variáveis de ambiente
├── lib/
│   └── api.ts                    # Configuração base do axios
├── services/
│   ├── index.ts                  # Exportações centralizadas
│   ├── auth.service.ts           # Autenticação
│   ├── messages.service.ts       # Mensagens
│   ├── projects.service.ts       # Projetos
│   ├── services.service.ts       # Serviços
│   └── stack.service.ts          # Stack tecnológica
└── types/
    └── index.ts                  # Tipos TypeScript atualizados
```

## 🔧 Configuração

### 1. Variáveis de Ambiente

O arquivo `.env.local` já foi criado com:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Importação dos Serviços

```typescript
// Importar todos os serviços
import { 
  authService, 
  messagesService, 
  projectsService, 
  servicesService, 
  stackService 
} from '@/services';

// Ou importar individualmente
import { authService } from '@/services/auth.service';
```

## 📝 Exemplos de Uso

### 🔐 Autenticação

#### Login
```typescript
'use client';

import { useState } from 'react';
import { authService } from '@/services';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user, tokens } = await authService.login({ email, password });
      
      console.log('Login bem-sucedido!', user);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Erro no login:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin(
        formData.get('email') as string,
        formData.get('password') as string
      );
    }}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

#### Verificar Autenticação
```typescript
import { authService } from '@/services';

// Verificar se está autenticado
const isAuth = authService.isAuthenticated();

// Obter usuário atual
const user = authService.getCurrentUser();

// Fazer logout
authService.logout();
```

### 📧 Mensagens (Formulário de Contato)

#### Enviar Mensagem (Público)
```typescript
'use client';

import { useState } from 'react';
import { messagesService } from '@/services';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      await messagesService.createMessage({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        company: formData.get('company') as string,
        message: formData.get('message') as string,
      });

      alert('Mensagem enviada com sucesso!');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Erro:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* campos do formulário */}</form>;
}
```

#### Listar Mensagens (Admin)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { messagesService } from '@/services';
import type { Message } from '@/types';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { messages } = await messagesService.getMessages({
        page: 1,
        pageSize: 20,
        status: 'nova',
      });
      setMessages(messages);
    } catch (error) {
      console.error('Erro:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await messagesService.markAsRead(id);
      loadMessages(); // Recarregar lista
    } catch (error) {
      alert(error.message);
    }
  };

  return <div>{/* renderizar mensagens */}</div>;
}
```

### 🎨 Projetos

#### Listar Projetos (Público)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { projectsService } from '@/services';
import type { Project } from '@/types';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { projects } = await projectsService.getProjects({
        featured: true,
        isActive: true,
        pageSize: 6,
      });
      setProjects(projects);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error.message);
    }
  };

  return <div>{/* renderizar projetos */}</div>;
}
```

#### Criar Projeto (Admin)
```typescript
import { projectsService } from '@/services';

const createProject = async () => {
  try {
    const newProject = await projectsService.createProject({
      title: 'Novo Projeto',
      description: 'Descrição do projeto',
      image: 'https://example.com/image.jpg',
      technologies: ['React', 'Next.js', 'TypeScript'],
      liveUrl: 'https://projeto.com',
      githubUrl: 'https://github.com/user/projeto',
      featured: true,
      category: 'web',
      isActive: true,
    });

    console.log('Projeto criado:', newProject);
  } catch (error) {
    console.error('Erro:', error.message);
  }
};
```

### 🛠️ Serviços

#### Listar Serviços (Público)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { servicesService } from '@/services';
import type { Service } from '@/types';

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const activeServices = await servicesService.getActiveServices();
      setServices(activeServices);
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return <div>{/* renderizar serviços */}</div>;
}
```

### ⚡ Stack Tecnológica

#### Listar Tecnologias (Público)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { stackService } from '@/services';
import type { Technology } from '@/types';

export default function TechStack() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    loadStack();
  }, []);

  const loadStack = async () => {
    try {
      // Obter tecnologias principais (nível avançado)
      const mainTechs = await stackService.getMainTechnologies(12);
      setTechnologies(mainTechs);
    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return <div>{/* renderizar tecnologias */}</div>;
}
```

#### Buscar por Categoria
```typescript
import { stackService } from '@/services';

const loadByCategory = async () => {
  try {
    const categorized = await stackService.getTechnologiesByCategory();
    
    console.log('Frontend:', categorized.frontend);
    console.log('Backend:', categorized.backend);
    console.log('Database:', categorized.database);
    // etc...
  } catch (error) {
    console.error('Erro:', error.message);
  }
};
```

## 🔒 Proteção de Rotas

### Criar um Hook de Autenticação
```typescript
// hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services';
import type { User } from '@/types';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    
    if (!currentUser) {
      router.push('/admin/login');
    } else {
      setUser(currentUser);
    }
    
    setLoading(false);
  }, [router]);

  return { user, loading, isAuthenticated: !!user };
}
```

### Usar em Páginas Protegidas
```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Bem-vindo, {user?.name}!</h1>
    </div>
  );
}
```

## 🎯 Dicas Importantes

### 1. Tratamento de Erros
Todos os serviços já tratam erros automaticamente e retornam mensagens amigáveis.

```typescript
try {
  await messagesService.createMessage(data);
} catch (error) {
  // error.message já contém uma mensagem amigável
  alert(error.message);
}
```

### 2. Renovação Automática de Token
O axios está configurado para renovar o token automaticamente quando expirar.

### 3. Tipos TypeScript
Todos os serviços são totalmente tipados. Use autocomplete do seu editor!

```typescript
const project: Project = await projectsService.getProjectById(id);
// TypeScript já sabe todos os campos disponíveis
```

### 4. Paginação
Endpoints que retornam listas incluem informação de paginação:

```typescript
const { messages, pagination } = await messagesService.getMessages({
  page: 1,
  pageSize: 20
});

console.log(pagination.total); // Total de itens
console.log(pagination.currentPage); // Página atual
console.log(pagination.totalPages); // Total de páginas
```

## 🚦 Status Codes Tratados

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Dados inválidos
- **401**: Não autorizado (redireciona para login)
- **403**: Acesso negado
- **404**: Não encontrado
- **409**: Conflito (recurso já existe)
- **500**: Erro no servidor

## 📚 Próximos Passos

1. Inicie o backend: `cd backend && npm run start:dev`
2. Inicie o frontend: `npm run dev`
3. Teste o login em: `http://localhost:3000/admin/login`
4. Use os serviços nas suas páginas!

## 🆘 Suporte

Para mais informações, consulte a documentação completa em:
- `docs/backend/README_INTEGRACAO.md`
- Swagger API: `http://localhost:3001/api/docs`
