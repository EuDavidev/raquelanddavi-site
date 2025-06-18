# Script para Configurar Banco de Dados MySQL no Railway
Write-Host "🚀 Configurando Banco de Dados MySQL no Railway..." -ForegroundColor Green

# Verificar se o Railway CLI está instalado
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Instalando Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Verificar se está logado no Railway
Write-Host "🔐 Verificando login no Railway..." -ForegroundColor Yellow
try {
    railway whoami
} catch {
    Write-Host "❌ Não está logado no Railway. Faça login..." -ForegroundColor Red
    railway login
}

# Verificar se o projeto está linkado
if (-not (Test-Path ".railway")) {
    Write-Host "🔗 Linkando projeto ao Railway..." -ForegroundColor Yellow
    railway link
}

Write-Host ""
Write-Host "📋 Próximos passos manuais:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Acesse o dashboard do Railway:" -ForegroundColor White
Write-Host "   https://railway.app/dashboard" -ForegroundColor Gray
Write-Host ""
Write-Host "2. No seu projeto, clique em 'New' > 'Database' > 'MySQL'" -ForegroundColor White
Write-Host ""
Write-Host "3. Aguarde a criação do banco e copie a Connection URL" -ForegroundColor White
Write-Host ""
Write-Host "4. Configure as variáveis de ambiente:" -ForegroundColor White
Write-Host "   railway variables set DATABASE_URL='sua_url_aqui'" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Execute as migrações do banco:" -ForegroundColor White
Write-Host "   Acesse: https://seu-dominio.railway.app/api/migrate" -ForegroundColor Gray
Write-Host ""

# Perguntar se quer abrir o dashboard
$openDashboard = Read-Host "Deseja abrir o dashboard do Railway? (y/N)"
if ($openDashboard -eq "y" -or $openDashboard -eq "Y") {
    Start-Process "https://railway.app/dashboard"
}

Write-Host ""
Write-Host "✅ Configuração inicial concluída!" -ForegroundColor Green
Write-Host "📖 Consulte o arquivo 'railway-database-guide.md' para instruções detalhadas" -ForegroundColor Cyan 
