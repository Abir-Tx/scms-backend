# Supply Chain Management System Backend (API)

## Description

The project targets to create a REST API for a Smart **Supply Chain Management System**. The API is built using NestJS and PostgreSQL.

## Documentation

[Click Here](https://documenter.getpostman.com/view/21420955/2s9YXk3gYw) to view the full API Documentation

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Configuring the database

A `.env` file in the root has to be created with the following variables:

```bash
PG_HOST=WRITE_HERE
PG_PORT=WRITE_HERE
PG_USER=WRITE_HERE
PG_PASSWORD=WRITE_HERE
PG_DATABASE=WRITE_HERE
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### Test Using Curl

Take any API route and use curl to test it. For example:

```bash
curl -X GET localhost:3000/logistics/shipments | jq .
```

> I have used `jq` to format the output. You need to install it first.

## License

Nest is [MIT licensed](LICENSE).
