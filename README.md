# 🚀 MRISE TECH - Portfolio & Admin Dashboard

Sistema completo de portfólio profissional com painel administrativo integrado.

## ✨ Visão Geral

Este projeto é um portfólio moderno desenvolvido com **Next.js 16** no frontend e **NestJS** no backend, oferecendo uma experiência completa para apresentação de projetos, serviços e tecnologias, além de um painel administrativo robusto para gerenciamento de conteúdo.

## 🎯 Características Principais

### 🌐 Frontend (Next.js 16)
- ⚡ **Next.js 16** com App Router
- 🎨 **Tailwind CSS** para estilização
- 🧩 **Radix UI** componentes acessíveis
- 🎭 **Lucide Icons** ícones modernos
- 📱 **Responsivo** em todos os dispositivos
- 🌙 **Dark Mode** suporte completo
- 🔐 **Autenticação JWT** integrada

### 🔌 Backend (NestJS)
- 🚀 **NestJS** framework escalável
- 🗄️ **MongoDB** banco de dados
- 🔒 **JWT Authentication** seguro
- 📚 **Swagger** documentação automática
- ✅ **Validation** entrada de dados
- 🎯 **RESTful API** completa

### 📦 Módulos Implementados

1. **🔐 Autenticação**
   - Login/Logout
   - Registro de usuários
   - Renovação de tokens
   - Proteção de rotas

2. **📧 Mensagens**
   - Formulário de contato público
   - Gerenciamento admin
   - Status de mensagens
   - Estatísticas

3. **🎨 Projetos**
   - Portfólio completo
   - CRUD administrativo
   - Projetos em destaque
   - Filtros e categorias

4. **🛠️ Serviços**
   - Listagem pública
   - Gerenciamento admin
   - Precificação
   - Categorização

5. **⚡ Stack Tecnológica**
   - Tecnologias por categoria
   - Níveis de experiência
   - Estatísticas
   - Ícones personalizados

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ instalado
- MongoDB rodando (ou MongoDB Atlas)
- npm ou pnpm

### 1. Instalação

```bash
# Instalar dependências do frontend
npm install
# ou
pnpm install

# Instalar dependências do backend
cd backend
npm install
cd ..
```

### 2. Configuração

```bash
# Criar arquivo .env.local (já criado)
# Verificar se contém:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Iniciar Serviços

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
npm run dev
```

### 4. Acessar

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api/docs
- **Admin Panel**: http://localhost:3000/admin

## 📚 Documentação

### 📖 Guias de Integração

- **[INTEGRACAO_COMPLETA.md](INTEGRACAO_COMPLETA.md)** - Resumo executivo da integração
- **[README_INTEGRACAO.md](README_INTEGRACAO.md)** - Overview detalhado
- **[CHECKLIST_INTEGRACAO.md](CHECKLIST_INTEGRACAO.md)** - Checklist completo
- **[docs/GUIA_USO_SERVICOS.md](docs/GUIA_USO_SERVICOS.md)** - Guia prático com exemplos

### 🔧 Documentação Técnica

Backend API:
- [Autenticação](docs/backend/INTEGRACAO_Autenticacao.md)
- [Mensagens](docs/backend/INTEGRACAO_Mensagens.md)
- [Projetos](docs/backend/INTEGRACAO_Projetos.md)
- [Serviços](docs/backend/INTEGRACAO_Servicos.md)
- [Stack](docs/backend/INTEGRACAO_Stack.md)

### 💡 Exemplos de Código

- [Login Example](docs/examples/login-example.tsx)
- [Admin Projects](docs/examples/projects-admin-example.tsx)
- [Contact Form](docs/examples/contact-form-example.tsx)
- [Public Sections](docs/examples/public-sections-example.tsx)

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 16
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Ícones**: Lucide React
- **HTTP Client**: Axios
- **Formulários**: React Hook Form + Zod

### Backend
- **Framework**: NestJS
- **Linguagem**: TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + Passport
- **Validation**: Class Validator
- **Documentation**: Swagger/OpenAPI

## 📁 Estrutura do Projeto

```
mrise-tech-portfolio/
├── app/                      # Páginas Next.js
│   ├── admin/               # Painel administrativo
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Homepage
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI base
│   └── ...                  # Componentes customizados
├── services/                # 🆕 Serviços de API
│   ├── auth.service.ts
│   ├── messages.service.ts
│   ├── projects.service.ts
│   ├── services.service.ts
│   └── stack.service.ts
├── lib/                     # Utilitários
│   └── api.ts              # 🆕 Cliente Axios
├── hooks/                   # React Hooks customizados
│   └── use-auth.ts         # 🆕 Hook de autenticação
├── contexts/                # React Contexts
│   └── auth-context.tsx    # 🆕 Context de auth
├── types/                   # 🆕 Tipos TypeScript
│   └── index.ts
├── docs/                    # 🆕 Documentação
│   ├── backend/            # Docs da API
│   └── examples/           # Exemplos de código
└── public/                  # Arquivos estáticos
```

## 🎨 Funcionalidades

### 🌐 Páginas Públicas

- ✅ Homepage com hero section
- ✅ Seção de projetos em destaque
- ✅ Serviços oferecidos
- ✅ Stack tecnológica
- ✅ Formulário de contato
- ✅ Footer com links sociais

### 🔐 Painel Administrativo

- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de projetos
- ✅ Gerenciamento de serviços
- ✅ Gerenciamento de tecnologias
- ✅ Gerenciamento de mensagens
- ✅ Configurações do sistema
- ✅ Autenticação segura

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Refresh tokens
- ✅ Proteção de rotas
- ✅ Validação de dados
- ✅ CORS configurado
- ✅ Rate limiting (backend)
- ✅ Sanitização de inputs

## 🚀 Deploy

### Frontend (Vercel)

```bash
# Build de produção
npm run build

# Deploy
vercel deploy
```

### Backend (Railway/Heroku/VPS)

```bash
cd backend
npm run build
npm run start:prod
```

## 📊 Scripts Disponíveis

### Frontend

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Lint do código
```

### Backend

```bash
cd backend
npm run start:dev    # Desenvolvimento com hot-reload
npm run build        # Build de produção
npm run start:prod   # Servidor de produção
npm run test         # Testes unitários
```

## 🤝 Como Usar

### Importar Serviços

```typescript
import { projectsService, authService } from '@/services';

// Listar projetos
const { projects } = await projectsService.getProjects();

// Fazer login
const { user } = await authService.login({ email, password });
```

### Proteger Rotas

```typescript
import { useAuth } from '@/hooks/use-auth';

export default function AdminPage() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return <div>Olá, {user?.name}!</div>;
}
```

### Enviar Formulário

```typescript
import { messagesService } from '@/services';

const handleSubmit = async (data) => {
  await messagesService.createMessage(data);
  alert('Mensagem enviada!');
};
```

## 🐛 Troubleshooting

### Backend não inicia?
- Verifique se o MongoDB está rodando
- Confira as variáveis de ambiente no backend

### Erro 401?
- Verifique se está logado
- Limpe o localStorage e faça login novamente
- Verifique se o token não expirou

### Erro de CORS?
- Configure o CORS no backend para aceitar `http://localhost:3000`

## 📝 TODO

- [ ] Implementar upload de imagens
- [ ] Adicionar testes E2E
- [ ] Implementar notificações em tempo real
- [ ] Sistema de tags para projetos
- [ ] Filtros avançados
- [ ] Dashboard analytics avançado

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido com foco em:
- ✅ Clean Code
- ✅ Type Safety
- ✅ Best Practices
- ✅ Performance
- ✅ Security
- ✅ Documentação

## 📄 Licença

Este projeto é privado e pertence a MRISE TECH.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Consulte a [documentação](docs/)
2. Verifique o [Swagger](http://localhost:3001/api/docs)
3. Veja os [exemplos de código](docs/examples/)

---

**Desenvolvido com ❤️ por MRISE TECH**

🚀 **Happy Coding!**
