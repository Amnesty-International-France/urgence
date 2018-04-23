import gql from 'graphql-tag';

export const urgentActionsTypeDefs = gql`
    scalar JSON

    scalar DATE
    type UrgentAction {
        id: ID!
        title: String!
        story: JSON
        creation_date: DATE
        last_edition_date: DATE
    }

    extend type Query {
        UrgentAction(id: ID!): UrgentAction
        allUrgentActions(perPage: Int, page: Int, sortField: String, sortOrder: String): [UrgentAction]
        _allUrgentActionsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListMetadata
    }

    extend type Mutation {
        createUrgentAction(title: String): UrgentAction
        updateUrgentAction(id: ID!, title: String): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }

    type ListMetadata {
        count: Int!
    }
`;
