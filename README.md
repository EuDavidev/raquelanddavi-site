Raquel and Davi Site
Descrição do Projeto
O Raquel and Davi Site é um projeto web moderno e dinâmico desenvolvido para proporcionar uma experiência interativa e visualmente atraente. Este projeto foi construído com o objetivo de criar uma plataforma web funcional, utilizando tecnologias de ponta para garantir desempenho, escalabilidade e facilidade de manutenção. O site foi inicialmente projetado com o auxílio do agente de IA v0 da Vercel e desenvolvido na IDE Cursor, oferecendo uma abordagem inovadora para o desenvolvimento front-end e back-end.
Este repositório contém o código-fonte de um site que combina uma interface de usuário elegante com uma integração robusta de banco de dados, ideal para projetos pessoais, portfólios ou aplicações comerciais.
Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes tecnologias:

React: Biblioteca JavaScript para construção de interfaces de usuário componentizadas.
Next.js: Framework React para renderização do lado do servidor (SSR), geração de sites estáticos (SSG) e otimização de performance.
TailwindCSS: Framework CSS utilitário para estilização rápida e responsiva.
Shadcn/ui: Biblioteca de componentes de UI acessíveis e personalizáveis para React.
Vercel Blob: Solução de armazenamento para gerenciamento das imagens para fazer upload no banco de dados.
Railway: Plataforma de hospedagem para deploy simplificado da aplicação.
Prisma: ORM (Object-Relational Mapping) para interação com o banco de dados.
MySQL: Banco de dados relacional para armazenamento de dados da aplicação.

Funcionalidades

Interface de usuário responsiva e moderna, otimizada para dispositivos móveis e desktop.
Integração com banco de dados MySQL via Prisma para gerenciamento eficiente de dados.
Hospedagem simplificada e escalável com Railway.
Armazenamento de arquivos utilizando Vercel Blob.
Componentes reutilizáveis e estilizados com Shadcn/ui e TailwindCSS.
Suporte a rotas dinâmicas e renderização otimizada com Next.js.

Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

Node.js (versão 18.x ou superior)
npm ou yarn (gerenciadores de pacotes)
MySQL (configurado localmente ou em um serviço de hospedagem)
Conta no Railway para deploy (opcional)
Conta no Vercel para uso do Blob (opcional)

Instalação
Siga os passos abaixo para configurar o projeto localmente:

Clone o repositório:
git clone https://github.com/EuDavidev/raquelanddavi-site.git
cd raquelanddavi-site


Instale as dependências:
npm install
# ou
yarn install


Configure o banco de dados:

Crie um banco de dados MySQL.

Configure as variáveis de ambiente no arquivo .env com base no arquivo .env.example:
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
VERCEL_BLOB_TOKEN="seu-token-vercel-blob"




Sincronize o banco de dados com Prisma:
npx prisma migrate dev


Inicie o servidor de desenvolvimento:
npm run dev
# ou
yarn dev


Acesse a aplicação em http://localhost:3000.


Deploy
Deploy com Railway

Crie uma conta no Railway.
Configure um novo projeto e conecte-o ao repositório do GitHub.
Adicione as variáveis de ambiente no painel do Railway (como DATABASE_URL e VERCEL_BLOB_TOKEN).
Inicie o deploy e acompanhe o status no painel do Railway.

Armazenamento com Vercel Blob

Configure o armazenamento de arquivos utilizando o Vercel Blob.
Adicione o token de acesso ao Vercel Blob no arquivo .env.

Estrutura do Projeto
raquelanddavi-site/
├── app/                   # Páginas e rotas do Next.js
├── components/            # Componentes React reutilizáveis
├── lib/                   # Configurações e utilitários (ex.: Prisma)
├── public/                # Arquivos estáticos (imagens, fontes, etc.)
├── styles/                # Estilos globais e configurações do TailwindCSS
├── prisma/                # Esquema e migrações do Prisma
├── .env                   # Variáveis de ambiente
├── next.config.js         # Configurações do Next.js
├── tailwind.config.js     # Configurações do TailwindCSS
└── README.md              # Documentação do projeto

Como Contribuir

Faça um fork do repositório.

Crie uma branch para sua feature ou correção:
git checkout -b minha-feature


Commit suas alterações:
git commit -m "Adiciona minha feature"


Envie para o repositório remoto:
git push origin minha-feature


Abra um Pull Request no GitHub.


Licença
Este projeto está licenciado sob a MIT License.
Contato
Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto:

GitHub: EuDavidev
Email: eudavidev@example.com


Desenvolvido com 💙 por EuDavidev.
