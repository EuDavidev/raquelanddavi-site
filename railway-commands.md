# 🚀 Comandos Úteis do Railway

## 📦 Instalação e Configuração

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Fazer login
railway login

# Linkar projeto
railway link

# Verificar status
railway status
```

## 🗄️ Banco de Dados

```bash
# Conectar ao banco MySQL
railway connect

# Ver logs do banco
railway logs --service mysql

# Fazer backup
railway backup

# Restaurar backup
railway restore
```

## 🔧 Variáveis de Ambiente

```bash
# Listar variáveis
railway variables

# Adicionar variável
railway variables set DATABASE_URL="mysql://..."

# Remover variável
railway variables unset NOME_VARIAVEL

# Ver valor de uma variável
railway variables get DATABASE_URL
```

## 🚀 Deploy

```bash
# Fazer deploy
railway up

# Deploy de produção
railway up --prod

# Ver logs de deploy
railway logs

# Ver deployments
railway deployments
```

## 📊 Monitoramento

```bash
# Ver logs em tempo real
railway logs --follow

# Ver logs de um serviço específico
railway logs --service web

# Ver métricas
railway metrics

# Ver uso de recursos
railway usage
```

## 🔍 Troubleshooting

```bash
# Verificar status dos serviços
railway status

# Reiniciar serviço
railway restart

# Ver logs de erro
railway logs --level error

# Conectar via shell
railway shell
```

## 📁 Gerenciamento de Projeto

```bash
# Listar projetos
railway projects

# Mudar projeto
railway switch

# Ver informações do projeto
railway project

# Deletar projeto
railway delete
```

## 🔐 Segurança

```bash
# Gerar token de acesso
railway tokens

# Revogar token
railway tokens revoke TOKEN_ID

# Ver permissões
railway permissions
```

## 📋 Exemplos Práticos

### Configurar banco de dados completo:

```bash
# 1. Instalar CLI
npm install -g @railway/cli

# 2. Fazer login
railway login

# 3. Linkar projeto
railway link

# 4. Adicionar variáveis de ambiente
railway variables set DATABASE_URL="mysql://root:password@host:port/database"
railway variables set NODE_ENV="production"

# 5. Fazer deploy
railway up --prod

# 6. Ver logs
railway logs --follow
```

### Backup e Restore:

```bash
# Fazer backup
railway backup --service mysql

# Listar backups
railway backups

# Restaurar backup
railway restore BACKUP_ID
```

### Monitoramento contínuo:

```bash
# Ver logs em tempo real
railway logs --follow --service web

# Ver métricas
railway metrics --service web

# Ver uso de recursos
railway usage --service mysql
```

## 🎯 Dicas Importantes

- **Sempre use `--prod` para deploy de produção**
- **Monitore logs regularmente**
- **Configure backups automáticos**
- **Use variáveis de ambiente para senhas**
- **Teste localmente antes do deploy**

## 📞 Suporte

- **Documentação:** [docs.railway.app](https://docs.railway.app)
- **Discord:** [discord.gg/railway](https://discord.gg/railway)
- **GitHub:** [github.com/railwayapp/cli](https://github.com/railwayapp/cli)
