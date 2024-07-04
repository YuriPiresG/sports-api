FROM node:20

WORKDIR /yuri/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 8080
CMD [ "node", "dist/main" ]