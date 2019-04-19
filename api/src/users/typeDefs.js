import { gql } from 'apollo-server-express';

export default gql`
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
