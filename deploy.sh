#!/bin/bash

echo "🚀 Iniciando deploy da aplicação Raquel & Davi..."

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
read -p "Deseja remover imagens antigas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Removendo imagens antigas..."
    docker-compose down --rmi all
fi

# Construir e iniciar os containers
echo "🔨 Construindo e iniciando containers..."
docker-compose up --build -d

# Aguardar os serviços estarem prontos
echo "⏳ Aguardando serviços estarem prontos..."
sleep 30

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

# Verificar health check
echo "🏥 Verificando health check..."
for i in {1..10}; do
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo "✅ Aplicação está funcionando!"
        break
    else
        echo "⏳ Aguardando aplicação inicializar... (tentativa $i/10)"
        sleep 10
    fi
done

echo ""
echo "🎉 Deploy concluído!"
echo "📱 Aplicação disponível em: http://localhost:3000"
echo "🔍 Health check: http://localhost:3000/api/health"
echo ""
echo "📋 Comandos úteis:"
echo "  - Ver logs: docker-compose logs -f"
echo "  - Parar: docker-compose down"
echo "  - Reiniciar: docker-compose restart"
echo "  - Acessar banco: docker-compose exec mysql mysql -u raquelanddavi_user -p raquelanddavi_db" 
