FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8090

EXPOSE 8090:8090

CMD ["node","index.js"]
