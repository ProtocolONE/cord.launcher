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
| REDIS_HOST                | redis                                             | Redis host                                                                                          |
| REDIS_PORT                | 6379                                              | Redis port                                                                                          |
| OAUTH2_PORT               | 3000                                              | HTTP auth1 host to listed API requests.                                                             |
| AUTH1_CLIENT_ID           |                                                   | Client id, registered in auth1                                                                      |
| AUTH1_CLIENT_SECRET       |                                                   | Client secret, registered in auth1                                                                  |
| SESSION_NAME              |                                                   | Auth1 session name                                                                                  |
| SESSION_KEY               |                                                   | Auth1 session key                                                                                   |
