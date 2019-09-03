import { gql } from 'apollo-server-express';

export default gql`
    type Setting {
        id: ID!
        created_on: DATE
        updated_on: DATE
        type: String!
        content: String!
    }

    extend type Query {
        Setting(id: ID!): Setting
        allSettings(perPage: Int, page: Int, sortField: String, sortOrder: String): [Setting]
        _allSettingsMeta(
            page: Int
            perPage: Int
            sortField: String
            sortOrder: String
        ): ListMetadata
    }

    extend type Mutation {
        createSetting(type: String!, content: String!): Setting
        deleteSetting(id: ID!): Setting
    }
`;
