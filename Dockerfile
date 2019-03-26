FROM node:10.10-alpine AS node

RUN apk update && apk add --no-cache --update ca-certificates

ENV PORT=8080 

WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn

COPY . /app/

RUN yarn build:ssr

EXPOSE 8080

CMD ["node", "./dist/ssr-mat/server"]
