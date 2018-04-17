const gql = require('graphql-tag');

module.exports = gql`
    type UrgentAction {
        id: ID!
        title: String!
    }

    type Query {
        UrgentAction(id: ID!): UrgentAction
        UrgentActions(limit: Int, page: Int): [UrgentAction]
    }
`;
