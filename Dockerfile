# Use a imagem base oficial do Node
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Executa as migrações do Prisma
RUN npx prisma generate

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
  