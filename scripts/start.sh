#!/bin/bash

echo "🚀 Iniciando aplicação Raquel & Davi..."

# Aguardar o banco de dados estar pronto
echo "⏳ Aguardando banco de dados..."
until npx prisma db push --schema=./db/schema.prisma --accept-data-loss; do
  echo "Banco de dados ainda não está pronto. Aguardando..."
  sleep 5
done

echo "✅ Banco de dados configurado!"

# Gerar Prisma Client
echo "🔧 Gerando Prisma Client..."
npx prisma generate --schema=./db/schema.prisma

echo "🎉 Aplicação pronta para iniciar!"

# Iniciar a aplicação
exec node server.js 
