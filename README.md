# Server

Este projeto é responsável por armazenar e gerenciar informações de produtos e histórico de preços. Ele é dividido em três partes distintas:

1. **API Scraper**: Simula um "scraper" da página de pesquisa do Google Shopping, buscando informações sobre preços e lojas de produtos.
2. **Backend - Server**: Responsável por armazenar e gerenciar as informações de produtos e histórico de preços.
3. **Frontend - Client**: Interface para visualização e gestão dos dados.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instale as dependências do projeto](#instale-as-dependências-do-projeto)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas Disponíveis](#rotas-disponíveis)
- [Scripts Disponíveis](#scripts-disponíveis)

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Instale as dependências do projeto

1. Clone o repositório:
 ```sh
   git clone https://github.com/mehiel-victor/server
   cd server
 ```
2. Instale as dependências do projeto:
```sh
npm install
```

## Configuração
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:
```sh
DATABASE_URL=postgresql://your_user:your_password@postgres:5432/chatlabsdb
CRON_INTERVAL=1
```

## Executando o projeto
1. Inicie os contêineres Docker:
```sh
docker-compose up --build
```
2. A API estará disponível em http://localhost:3000/products

## Estrutura do Projeto
```sh
/server
  ├── prisma
  │   ├── migrations
  │   │   └── 20240516172214_init
  │   │       ├── migration.sql
  │   │       └── migration_lock.toml
  │   ├── schema.prisma
  │   └── seed.ts
  ├── src
  │   ├── graphql
  │   │   ├── models
  │   │   │   ├── price.ts
  │   │   │   ├── product.ts
  │   │   │   └── productInfo.ts
  │   │   ├── resolvers
  │   │   │   ├── priceResolver.ts
  │   │   │   ├── productInfoResolver.ts
  │   │   │   └── productResolver.ts
  │   │   ├── utils
  │   │   │   └── schema.gql
  │   ├── prisma
  │   │   └── prisma.service.ts
  │   ├── scrapper
  │   │   ├── scraper.service.ts
  │   │   ├── app.controller.ts
  │   │   ├── app.module.ts
  │   │   ├── app.service.ts
  │   │   └── main.ts
  ├── .dockerignore
  ├── .env
  ├── .gitignore
  ├── Dockerfile
  ├── docker-compose.yml
  ├── package.json
  ├── package-lock.json
  └── README.md
```

## Rotas Disponíveis
- `GET /products`: Retorna uma lista de produtos do banco de dados, incluindo nome e imagem.
- `GET /products/`:id: Retorna os dados de um produto específico, incluindo nome, imagens, variação de preços e dados das lojas que vendem.

## Scripts Disponíveis
- `npm run start`: Inicia a aplicação em modo de produção.
- `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm run prisma:generate`: Gera o cliente Prisma.
- `npm run prisma:migrate:dev`: Executa as migrações do banco de dados em ambiente de desenvolvimento.
- `npm run prisma:migrate:deploy`: Executa as migrações do banco de dados em ambiente de produção.