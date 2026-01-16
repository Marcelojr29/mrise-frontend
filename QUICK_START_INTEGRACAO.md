# 🎯 Quick Start - Integração Backend

## ⚡ Setup Rápido (5 minutos)

### 1. Backend
```bash
cd backend
npm run start:dev
```
✅ Backend: http://localhost:3001  
✅ Swagger: http://localhost:3001/api/docs

### 2. Frontend
```bash
npm run dev
```
✅ Frontend: http://localhost:3000  
✅ Admin: http://localhost:3000/admin/login

---

## 📦 Importar Serviços

```typescript
import { 
  authService, 
  projectsService, 
  messagesService,
  servicesService,
  stackService 
} from '@/services';
```

---

## 🔐 Login

```typescript
const { user, tokens } = await authService.login({
  email: 'admin@mrisetech.com',
  password: 'senha123'
});
```

---

## 📧 Enviar Mensagem

```typescript
await messagesService.createMessage({
  name: 'João Silva',
  email: 'joao@email.com',
  message: 'Olá!'
});
```

---

## 🎨 Listar Projetos

```typescript
const { projects } = await projectsService.getProjects({
  featured: true,
  isActive: true
});
```

---

## ⚡ Listar Stack

```typescript
const categorized = await stackService.getTechnologiesByCategory();
// { frontend: [...], backend: [...], ... }
```

---

## 🛡️ Proteger Rota

```typescript
import { useAuth } from '@/hooks/use-auth';

export default function Page() {
  const { user } = useAuth(); // Auto-protege
  return <div>Olá {user?.name}</div>;
}
```

---

## 📚 Documentação Completa

- 📄 [README_INTEGRACAO.md](README_INTEGRACAO.md)
- 📄 [GUIA_USO_SERVICOS.md](docs/GUIA_USO_SERVICOS.md)
- 📄 [INTEGRACAO_COMPLETA.md](INTEGRACAO_COMPLETA.md)
- 🌐 [Swagger Docs](http://localhost:3001/api/docs)

---

## ✅ Checklist

- [ ] Backend rodando
- [ ] Frontend rodando
- [ ] .env.local criado
- [ ] Swagger acessível
- [ ] Login funcionando

---

## 🆘 Problemas?

**Backend não inicia:**
- Verifique MongoDB
- Confira variáveis de ambiente

**Erro 401:**
- Faça login novamente
- Limpe localStorage

**Erro de importação:**
- Verifique caminho: `@/services`
- Reinicie o TypeScript server

---

🚀 **Pronto para usar!**
