import { gql } from 'apollo-server-express';

export default gql`
    type Activist {
        id: ID!
        civility: String
        firstname: String!
        lastname: String!
        email: String!
        phone: String!
        created_on: DATE
        updated_on: DATE
    }

    extend type Query {
        Activist(id: ID!): Activist
        allActivists(perPage: Int, page: Int, sortField: String, sortOrder: String): [Activist]
        _allActivistsMeta(
            page: Int
            perPage: Int
            sortField: String
            sortOrder: String
        ): ListMetadata
    }

    extend type Mutation {
        createActivist(
            civility: String
            firstname: String!
            lastname: String!
            email: String!
            phone: String!
        ): Activist
        deleteActivist(id: ID!): Activist
    }
`;
