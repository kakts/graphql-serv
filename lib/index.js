const express = require('express')
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();

app.use("/graphql",
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true // debug用GUIを有効にするか
    })
);

const port = process.env.PORT || 4200;
app.listen(port);

console.log(`🚀 Server ready at http://localhost:${port}/graphql`);