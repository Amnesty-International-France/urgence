const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const config = require('../../../config');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = graphqlHTTP({
    schema,
    graphiql: config.env !== 'production',
});
