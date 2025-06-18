# 🚀 Deploy com Docker - Raquel & Davi

Este guia explica como fazer o deploy da aplicação usando Docker e Docker Compose.

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Git instalado

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd raquelanddavi-site
```

### 2. Configure as variáveis de ambiente (opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=mysql://raquelanddavi_user:raquelanddavi_password@mysql:3306/raquelanddavi_db
NODE_ENV=production
```

## 🚀 Deploy Rápido

### Opção 1: Script automatizado

```bash
chmod +x deploy.sh
./deploy.sh
```

### Opção 2: Comandos manuais

```bash
# Construir e iniciar todos os serviços
docker-compose up --build -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

## 📊 Estrutura dos Serviços

### 🗄️ MySQL (Banco de Dados)

- **Porta**: 3306
- **Usuário**: raquelanddavi_user
- **Senha**: raquelanddavi_password
- **Database**: raquelanddavi_db
- **Volume**: mysql_data (persistente)

### 🌐 Next.js (Aplicação)

- **Porta**: 3000
- **URL**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

### 🔄 Nginx (Proxy Reverso - Opcional)

- **Porta**: 80 (HTTP), 443 (HTTPS)
- **Configuração**: nginx/nginx.conf

## 🛠️ Comandos Úteis

### Gerenciamento de Containers

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Reiniciar serviços
docker-compose restart

# Ver logs
docker-compose logs -f app
docker-compose logs -f mysql

# Ver status
docker-compose ps
```

### Banco de Dados

```bash
# Acessar MySQL
docker-compose exec mysql mysql -u raquelanddavi_user -p raquelanddavi_db

# Executar migrações
docker-compose exec app npx prisma db push --schema=./db/schema.prisma

# Abrir Prisma Studio
docker-compose exec app npx prisma studio --schema=./db/schema.prisma
```

### Manutenção

```bash
# Backup do banco
docker-compose exec mysql mysqldump -u raquelanddavi_user -p raquelanddavi_db > backup.sql

# Restaurar backup
docker-compose exec -T mysql mysql -u raquelanddavi_user -p raquelanddavi_db < backup.sql

# Limpar volumes (CUIDADO: apaga todos os dados)
docker-compose down -v
```

## 🔧 Configurações Avançadas

### Personalizar Variáveis de Ambiente

Edite o `docker-compose.yml`:

```yaml
environment:
  - DATABASE_URL=mysql://usuario:senha@mysql:3306/banco
  - NODE_ENV=production
  - ADMIN_PASSWORD=sua_senha_admin
```

### Configurar SSL/HTTPS

1. Coloque seus certificados em `nginx/ssl/`
2. Atualize `nginx/nginx.conf`
3. Descomente as linhas SSL no `docker-compose.yml`

### Escalar a Aplicação

```bash
# Executar múltiplas instâncias
docker-compose up --scale app=3 -d
```

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Porta já em uso

```bash
# Verificar portas em uso
netstat -tulpn | grep :3000

# Parar processo
sudo kill -9 <PID>
```

#### 2. Banco não conecta

```bash
# Verificar logs do MySQL
docker-compose logs mysql

# Verificar conectividade
docker-compose exec app npx prisma db push --schema=./db/schema.prisma
```

#### 3. Build falha

```bash
# Limpar cache
docker system prune -a

# Reconstruir sem cache
docker-compose build --no-cache
```

#### 4. Permissões de arquivo

```bash
# Corrigir permissões do script
chmod +x scripts/start.sh
chmod +x deploy.sh
```

### Logs Detalhados

```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs app
docker-compose logs mysql
docker-compose logs nginx

# Seguir logs em tempo real
docker-compose logs -f
```

## 📈 Monitoramento

### Health Check

```bash
# Verificar status da aplicação
curl http://localhost:3000/api/health

# Verificar status do banco
docker-compose exec mysql mysqladmin ping -h localhost
```

### Métricas

```bash
# Uso de recursos
docker stats

# Espaço em disco
docker system df
```

## 🔒 Segurança

### Boas Práticas

1. **Altere as senhas padrão** no `docker-compose.yml`
2. **Use variáveis de ambiente** para senhas sensíveis
3. **Configure firewall** para permitir apenas portas necessárias
4. **Mantenha imagens atualizadas** regularmente
5. **Faça backups** regulares do banco de dados

### Configurar Firewall

```bash
# Permitir apenas portas necessárias
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw enable
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs`
2. Teste o health check: `curl http://localhost:3000/api/health`
3. Verifique a conectividade do banco
4. Consulte a documentação do Docker e Next.js

---

**🎉 Parabéns! Sua aplicação está rodando com Docker!**
