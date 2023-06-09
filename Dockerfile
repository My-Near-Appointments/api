###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.4-alpine as development

WORKDIR  /app

COPY package.json .
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
