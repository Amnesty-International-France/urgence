import gql from 'graphql-tag';

export const urgentActionsTypeDefs = gql`
    scalar DATE
    scalar Upload

    input MediumInput {
        title: String!
        src: Upload!
    }

    input DisplayOptionsInput {
        mediumPosition: Position!
        backgroundColor: Color!
    }

    input StoryStepInput {
        content: String!
        medium: MediumInput
        displayOptions: DisplayOptionsInput!
    }

    type Medium {
        title: String!
        src: Upload!
    }

    enum Position {
        top
        bottom
    }

    enum Color {
        black
        white
        yellow
        red
        orange
        pink
    }

    type DisplayOptions {
        mediumPosition: Position!
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
        story: [StoryStep]!
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
            story: [StoryStepInput]!
            creation_date: DATE!
            last_edition_date: DATE!
        ): UrgentAction
        updateUrgentAction(
            id: ID!
            title: String!
            story: [StoryStepInput]!
            creation_date: DATE!
            last_edition_date: DATE!
        ): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }

    type ListMetadata {
        count: Int!
    }
`;
