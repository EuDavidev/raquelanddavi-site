# Script de Deploy para Windows PowerShell
Write-Host "🚀 Iniciando deploy da aplicação Raquel & Davi..." -ForegroundColor Green

# Verificar se o Docker está instalado
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker não está instalado. Por favor, instale o Docker Desktop primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se o Docker Compose está instalado
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro." -ForegroundColor Red
    exit 1
}

# Parar containers existentes
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down

# Perguntar se quer remover imagens antigas
$removeImages = Read-Host "Deseja remover imagens antigas? (y/N)"
if ($removeImages -eq "y" -or $removeImages -eq "Y") {
    Write-Host "🗑️ Removendo imagens antigas..." -ForegroundColor Yellow
    docker-compose down --rmi all
}

# Construir e iniciar os containers
Write-Host "🔨 Construindo e iniciando containers..." -ForegroundColor Yellow
docker-compose up --build -d

# Aguardar os serviços estarem prontos
Write-Host "⏳ Aguardando serviços estarem prontos..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Verificar status dos containers
Write-Host "📊 Status dos containers:" -ForegroundColor Cyan
docker-compose ps

# Verificar health check
Write-Host "🏥 Verificando health check..." -ForegroundColor Yellow
for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Aplicação está funcionando!" -ForegroundColor Green
            break
        }
    }
    catch {
        Write-Host "⏳ Aguardando aplicação inicializar... (tentativa $i/10)" -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
}

Write-Host ""
Write-Host "🎉 Deploy concluído!" -ForegroundColor Green
Write-Host "📱 Aplicação disponível em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔍 Health check: http://localhost:3000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Comandos úteis:" -ForegroundColor White
Write-Host "  - Ver logs: docker-compose logs -f" -ForegroundColor Gray
Write-Host "  - Parar: docker-compose down" -ForegroundColor Gray
Write-Host "  - Reiniciar: docker-compose restart" -ForegroundColor Gray
Write-Host "  - Acessar banco: docker-compose exec mysql mysql -u raquelanddavi_user -p raquelanddavi_db" -ForegroundColor Gray

# Verificar versão do Docker
docker --version

# Verificar versão do Docker Compose
docker-compose --version

# Testar com uma imagem simples
docker run hello-world

# Verificar se o Docker está rodando
docker info

# Instalar WSL 2
wsl --install

# Definir WSL 2 como padrão
wsl --set-default-version 2

# Reiniciar o computador 
