const {ApolloClient} = require('apollo-client')
const {InMemoryCache} = require('apollo-cache-inmemory')
const {HttpLink, createHttpLink} = require('apollo-link-http')
const fetch = require('node-fetch')


const cache = new InMemoryCache()

function getHttpLink(port) {
    // return new HttpLink({
    //     uri: `http://localhost:${port}`
    // })
    return createHttpLink({ uri: `http://localhost:${port}/graphql`, fetch })
}
const link = getHttpLink(4200)

const client = new ApolloClient({
    cache,
    link
});

module.exports = {
    client
}
