# syntax=docker/dockerfile:1

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn install --production

COPY . .

CMD ["yarn", "start"]