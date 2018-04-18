const gql = require('graphql-tag');

module.exports = gql`
    type UrgentAction {
        id: ID!
        title: String!
    }

    type Query {
        UrgentAction(id: ID!): UrgentAction
        allUrgentActions(perPage: Int, page: Int): [UrgentAction]
        _allUrgentActionsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListMetadata
    }

    type Mutation {
        createUrgentAction(title: String): UrgentAction
        updateUrgentAction(id: ID!, title: String): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }

    type ListMetadata {
        count: Int!
    }
`;
