# 🚀 Guia Completo: Deploy na Vercel com Docker

## 📋 Pré-requisitos

1. **Conta na Vercel** - [vercel.com](https://vercel.com)
2. **Conta no GitHub/GitLab/Bitbucket** (para conectar o repositório)
3. **Banco de dados MySQL** (PlanetScale, Railway, ou outro)
4. **Vercel CLI** (opcional, mas recomendado)

## 🔧 Passo a Passo Detalhado

### **Passo 1: Preparar o Banco de Dados**

#### Opção A: PlanetScale (Recomendado)

1. Acesse [planetscale.com](https://planetscale.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Crie um banco de dados MySQL
5. Copie a URL de conexão (será algo como: `mysql://user:password@host:port/database`)

#### Opção B: Railway

1. Acesse [railway.app](https://railway.app)
2. Crie uma conta
3. Crie um novo projeto
4. Adicione um serviço MySQL
5. Copie a URL de conexão

### **Passo 2: Configurar Variáveis de Ambiente**

1. **Crie um arquivo `.env.local` no seu projeto:**

```env
# Database
DATABASE_URL="mysql://user:password@host:port/database"

# Vercel Blob Storage (para upload de imagens)
BLOB_READ_WRITE_TOKEN="seu_token_aqui"

# Next.js
NEXTAUTH_SECRET="seu_secret_aqui"
NEXTAUTH_URL="https://seu-dominio.vercel.app"
```

### **Passo 3: Preparar o Repositório**

1. **Certifique-se de que todos os arquivos estão commitados:**

```bash
git add .
git commit -m "Preparando para deploy na Vercel"
git push origin main
```

### **Passo 4: Deploy na Vercel**

#### Método A: Via Dashboard Web (Mais Fácil)

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login com sua conta GitHub/GitLab/Bitbucket**
3. **Clique em "New Project"**
4. **Importe seu repositório:**

   - Selecione o repositório da sua aplicação
   - Clique em "Import"

5. **Configure o projeto:**

   - **Framework Preset:** Docker
   - **Root Directory:** `./` (deixe vazio se o projeto está na raiz)
   - **Build Command:** (deixe vazio, o Dockerfile cuidará disso)
   - **Output Directory:** (deixe vazio)

6. **Configure as variáveis de ambiente:**

   - Clique em "Environment Variables"
   - Adicione cada variável do seu `.env.local`:
     - `DATABASE_URL`
     - `BLOB_READ_WRITE_TOKEN`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL`

7. **Clique em "Deploy"**

#### Método B: Via Vercel CLI

1. **Instale o Vercel CLI:**

```bash
npm i -g vercel
```

2. **Faça login:**

```bash
vercel login
```

3. **Deploy:**

```bash
vercel --prod
```

### **Passo 5: Configurar o Banco de Dados**

Após o deploy, você precisa executar as migrações do Prisma:

1. **Acesse o dashboard da Vercel**
2. **Vá para seu projeto**
3. **Clique em "Functions"**
4. **Crie uma nova função para executar as migrações:**

Crie um arquivo `api/migrate.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Executar migrações
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS Categoria (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) UNIQUE NOT NULL,
      descricao TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS Presente (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      descricao TEXT,
      preco FLOAT,
      link VARCHAR(255),
      imagem VARCHAR(255),
      reservado BOOLEAN DEFAULT FALSE,
      reservadoPor VARCHAR(100),
      email VARCHAR(255),
      mensagem TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      categoriaId INT,
      FOREIGN KEY (categoriaId) REFERENCES Categoria(id)
    )`;

    res.status(200).json({ message: "Database migrated successfully" });
  } catch (error) {
    console.error("Migration error:", error);
    res.status(500).json({ error: "Migration failed" });
  } finally {
    await prisma.$disconnect();
  }
}
```

5. **Execute a migração acessando:** `https://seu-dominio.vercel.app/api/migrate`

### **Passo 6: Configurar Domínio Personalizado (Opcional)**

1. **No dashboard da Vercel, vá para "Settings" > "Domains"**
2. **Adicione seu domínio personalizado**
3. **Configure os registros DNS conforme instruído**

### **Passo 7: Monitoramento e Logs**

1. **Acesse "Functions" no dashboard da Vercel para ver logs**
2. **Configure alertas se necessário**
3. **Monitore o uso de recursos**

## 🔍 Troubleshooting

### **Problema: Build falha**

- Verifique se o Dockerfile está correto
- Confirme se todas as dependências estão no `package.json`
- Verifique os logs de build na Vercel

### **Problema: Erro de conexão com banco**

- Confirme se a `DATABASE_URL` está correta
- Verifique se o banco está acessível publicamente
- Teste a conexão localmente

### **Problema: Imagens não carregam**

- Configure o `BLOB_READ_WRITE_TOKEN` corretamente
- Verifique as configurações de imagem no `next.config.mjs`

## 📊 Monitoramento

- **Vercel Analytics:** Ative para monitorar performance
- **Logs:** Acesse via dashboard da Vercel
- **Métricas:** Monitore uso de recursos e tempo de resposta

## 🔄 Deploy Automático

Após configurar, cada push para a branch `main` irá automaticamente fazer um novo deploy.

## 🎉 Pronto!

Sua aplicação estará disponível em: `https://seu-projeto.vercel.app`

---

**Dicas importantes:**

- Sempre teste localmente antes do deploy
- Mantenha as variáveis de ambiente seguras
- Configure backups do banco de dados
- Monitore o uso de recursos da Vercel
