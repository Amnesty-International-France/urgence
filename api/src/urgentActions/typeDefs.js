import gql from 'graphql-tag';

export const urgentActionsTypeDefs = gql`
    scalar DATE

    input MediumInput {
        title: String!
        src: String!
    }

    input DisplayOptionsInput {
        position: Position!
        backgroundColor: Color!
    }

    input StoryStepInput {
        content: String!
        medium: MediumInput
        displayOptions: DisplayOptionsInput!
    }

    type Medium {
        title: String!
        src: String!
    }

    enum Position {
        top
        bottom
    }

    enum Color {
        "000000"
        FFFF00
        FFFFFF
        d2026d
        df3725
        ed8122
    }

    type DisplayOptions {
        position: Position!
        backgroundColor: Color!
    }

    type StoryStep {
        content: String!
        medium: Medium
        displayOptions: DisplayOptions!
    }

    type UrgentAction {
        id: ID!
        title: String!
        story: [StoryStep]
        creation_date: DATE!
        last_edition_date: DATE!
    }

    extend type Query {
        UrgentAction(id: ID!): UrgentAction
        allUrgentActions(perPage: Int, page: Int, sortField: String, sortOrder: String): [UrgentAction]
        _allUrgentActionsMeta(page: Int, perPage: Int, sortField: String, sortOrder: String): ListMetadata
    }

    extend type Mutation {
        createUrgentAction(
            title: String!
            story: [StoryStepInput]
            creation_date: DATE!
            last_edition_date: DATE!
        ): UrgentAction
        updateUrgentAction(
            id: ID!
            title: String!
            story: [StoryStepInput]
            creation_date: DATE!
            last_edition_date: DATE!
        ): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }

    type ListMetadata {
        count: Int!
    }
`;
