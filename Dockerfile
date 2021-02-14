FROM node:15.8.0-alpine3.13

WORKDIR /usr/src/app

RUN npm install -g serve

COPY build build

EXPOSE 8080
CMD [ "serve", "-s", "build", "-l", "8080" ]