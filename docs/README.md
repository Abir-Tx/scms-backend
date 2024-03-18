# Supply Chain Management System Backend (API)

Smart supply chain management system for Bangladesh specifically. The project includes:

- API Backend in NESTJS
- Frontend in NEXTJS
- Database using **Postgres**

> I am leaving the project & so from now on the project is open for contributions. If you want to contribute, please open an issue first and then create a pull request. I will review the pull request and merge it if it is good.

## Description

The project targets to create a REST API for a Smart **Supply Chain Management System**. The API is built using NestJS and PostgreSQL.

## Notes

- The authentication has been disabled willingly for the purpose of making it work with the frontend as the frontend is kinda incomplete. So the API is not secure at the moment. It is recommended to enable authentication before deploying it to production. Can be enabled in this file `logistics/logistics.controller.ts` by adding `@UseGuards(SessionGuard)` to the routes.

- In order to run the API, you need to have a PostgreSQL database running. The database configuration can be found in the `.env` file. If the file does not exist, create one and add the told variables in the **Configuring the database** section below. The database has to be created manually. The tables will be created automatically by the API.

- The project is not fully complete so there might be some bugs. If you find any, please open an issue or contribute as I am leaving this project for now.

## Documentation

[Click Here](https://documenter.getpostman.com/view/21420955/2s9YXk3gYw) to view the full API Documentation

## Frontend

The frontend is built using NextJS. The frontend is not included in this repository. It is a separate repository.

You can visit the frontend repository [here](https://github.com/Abir-Tx/scms-web)

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
