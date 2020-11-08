const {ApolloServer} = require("apollo-server");
const {logger} = require("./log");
const {typeDefs, resolvers} = require("./schema");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (args) => ({authToken: args.req.headers.authorization}),
});

server.listen().then(({url}) => {
    logger.info("Server is ready", {url});
});
