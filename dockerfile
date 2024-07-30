FROM node:20

WORKDIR /web-api

COPY . .

RUN npm i

CMD npm run start:dev