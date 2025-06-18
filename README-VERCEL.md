# 🚀 Deploy na Vercel - Raquel & Davi Site

Este guia te ajudará a fazer o deploy da aplicação na Vercel usando Docker.

## 📋 Pré-requisitos

- ✅ Conta na [Vercel](https://vercel.com)
- ✅ Conta no GitHub/GitLab/Bitbucket
- ✅ Banco de dados MySQL (PlanetScale, Railway, etc.)
- ✅ Node.js 18+ instalado

## 🔧 Configuração Rápida

### 1. **Preparar o Banco de Dados**

#### Opção A: PlanetScale (Recomendado - Gratuito)

1. Acesse [planetscale.com](https://planetscale.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Crie um banco de dados MySQL
5. Copie a URL de conexão

#### Opção B: Railway

1. Acesse [railway.app](https://railway.app)
2. Crie uma conta
3. Crie um novo projeto
4. Adicione um serviço MySQL
5. Copie a URL de conexão

### 2. **Configurar Variáveis de Ambiente**

Crie um arquivo `.env.local` com:

```env
DATABASE_URL="mysql://user:password@host:port/database"
BLOB_READ_WRITE_TOKEN="seu_token_aqui"
NEXTAUTH_SECRET="seu_secret_aqui"
NEXTAUTH_URL="https://seu-dominio.vercel.app"
```

### 3. **Deploy Automatizado**

Execute o script de deploy:

```powershell
.\deploy-vercel.ps1
```

### 4. **Deploy Manual**

#### Via Dashboard Web:

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório
4. Configure como "Docker"
5. Adicione as variáveis de ambiente
6. Clique em "Deploy"

#### Via CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 5. **Configurar Banco de Dados**

Após o deploy, execute as migrações:

```bash
# Acesse a URL da migração
curl -X POST https://seu-dominio.vercel.app/api/migrate
```

## 📁 Arquivos de Configuração

- `vercel.json` - Configuração da Vercel
- `Dockerfile` - Configuração do Docker
- `.dockerignore` - Arquivos ignorados no build
- `app/api/migrate/route.ts` - API para migrações

## 🔍 Troubleshooting

### Build falha

- Verifique se o Dockerfile está correto
- Confirme se todas as dependências estão no `package.json`
- Verifique os logs de build na Vercel

### Erro de conexão com banco

- Confirme se a `DATABASE_URL` está correta
- Verifique se o banco está acessível publicamente
- Teste a conexão localmente

### Imagens não carregam

- Configure o `BLOB_READ_WRITE_TOKEN` corretamente
- Verifique as configurações de imagem no `next.config.mjs`

## 📊 Monitoramento

- **Logs:** Dashboard da Vercel > Functions
- **Métricas:** Dashboard da Vercel > Analytics
- **Performance:** Vercel Speed Insights

## 🔄 Deploy Automático

Após configurar, cada push para `main` fará deploy automático.

## 🎉 Pronto!

Sua aplicação estará em: `https://seu-projeto.vercel.app`

---

**Precisa de ajuda?** Consulte o arquivo `vercel-deploy-guide.md` para instruções detalhadas.
