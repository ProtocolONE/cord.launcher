# Cord Introduction
-> WIP

## Installation
Start dev-server:
```bash
docker-compose up -d && yarn dev
```

Build:
```bash
yarn build
```

## Configuration
To start the application, you can use the following configuration parameters in the environment variables:
Need [auth1](https://github.com/ProtocolONE/auth1.protocol.one) client registration.

| Variable                        | Default                                           | Description                                                                                                                 |
|---------------------------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| NODE_ENV                        | production                                        | current environment                                                                                                         |
| PUBLIC_HOST                     | http://localhost                                  | Public host url, when environment is "development" - used for local's host                                                  |
| PUBLIC_PORT                     | 80                                                | nginx port, when environment is "development" - used for local's port                                                       |
| QILINSTORE_API_URL              | https://qilinstoreapi.tst.protocol.one/api/v1     | api url for cord                                                                                                            |
| AUTH1_NAMESPACE                 | auth1                                             | prefix for auth1 namespase                                                                                                  |
| AUTH1_PORT                      | 3000                                              | port for auth1 namespase                                                                                                    |
| AUTH1_ISSUER                    | https://auth1.tst.protocol.one                    | url of Auth1 host                                                                                                           |
| AUTH1_POSTMESSAGE_TEMPLATE      | oauth2-server/templates/postmessage.html.template | path to html.template for work with result of authentication process where you will receive a postMessage from iframe       |
| AUTH1_POSTMESSAGE_TARGET_ORIGIN | *                                                 | target origin for postMessages with results of authorization                                                                |
| AUTH1_CORS_VALID_ORIGIN         | *                                                 | list of valid origins for CORS protection, separated by comma. Notice! Value of * uses by default (disable CORS protection) |
| AUTH1_CORS_ROUTES               | /refresh,/logout                                  | required client routes for OAuth2 authentication through Auth1 service                                                      |
| AUTH1_SCOPES                    | openid,offline                                    | required client scope for OAuth2 authentication through Auth1 service                                                       |
| AUTH1_REDIRECT_URL              | http://localhost:3000/callback                    | url, where it sends after authorization through auth1                                                                       |
| AUTH1_CLIENT_ID                 |                                                   | client id for OAuth2 authentication through Auth1 service                                                                   |
| AUTH1_CLIENT_SECRET             |                                                   | client secret for OAuth2 authentication through Auth1 service                                                               |
| REDIS_HOST                      |                                                   | redis host                                                                                                                  |
| REDIS_PORT                      |                                                   | redis port                                                                                                                  |
| SESSION_NAME                    |                                                   | cookie name session                                                                                                         |
| SESSION_KEY                     |                                                   | signing key for cookie session                                                                                              |
| SESSION_AGE                     | 21600                                             | session lifetime in seconds                                                                                                 |
