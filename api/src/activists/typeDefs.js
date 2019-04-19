import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    scalar DATE

    type Activist {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        created_on: DATE
        updated_on: DATE
    }

    type ListMetadata {
        count: Int!
    }

    extend type Query {
        Activist(id: ID!): Activist
        allActivists(perPage: Int, page: Int, sortField: String, sortOrder: String): [Activist]
        _allActivists(page: Int, perPage: Int, sortField: String, sortOrder: String): ListMetadata
    }

    extend type Mutation {
        create(firstname: String!, lastname: String!, email: String!): Activist
    }
`;
