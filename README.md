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

| Variable                  | Default                                           | Description                                                                                         |
|---------------------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| HOST                      | http://localhost                                  | HTTP host to listed API requests.                                                                   |
| PORT                      | 8080                                              | HTTP host to listed API requests.                                                                   |
| REDIS_HOST                | redis                                             | Redis host                                                                                          |
| REDIS_PORT                | 6379                                              | Redis port                                                                                          |
| OAUTH2_PORT               | 3000                                              | HTTP auth1 host to listed API requests.                                                             |
| NAMESPACE                 | auth1                                             | Auth1 namespace                                                                                     |
| ISSUER                    | https://auth1.tst.protocol.one                    | auth1 issuer name                                                                                   |
| CLIENT_ID                 |                                                   | Client id, registered in auth1                                                                      |
| CLIENT_SECRET             |                                                   | Client secret, registered in auth1                                                                  |
| POSTMESSAGE_TEMPLATE      | oauth2-server/templates/postmessage.html.template | Path to post message template file for post message communicating between cord host and auth1 host  |
| POSTMESSAGE_TARGET_ORIGIN | '*'                                               | CORS origin                                                                                         |
| REDIRECT_URL              | http://localhost:3000/callback                    | auth1 redirect url                                                                                  |
| SCOPES                    | ['openid', 'offline']                             | auth1 scopes                                                                                        |
| CORS_ROUTES               | ['/refresh', '/logout']                           | Allowed routes for auth1                                                                            |
| CORS_VALID_ORIGIN         | ['*']                                             | CORS origin                                                                                         |
| SESSION_NAME              |                                                   | Auth1 session name                                                                                  |
| SESSION_KEY               |                                                   | Auth1 session key                                                                                   |
| SESSION_AGE               | 21600                                             | Auth1 session age (default is 6 hours)                                                              |
