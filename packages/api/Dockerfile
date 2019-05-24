FROM node:lts-alpine
LABEL maintainer="leon.machens@gmail.com"

EXPOSE 7000

RUN npm install -g yarn
COPY package.json package.json
RUN yarn install

COPY dist dist

CMD ["node", "dist/server.js"]