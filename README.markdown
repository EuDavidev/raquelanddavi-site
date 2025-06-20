# 🌟 Raquel & Davi - Site do Casamento

## 📝 Descrição do Projeto

O **Site do Casamento de Raquel & Davi** é uma plataforma elegante e interativa desenvolvida para compartilhar detalhes do casamento com convidados. O site inclui:

- Informações sobre o casal
- Detalhes da cerimônia e recepção
- Lista de presentes interativa
- Confirmação de presença
- Galeria de fotos

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Descrição                                                       |
| --------------- | --------------------------------------------------------------- |
| **Next.js**     | Framework React para SSR e rotas dinâmicas                      |
| **TailwindCSS** | Framework CSS utilitário para estilização                       |
| **Shadcn/ui**   | Biblioteca de componentes UI modernos                           |
| **Prisma**      | ORM para conexão com banco de dados                             |
| **MySQL**       | Banco de dados para armazenar lista de presentes e confirmações |

## ⚙️ Funcionalidades Principais

- Página inicial com detalhes do evento
- Seção "Nossa História"
- Lista de presentes com reserva online
- Formulário de confirmação de presença
- Página de contato
- Design totalmente responsivo

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18.x ou superior)
- **pnpm** (gerenciador de pacotes)
- **MySQL** (versão 8.x ou superior, configurado localmente ou em um serviço de hospedagem)

## 🚀 Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/EuDavidev/raquelanddavi-site.git
   cd raquelanddavi-site
   ```

2. **Instale as dependências**:

   ```bash
   pnpm install
   ```

3. **Configure o banco de dados**:

   - Crie um banco de dados MySQL.
   - Configure as variáveis de ambiente no arquivo `.env` com base no arquivo `.env.example`:

     ```env
     DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
     ```

4. **Sincronize o banco de dados com Prisma**:

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento**:

   ```bash
   pnpm dev
   ```

6. Acesse a aplicação em `http://localhost:3000`.

## 📂 Estrutura do Projeto

```plaintext
raquelanddavi-site/
├── app/
│   ├── (páginas principais)
│   ├── confirmacao/
│   ├── contato/
│   ├── presentes/
│   └── sobre/
├── components/
│   └── ui/ (componentes Shadcn/ui)
├── lib/
│   └── prisma.ts
├── public/ (imagens e assets)
├── styles/ (CSS global)
└── prisma/ (schema do banco de dados)
```

## 🤝 Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção:

   ```bash
   git checkout -b minha-feature
   ```

3. Commit suas alterações:

   ```bash
   git commit -m "Adiciona minha feature"
   ```

4. Envie para o repositório remoto:

   ```bash
   git push origin minha-feature
   ```

5. Abra um Pull Request no GitHub.

## 📬 Contato

Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto:

- **Email**: davisouza128@gmail.com

---

Desenvolvido com 💙 para Raquel & Davi.
