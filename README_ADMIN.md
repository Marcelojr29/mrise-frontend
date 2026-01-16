# Sistema Administrativo - MRISE TECH Portfolio

## 📋 Visão Geral

Este projeto contém um portfólio completo com sistema administrativo integrado para gerenciamento de conteúdo. O sistema permite que administradores gerenciem projetos, serviços, stack tecnológica e mensagens de contato através de um painel moderno e intuitivo.

## 🎯 Funcionalidades

### Frontend Público
- ✅ Página inicial com apresentação da empresa
- ✅ Seção de serviços oferecidos
- ✅ Portfólio de projetos
- ✅ Stack tecnológica
- ✅ Formulário de contato
- ✅ Design responsivo e moderno
- ✅ Tema dark/light

### Painel Administrativo
- ✅ Sistema de autenticação seguro
- ✅ Dashboard com métricas e estatísticas
- ✅ Gerenciamento de mensagens de contato
- ✅ CRUD completo de projetos
- ✅ CRUD completo de serviços
- ✅ CRUD completo de stack tecnológica
- ✅ Configurações do sistema
- ✅ Sidebar responsiva
- ✅ Interface moderna e tecnológica

## 🚀 Estrutura do Projeto

```
mrise-tech-portfolio/
├── app/
│   ├── admin/                    # Páginas administrativas
│   │   ├── layout.tsx           # Layout com sidebar e autenticação
│   │   ├── login/               # Página de login
│   │   ├── dashboard/           # Dashboard principal
│   │   ├── mensagens/           # Gerenciamento de mensagens
│   │   ├── projetos/            # Gerenciamento de projetos
│   │   ├── servicos/            # Gerenciamento de serviços
│   │   ├── stack/               # Gerenciamento de tecnologias
│   │   └── configuracoes/       # Configurações do sistema
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/
│   ├── admin/                   # Componentes específicos do admin
│   │   ├── stat-card.tsx       # Card de estatísticas
│   │   └── recent-messages.tsx # Listagem de mensagens recentes
│   ├── admin-sidebar.tsx        # Sidebar do painel admin
│   ├── ui/                      # Componentes UI reutilizáveis
│   ├── header.tsx               # Header do site (com botão de login)
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── projects.tsx
│   ├── tech-stack.tsx
│   └── cta.tsx                  # Formulário de contato
├── docs/                        # Documentação da API
│   ├── Autenticacao_API.md     # API de autenticação
│   ├── Mensagens_API.md        # API de mensagens
│   ├── Projetos_API.md         # API de projetos
│   ├── Servicos_API.md         # API de serviços
│   └── Stack_API.md            # API de stack tecnológica
└── lib/
    └── utils.ts
```

## 🔐 Autenticação

O sistema utiliza autenticação baseada em JWT (simulada no frontend, pronta para integração com backend).

### Acesso ao Painel Admin
1. Clique no botão "Login" no header do site
2. Faça login com suas credenciais
3. Você será redirecionado para o dashboard

**Nota:** No momento, qualquer credencial válida funciona (simulação). Em produção, será integrado com o backend real conforme a documentação da API.

## 📱 Módulos do Sistema

### 1. Dashboard
- Visão geral com métricas importantes
- Estatísticas de mensagens, projetos e serviços
- Ações rápidas para acessar outros módulos
- Cards interativos com tendências

### 2. Mensagens de Contato
- Visualização de todas as mensagens recebidas
- Filtros por status (nova, lida, respondida)
- Busca por nome, email ou conteúdo
- Marcar como lida/respondida
- Adicionar notas internas
- Estatísticas de mensagens

### 3. Gerenciamento de Projetos
- Adicionar, editar e remover projetos
- Upload de imagens (URL)
- Definir tecnologias utilizadas
- Links para demo e GitHub
- Marcar projetos em destaque
- Busca e filtros
- Cards visuais com preview

### 4. Gerenciamento de Serviços
- Adicionar, editar e remover serviços
- Escolher ícone (Lucide Icons)
- Definir características/features
- Organização por categorias
- Interface intuitiva com cards

### 5. Stack Tecnológica
- Adicionar, editar e remover tecnologias
- Categorias: Frontend, Backend, Database, DevOps, Design, Mobile
- Níveis: Básico, Intermediário, Avançado
- Ícones das tecnologias (DevIcons)
- Visualização agrupada por categoria

### 6. Configurações
- Informações da empresa
- Links de redes sociais
- Alteração de senha
- Configurações gerais do sistema

## 🎨 Design e UX

### Características
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Moderno**: Interface limpa e tecnológica
- **Intuitivo**: Navegação fácil e clara
- **Consistente**: Componentes padronizados (shadcn/ui)
- **Acessível**: Seguindo boas práticas de acessibilidade

### Paleta de Cores
- **Primary**: Cor principal da marca
- **Background**: Fundo adaptativo (dark/light)
- **Card**: Cards com efeito de vidro (glassmorphism)
- **Border**: Bordas sutis para separação

## 📚 Documentação da API

Todas as APIs estão documentadas na pasta `docs/`:

### [Autenticação_API.md](docs/Autenticacao_API.md)
- Login e logout
- Refresh token
- Verificação de token
- Alteração de senha
- Estrutura de usuários

### [Mensagens_API.md](docs/Mensagens_API.md)
- Criar mensagem (público)
- Listar e filtrar mensagens
- Atualizar status
- Adicionar notas
- Estatísticas
- Exportação

### [Projetos_API.md](docs/Projetos_API.md)
- CRUD completo de projetos
- Filtros e busca
- Reordenação
- Campos e validações

### [Servicos_API.md](docs/Servicos_API.md)
- CRUD completo de serviços
- Categorias
- Ícones e features
- Sistema de preços

### [Stack_API.md](docs/Stack_API.md)
- CRUD completo de tecnologias
- Categorias e níveis
- Ícones (DevIcons)
- Estatísticas

## 🔌 Integração com Backend

### Como Integrar

1. **Configure as variáveis de ambiente:**
```env
NEXT_PUBLIC_API_URL=https://api.seusite.com
```

2. **Substitua as chamadas mockadas:**

Exemplo atual (mock):
```typescript
setTimeout(() => {
  // Simulação
  const data = mockData
  // ...
}, 1000)
```

Substituir por:
```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

const result = await response.json()
```

3. **Implemente os endpoints no backend** seguindo a documentação na pasta `docs/`

### Endpoints Principais

```
POST   /api/auth/login              # Login
POST   /api/auth/logout             # Logout
GET    /api/auth/me                 # Perfil do usuário

GET    /api/messages                # Listar mensagens
POST   /api/messages                # Criar mensagem
PATCH  /api/messages/:id/status     # Atualizar status

GET    /api/projects                # Listar projetos
POST   /api/projects                # Criar projeto
PUT    /api/projects/:id            # Atualizar projeto
DELETE /api/projects/:id            # Excluir projeto

GET    /api/services                # Listar serviços
POST   /api/services                # Criar serviço
PUT    /api/services/:id            # Atualizar serviço
DELETE /api/services/:id            # Excluir serviço

GET    /api/stack                   # Listar tecnologias
POST   /api/stack                   # Criar tecnologia
PUT    /api/stack/:id               # Atualizar tecnologia
DELETE /api/stack/:id               # Excluir tecnologia
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide Icons** - Ícones
- **React Hook Form** - Formulários
- **Zod** - Validação de dados

## 🏗️ Arquitetura do Frontend

### Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        APRESENTAÇÃO                              │
├─────────────────────────────────────────────────────────────────┤
│  Pages (Next.js App Router)                                     │
│  ├── app/page.tsx (Pública)                                     │
│  └── app/admin/* (Protegidas)                                   │
│                                                                  │
│  Components                                                      │
│  ├── Públicos: Hero, Projects, Services, Tech-Stack, CTA        │
│  ├── Admin: Sidebar, StatCard, RecentMessages                   │
│  └── UI: Button, Card, Input, Dialog, Alert... (shadcn/ui)      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         LÓGICA DE NEGÓCIO                        │
├─────────────────────────────────────────────────────────────────┤
│  Services (Camada de Serviço)                                   │
│  ├── auth.service.ts      → Autenticação e perfil              │
│  ├── messages.service.ts  → Gerenciamento de mensagens          │
│  ├── projects.service.ts  → CRUD de projetos                    │
│  ├── services.service.ts  → CRUD de serviços                    │
│  ├── stack.service.ts     → CRUD de tecnologias                 │
│  └── settings.service.ts  → Configurações da empresa            │
│                                                                  │
│  Hooks Customizados                                             │
│  ├── use-toast.ts         → Sistema de notificações            │
│  └── use-mobile.ts        → Detecção de dispositivo            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      COMUNICAÇÃO HTTP                            │
├─────────────────────────────────────────────────────────────────┤
│  lib/api.ts (Cliente Axios)                                     │
│  ├── Interceptor de Request  → Adiciona Bearer Token           │
│  ├── Interceptor de Response → Trata erros 401 (logout)        │
│  ├── getResponseData()       → Extrai data de ApiResponse       │
│  └── handleApiError()        → Padroniza mensagens de erro     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND API                               │
├─────────────────────────────────────────────────────────────────┤
│  NestJS Backend (http://localhost:3001)                         │
│  ├── /api/auth/*          → Autenticação JWT                    │
│  ├── /api/messages/*      → Mensagens de contato                │
│  ├── /api/projects/*      → Projetos do portfólio               │
│  ├── /api/services/*      → Serviços oferecidos                 │
│  ├── /api/stack/*         → Stack tecnológica                   │
│  └── /api/settings/*      → Configurações da empresa            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       BANCO DE DADOS                             │
├─────────────────────────────────────────────────────────────────┤
│  MongoDB                                                         │
│  ├── users         → Usuários administradores                   │
│  ├── messages      → Mensagens de contato                       │
│  ├── projects      → Projetos do portfólio                      │
│  ├── services      → Serviços oferecidos                        │
│  ├── technologies  → Stack tecnológica                          │
│  └── settings      → Configurações (singleton)                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

#### 1. Autenticação (Login)
```
Usuario → Login Page → authService.login()
                          ↓
                     POST /api/auth/login
                          ↓
            Token salvo em localStorage
                          ↓
              router.push("/admin/dashboard")
```

#### 2. Requisição Autenticada
```
Página Admin → service.method()
                    ↓
              lib/api.ts (Axios)
                    ↓
    Interceptor adiciona: Authorization: Bearer {token}
                    ↓
            POST/GET/PUT/DELETE /api/*
                    ↓
              Backend valida JWT
                    ↓
        Response: { success: true, data: {...} }
                    ↓
              getResponseData(response)
                    ↓
          Componente atualiza UI
```

#### 3. Tratamento de Erro 401
```
API Response 401 Unauthorized
          ↓
   Interceptor detecta
          ↓
  localStorage.clear()
          ↓
router.push("/admin/login")
```

### Padrões Arquiteturais

#### 1. **Separação de Responsabilidades**
- **Components**: Apenas apresentação e interação do usuário
- **Services**: Lógica de negócio e comunicação com API
- **Lib/API**: Cliente HTTP centralizado com interceptors
- **Types**: Definições de tipos TypeScript compartilhadas

#### 2. **Service Layer Pattern**
Todos os serviços seguem o mesmo padrão:
```typescript
class ServiceName {
  async getAll(): Promise<Type[]> { /* ... */ }
  async getById(id: string): Promise<Type> { /* ... */ }
  async create(data: CreateDto): Promise<Type> { /* ... */ }
  async update(id: string, data: UpdateDto): Promise<Type> { /* ... */ }
  async delete(id: string): Promise<void> { /* ... */ }
}
```

#### 3. **Estrutura de Response Padronizada**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

#### 4. **Client-Side vs Server-Side**
- **Páginas Públicas**: Componentes Client ("use client") com dados mockados
- **Páginas Admin**: Componentes Client com integração real à API
- **Layout**: Verifica autenticação e protege rotas

### Componentes Principais

#### 1. **Layout Admin** (`app/admin/layout.tsx`)
```typescript
✓ Verifica token no localStorage (accessToken)
✓ Redireciona para /admin/login se não autenticado
✓ Renderiza AdminSidebar para páginas autenticadas
✓ Mostra loading durante verificação
```

#### 2. **HTTP Client** (`lib/api.ts`)
```typescript
✓ Instância Axios configurada
✓ baseURL: http://localhost:3001
✓ timeout: 10000ms
✓ Interceptors para auth e erro
```

#### 3. **Services** (`services/*.service.ts`)
```typescript
✓ Métodos tipados com TypeScript
✓ Tratamento de erro padronizado
✓ Reutilizáveis em qualquer componente
✓ Exporta instância singleton
```

### Estado e Gerenciamento de Dados

#### Local State (useState)
- Formulários e inputs
- Estados de UI (loading, error)
- Dados temporários

#### localStorage
- `accessToken`: JWT token de autenticação
- `user`: Dados do usuário logado (JSON)

#### Server State
- Dados vêm da API do backend
- Cada página carrega seus dados via useEffect
- Não há cache de dados (sempre busca atualizado)

### Roteamento

#### Next.js App Router
```
app/
├── page.tsx                    → / (pública)
├── admin/
│   ├── layout.tsx             → Layout com proteção
│   ├── login/page.tsx         → /admin/login
│   ├── dashboard/page.tsx     → /admin/dashboard
│   ├── mensagens/page.tsx     → /admin/mensagens
│   ├── projetos/page.tsx      → /admin/projetos
│   ├── servicos/page.tsx      → /admin/servicos
│   ├── stack/page.tsx         → /admin/stack
│   └── configuracoes/page.tsx → /admin/configuracoes
```

#### Proteção de Rotas
- Layout admin verifica `localStorage.getItem("accessToken")`
- Se não existir token → redirect para `/admin/login`
- Página de login não passa pela verificação

### Segurança

#### Frontend
✓ Validação de formulários com Zod
✓ Sanitização de inputs
✓ Token em localStorage (substituir por httpOnly cookies em produção)
✓ Logout automático em 401

#### Backend (esperado)
✓ JWT com expiração (8 horas)
✓ Bcrypt para senhas
✓ Validação com class-validator
✓ Guards do NestJS
✓ Rate limiting

### Responsividade

#### Breakpoints (Tailwind CSS)
```
sm:  640px  → Tablet portrait
md:  768px  → Tablet landscape
lg:  1024px → Desktop
xl:  1280px → Large desktop
2xl: 1536px → Extra large
```

#### Componentes Adaptáveis
- Sidebar colapsa em mobile (menu hambúrguer)
- Grids se tornam stacks verticais
- Cards ajustam padding e tamanho
- Tabelas se transformam em cards em mobile

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 🔒 Segurança

### Boas Práticas Implementadas
- ✅ Validação de entrada em todos os formulários
- ✅ Autenticação necessária para rotas admin
- ✅ Tokens armazenados de forma segura
- ✅ Proteção contra acesso não autorizado
- ✅ Validação no frontend e backend (quando integrado)

### Recomendações para Produção
- [ ] Implementar rate limiting
- [ ] Usar HTTPS obrigatoriamente
- [ ] Cookies HttpOnly para refresh tokens
- [ ] Sanitização de inputs
- [ ] CORS configurado corretamente
- [ ] Logging de ações administrativas
- [ ] Backup regular do banco de dados

## 🚦 Próximos Passos

1. **Integrar com Backend Real**
   - Implementar APIs conforme documentação
   - Conectar banco de dados
   - Configurar autenticação JWT

2. **Upload de Arquivos**
   - Implementar upload de imagens
   - Integrar com AWS S3 ou Cloudinary

3. **Melhorias Futuras**
   - Sistema de notificações em tempo real
   - Analytics e relatórios avançados
   - Multi-idioma (i18n)
   - Exportação de dados
   - Histórico de alterações (audit log)

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: contato@mrisetech.com
- WhatsApp: +55 (92) 99322-0408

## 📝 Licença

Este projeto é propriedade da MRISE TECH. Todos os direitos reservados.

---

**Desenvolvido com ❤️ pela MRISE TECH**
