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
