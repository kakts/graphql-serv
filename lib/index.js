const express = require('express')
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();

// express server instance.
let server

function exit() {
    process.exit(0)
}

function getHealthCheckRouter() {
    const router = express.Router()
    router.get('/', (req, res, next) => {
        res.json({status: 'ok'})
    })
    return router
}


function startServer() {
    app.use("/graphql",
        graphqlHTTP({
            schema,
            rootValue: resolvers,
            graphiql: true // debug用GUIを有効にするか
        })
    );

    // ヘルスチェック関連api
    app.use("/hz", getHealthCheckRouter())

    const port = process.env.PORT || 4200;
    server = app.listen(port);

    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
}

function closeServer() {
    if (server) {
        console.info("closing server")
        server.close()
    }
}

process.on("SIGTERM", () => {
    console.log("----SIGTERM----");
    server && server.close()
    exit(0)
})

process.on("SIGINT", () => {
    console.log("----SIGINT----");
    console.log("closing server.")
    server && server.close()
})

process.on("SIGHUP", () => {
    console.log("----SIGHUP----");
    server && server.close()
})

module.exports = {
    startServer,
    closeServer
}