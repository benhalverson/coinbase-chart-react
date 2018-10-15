FROM node:latest

RUN mkdir /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm i --silent

RUN npm install node-sass

EXPOSE 3000
CMD ["npm", "start"]
