FROM node:14-alpine

WORKDIR /app

COPY ./*.json ./
COPY ./src ./src
COPY ./public ./public

RUN npm install

CMD ["npm", "run", "start:watch"]