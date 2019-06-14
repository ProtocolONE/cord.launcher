FROM node:10.16-alpine AS node

RUN apk update && \
    apk add ca-certificates --no-cache --update

WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn install

COPY . /app/

RUN yarn build

EXPOSE 3000
CMD ["node", "oauth2-server"]
