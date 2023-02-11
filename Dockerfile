###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.4-alpine as development

WORKDIR  /app

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]
