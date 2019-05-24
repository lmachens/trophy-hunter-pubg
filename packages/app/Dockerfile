FROM node:lts-alpine
LABEL maintainer="leon.machens@gmail.com"

EXPOSE 3000

RUN npm install -g yarn
COPY next.config.js next.config.js
COPY package.json package.json
COPY dist dist
COPY static static

RUN yarn install

CMD ["yarn", "start"]