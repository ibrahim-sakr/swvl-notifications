FROM node:12.0-alpine

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

ENTRYPOINT ["npm", "run", "dev"]
