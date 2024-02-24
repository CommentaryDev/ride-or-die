FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npx prisma generate

RUN npm install

RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]