
FROM node:14


WORKDIR /usr/src/app/src


COPY package*.json ./


RUN npm install


COPY . .

EXPOSE 3000

CMD ["ts-node", "src/main.ts"]

