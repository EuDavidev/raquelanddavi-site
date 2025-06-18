# Dockerfile otimizado para Vercel
FROM node:18-alpine AS base

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat curl

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate --schema=./db/schema.prisma

# Build da aplicação
RUN pnpm run build

# Imagem de produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=base --chown=nextjs:nodejs /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar arquivos do Prisma
COPY --from=base --chown=nextjs:nodejs /app/db ./db
COPY --from=base --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=base --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando para iniciar a aplicação
CMD ["node", "server.js"] 
