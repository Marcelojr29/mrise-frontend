# 🎣 Hooks Customizados para Integração (Opcional)

## 📝 Sobre

Este arquivo contém exemplos de hooks customizados usando React Query para facilitar o gerenciamento de estado e cache das requisições.

**NOTA**: React Query não está instalado por padrão. Para usar esses hooks, instale primeiro:

```bash
npm install @tanstack/react-query
# ou
pnpm add @tanstack/react-query
```

## 📦 Configuração do React Query

### 1. Criar Provider

```typescript
// providers/query-provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 2. Adicionar no Layout

```typescript
// app/layout.tsx
import { QueryProvider } from '@/providers/query-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

## 🎣 Hooks de Projetos

```typescript
// hooks/use-projects.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services';
import type { Project, CreateProjectData, UpdateProjectData } from '@/types';

// Listar projetos
export function useProjects(params?: any) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsService.getProjects(params),
  });
}

// Buscar projeto por ID
export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getProjectById(id),
    enabled: !!id,
  });
}

// Criar projeto
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectData) => projectsService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Atualizar projeto
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectData }) =>
      projectsService.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
    },
  });
}

// Deletar projeto
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
```

## 🎣 Hooks de Mensagens

```typescript
// hooks/use-messages.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesService } from '@/services';
import type { CreateMessageData, UpdateMessageData } from '@/types';

export function useMessages(params?: any) {
  return useQuery({
    queryKey: ['messages', params],
    queryFn: () => messagesService.getMessages(params),
  });
}

export function useMessage(id: string) {
  return useQuery({
    queryKey: ['message', id],
    queryFn: () => messagesService.getMessageById(id),
    enabled: !!id,
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMessageData) => messagesService.createMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => messagesService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

export function useMessageStats() {
  return useQuery({
    queryKey: ['message-stats'],
    queryFn: () => messagesService.getStats(),
  });
}
```

## 🎣 Hooks de Serviços

```typescript
// hooks/use-services.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesService } from '@/services';
import type { CreateServiceData, UpdateServiceData } from '@/types';

export function useServices(params?: any) {
  return useQuery({
    queryKey: ['services', params],
    queryFn: () => servicesService.getServices(params),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => servicesService.getServiceById(id),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceData) => servicesService.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceData }) =>
      servicesService.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}
```

## 🎣 Hooks de Stack

```typescript
// hooks/use-stack.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stackService } from '@/services';
import type { CreateTechnologyData, UpdateTechnologyData } from '@/types';

export function useTechnologies(params?: any) {
  return useQuery({
    queryKey: ['technologies', params],
    queryFn: () => stackService.getTechnologies(params),
  });
}

export function useTechnology(id: string) {
  return useQuery({
    queryKey: ['technology', id],
    queryFn: () => stackService.getTechnologyById(id),
    enabled: !!id,
  });
}

export function useTechnologiesByCategory() {
  return useQuery({
    queryKey: ['technologies-by-category'],
    queryFn: () => stackService.getTechnologiesByCategory(),
  });
}

export function useTechnologyStats() {
  return useQuery({
    queryKey: ['technology-stats'],
    queryFn: () => stackService.getStats(),
  });
}

export function useCreateTechnology() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTechnologyData) => stackService.createTechnology(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technologies'] });
    },
  });
}
```

## 💡 Exemplo de Uso nos Componentes

### Com React Query

```typescript
'use client';

import { useProjects, useCreateProject } from '@/hooks/use-projects';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  // Buscar projetos (com cache e auto-refetch)
  const { data, isLoading, error } = useProjects({ featured: true });
  
  // Mutation para criar
  const createProject = useCreateProject();

  const handleCreate = async () => {
    try {
      await createProject.mutateAsync({
        title: 'Novo Projeto',
        description: 'Descrição',
        image: 'url',
        technologies: ['React'],
      });
      alert('Projeto criado!');
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <Button onClick={handleCreate} disabled={createProject.isPending}>
        {createProject.isPending ? 'Criando...' : 'Criar Projeto'}
      </Button>
      
      {data?.projects.map(project => (
        <div key={project._id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### Sem React Query (Usando apenas os serviços)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { projectsService } from '@/services';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { projects } = await projectsService.getProjects({ featured: true });
      setProjects(projects);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project._id}>{project.title}</div>
      ))}
    </div>
  );
}
```

## ✅ Vantagens do React Query

- ✅ **Cache automático**: Requisições são cacheadas
- ✅ **Refetch inteligente**: Atualiza dados quando necessário
- ✅ **Loading states**: Estados de loading/erro automáticos
- ✅ **Mutations**: Facilita operações de criação/atualização
- ✅ **Invalidation**: Invalida cache automaticamente
- ✅ **Devtools**: Ferramenta de debug visual
- ✅ **Otimistic updates**: Atualiza UI antes da resposta

## 📚 Mais Informações

- [React Query Docs](https://tanstack.com/query/latest)
- [Guia de Uso](./GUIA_USO_SERVICOS.md)

---

**Nota**: Os hooks com React Query são opcionais. Você pode usar diretamente os serviços se preferir uma abordagem mais simples.
