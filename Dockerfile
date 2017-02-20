FROM node:alpine

RUN apk update && apk add nano && mkdir /app

WORKDIR /app

EXPOSE 8884

CMD ["npm", "start"]

COPY . /app

RUN npm install
