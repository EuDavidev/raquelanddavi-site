# Script de Deploy Automatizado para Vercel
Write-Host "🚀 Iniciando deploy automatizado na Vercel..." -ForegroundColor Green

# Verificar se o Git está configurado
if (-not (Test-Path ".git")) {
    Write-Host "❌ Este não é um repositório Git. Inicializando..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit"
}

# Verificar se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Há mudanças não commitadas. Fazendo commit..." -ForegroundColor Yellow
    git add .
    $commitMessage = Read-Host "Digite a mensagem do commit (ou pressione Enter para usar padrão)"
    if (-not $commitMessage) {
        $commitMessage = "Deploy automático - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    }
    git commit -m $commitMessage
}

# Verificar se o Vercel CLI está instalado
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Instalando Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Verificar se está logado no Vercel
Write-Host "🔐 Verificando login no Vercel..." -ForegroundColor Yellow
try {
    vercel whoami
} catch {
    Write-Host "❌ Não está logado no Vercel. Faça login..." -ForegroundColor Red
    vercel login
}

# Perguntar se quer fazer deploy de produção
$deployProd = Read-Host "Deseja fazer deploy de produção? (y/N)"
if ($deployProd -eq "y" -or $deployProd -eq "Y") {
    Write-Host "🚀 Fazendo deploy de produção..." -ForegroundColor Green
    vercel --prod
} else {
    Write-Host "🧪 Fazendo deploy de preview..." -ForegroundColor Yellow
    vercel
}

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure as variáveis de ambiente no dashboard da Vercel" -ForegroundColor White
Write-Host "2. Execute as migrações do banco: https://seu-dominio.vercel.app/api/migrate" -ForegroundColor White
Write-Host "3. Teste a aplicação" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Dashboard da Vercel: https://vercel.com/dashboard" -ForegroundColor Cyan 
