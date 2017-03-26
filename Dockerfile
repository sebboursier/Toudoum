FROM node:alpine

RUN apk update && apk add nano && mkdir /app

WORKDIR /app

CMD ["npm", "start"]

COPY . /app

EXPOSE 8884

RUN npm install
