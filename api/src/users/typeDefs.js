import gql from 'graphql-tag';

export const userTypeDefs = gql`
    enum Role {
        admin
    }

    type Token {
        token: String!
    }

    extend type Query {
        login(username: String!, password: String!): Token
    }
`;
