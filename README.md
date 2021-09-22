# Baqust Rest

Create a service that collect data from cryptocompare.com using its API and stores it in a database
(MySQL/PostgreSQL/Mongo)

A few things to note in the project:

-   **[Github Actions Workflows](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/tree/master/.github/workflows)** -
    Pre-configured Github Actions to run automated builds, testing and deployment
-   **[GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20is%20a%20legacy%20Git,software%20development%20and%20DevOps%20practices.)** -
    GitFlow standard is used as a work flow.

-   **[Express](https://socket.io/)** - Express is used as the rest sever.

-   **[SocketIO](https://socket.io/)** - SocketIO is used as the websocket sever.

-   **[Apollo Sever](https://www.apollographql.com/docs/apollo-server/)** - Apollo Sever is used as a graphql sever.

-   **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
-   **[Winston Logger](#logging)** - Uses winston as the logger for the application.

-   **Mocha** - Using Mocha for running test cases

## I. Installation

#### 1. Clone this repo

```
$ git clone git@github.com:sidhantpanda/docker-express-typescript-boilerplate.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

## III. Development

Github actions automated deployment to heroku

### Start dev server

```
$ npm run dev
```

Running the above commands results in

-   🌏**API Server** running at `http://localhost:3000`
-   🌏**SOCKET.IO Server** running at `http://localhost:3000`
-   🌏**GRAPH QL Server** running at `http://localhost:3000/graphql`

### API

## REST

```
http://localhost:3000/api/price?fsyms=BTC,LINK,MKR&tsyms=USD,EUR,ETH,LTC
```

Will return all pair prices

## GRAPHQL

```
http://localhost:3000/graphql
```

Will open a graphql playground

### Example query

```
query ExampleQuery($getPricePairsInput: GetPricePairs!) {
  getPricePairs(input: $getPricePairsInput)
}

```

Query variables

```
{
  "getPricePairsInput": {
    "fsyms": "BTC,LINK",
    "tsyms": "USD"
  }
}
```

## SOCKET IO

### Connection

Using the the **[socket io client library](https://socket.io/docs/v3/client-api/)** connect using the below url format
fsyms and tsyms can be change to much client needs

```
http://localhost:3000?fsyms=BTC,LINK,MKR&tsyms=USD,EUR,ETH,LTC
```

Add and event listeners for `data`

## IV. Packaging and Deployment

The mongo container is only only available in dev environment. When you build and deploy the docker image, be sure to
provide the correct **[environment variables](#environment)**.

#### 1. Build and run without Docker

```
$ npm run build && npm run start
```

---

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name     | Type   | Default       | Description                            |
| ------------ | ------ | ------------- | -------------------------------------- |
| NODE_ENV     | string | `development` | API runtime environment. eg: `staging` |
| PORT         | number | `3000`        | Port to run the API server on          |
| MONGO_DB_URI | string | ``            | URL for MongoDB                        |

## Logging

The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at
`src/logger.ts`.

-   All logs are saved in `./logs` directory and at `/logs` in the docker container.
-   The `docker-compose` file has a volume attached to container to expose host directory to the container for writing
    logs.
-   Console messages are prettified
-   Each line in error log file is a stringified JSON.

### Directory Structure

```
+-- .github
|   +-- workflows
|   |   +-- develop.yml
|   |   +-- main.yml
+-- src
|   +-- @types
|   |   +-- deceleration.ts
|   |   +-- schema.ts
|   +-- datastores
|   |   +-- mongo-db.ts
|   +-- grahpql
|   |   +-- index.ts
|   |   +-- resolvers.ts
|   |   +-- types.ts
|   +-- models
|   |   +-- router.price-pairs.ts
|   +-- routes
|   |   +-- router.ts
|   +-- server
|   |   +-- apollo.server.ts
|   |   +-- create.apollo.context.ts
|   |   +-- create.express.app.ts
|   +-- services
|   |   +-- init.env.ts
|   |   +-- get-prices.ts
|   +-- sockets
|   |   +-- io.server.ts
|   |   +-- sockets.handlers.ts
|   +-- app.ts
+-- .env
+-- .prettirrc
+-- .gitignore
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- commitlint.config.js
+-- nodemon.json
+-- yarn.lock
+-- package.json
+-- README.md
+-- tsconfig.json
```

## III. Contribution

## Git Workflow

Contribution to this project must follow the
**[GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20is%20a%20legacy%20Git,software%20development%20and%20DevOps%20practices.)**
workflow

## Commits

Commits messages must follow **[Conventional Commits Spec](https://www.conventionalcommits.org/en/v1.0.0/)**

Use npm run commit to commit messages

```
$ npm run commit
```
