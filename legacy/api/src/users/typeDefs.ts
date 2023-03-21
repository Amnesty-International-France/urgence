import { gql } from 'apollo-server-express';

export default gql`
    enum Role {
        admin
    }

    type Token {
        token: String!
    }

    input TokenInput {
        token: String!
    }

    extend type Query {
        login(username: String!, password: String!): Token @rateLimit(limit: 30, duration: 900)
        loginByToken(token: TokenInput!): Boolean
    }
`;
