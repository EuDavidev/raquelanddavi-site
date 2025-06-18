# 🚀 Guia Completo: Banco de Dados MySQL no Railway

## 📋 Pré-requisitos

- ✅ Conta no GitHub (para login no Railway)
- ✅ Projeto Next.js configurado
- ✅ Acesso à internet

## 🔧 Passo a Passo Detalhado

### **Passo 1: Criar Conta no Railway**

1. **Acesse [railway.app](https://railway.app)**
2. **Clique em "Login"**
3. **Escolha "Continue with GitHub"**
4. **Autorize o Railway a acessar sua conta GitHub**
5. **Complete o cadastro se necessário**

### **Passo 2: Criar Novo Projeto**

1. **No dashboard do Railway, clique em "New Project"**
2. **Escolha "Deploy from GitHub repo"**
3. **Selecione seu repositório da aplicação**
4. **Clique em "Deploy Now"**

### **Passo 3: Adicionar Banco de Dados MySQL**

1. **No seu projeto, clique em "New"**
2. **Escolha "Database"**
3. **Selecione "MySQL"**
4. **Clique em "Add MySQL"**

### **Passo 4: Configurar o Banco de Dados**

1. **Aguarde a criação do banco (pode levar alguns minutos)**
2. **Clique no serviço MySQL criado**
3. **Vá para a aba "Connect"**
4. **Copie a "Connection URL"**

A URL será algo como:

```
mysql://root:password@containers-us-west-XX.railway.app:XXXX/railway
```

### **Passo 5: Configurar Variáveis de Ambiente**

1. **No seu projeto Railway, vá para "Variables"**
2. **Clique em "New Variable"**
3. **Adicione as seguintes variáveis:**

```env
DATABASE_URL="mysql://root:password@containers-us-west-XX.railway.app:XXXX/railway"
NODE_ENV="production"
```

### **Passo 6: Configurar o Schema do Banco**

1. **No serviço MySQL, clique em "Query"**
2. **Execute os seguintes comandos SQL:**

```sql
-- Criar tabela Categoria
CREATE TABLE IF NOT EXISTS Categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) UNIQUE NOT NULL,
  descricao TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar tabela Presente
CREATE TABLE IF NOT EXISTS Presente (
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
);

-- Inserir categorias padrão
INSERT IGNORE INTO Categoria (nome, descricao) VALUES
('Casa', 'Presentes para casa'),
('Tecnologia', 'Produtos tecnológicos'),
('Moda', 'Roupas e acessórios'),
('Experiências', 'Experiências e passeios');
```

### **Passo 7: Testar a Conexão**

1. **No Railway, vá para "Deployments"**
2. **Clique no deployment mais recente**
3. **Verifique se não há erros de conexão com o banco**

### **Passo 8: Configurar Backup (Opcional)**

1. **No serviço MySQL, vá para "Settings"**
2. **Ative "Automatic Backups"**
3. **Configure a frequência (diário recomendado)**

## 🔍 Troubleshooting

### **Problema: Erro de conexão**

- Verifique se a `DATABASE_URL` está correta
- Confirme se o banco está ativo no Railway
- Teste a conexão usando o cliente MySQL

### **Problema: Tabelas não criadas**

- Execute manualmente os comandos SQL
- Verifique se há erros de sintaxe
- Confirme se o usuário tem permissões

### **Problema: Deploy falha**

- Verifique os logs de build
- Confirme se as variáveis de ambiente estão corretas
- Teste localmente primeiro

## 📊 Monitoramento

### **No Railway Dashboard:**

- **Usage:** Monitorar uso de recursos
- **Logs:** Ver logs em tempo real
- **Metrics:** Métricas de performance
- **Alerts:** Configurar alertas

### **Comandos Úteis:**

```bash
# Conectar via CLI (se tiver Railway CLI)
railway login
railway link
railway up

# Ver logs
railway logs

# Abrir shell do banco
railway connect
```

## 🔐 Segurança

### **Boas Práticas:**

- ✅ Use variáveis de ambiente para senhas
- ✅ Ative backups automáticos
- ✅ Configure timeouts de conexão
- ✅ Use SSL para conexões
- ✅ Monitore acesso ao banco

### **Configurações de Segurança:**

1. **No Railway, vá para "Settings"**
2. **Configure "Access Control"**
3. **Ative "SSL Required"**
4. **Configure "Connection Limits"**

## 💰 Custos

### **Plano Gratuito:**

- 500 horas/mês
- 1GB de armazenamento
- 1GB de RAM
- Sem backup automático

### **Plano Pro ($5/mês):**

- 1000 horas/mês
- 10GB de armazenamento
- 2GB de RAM
- Backup automático

## 🎯 Próximos Passos

1. **Teste a aplicação** com o banco conectado
2. **Configure backups** automáticos
3. **Monitore performance** do banco
4. **Configure alertas** para problemas
5. **Documente** as configurações

## 📞 Suporte

- **Documentação:** [docs.railway.app](https://docs.railway.app)
- **Discord:** [discord.gg/railway](https://discord.gg/railway)
- **Email:** support@railway.app

---

**🎉 Pronto!** Seu banco de dados MySQL está configurado no Railway e pronto para uso com sua aplicação Next.js!
