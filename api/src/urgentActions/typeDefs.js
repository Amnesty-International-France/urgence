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

    input MessageTemplateInput {
        type: String!
        value: String!
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

    enum ParagraphTemplateType {
        fixed
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

    type ParagraphTemplate {
        type: ParagraphTemplateType!
        value: String!
    }

    type UrgentAction {
        id: ID!
        title: String!
        story: [StoryStep]!
        call_to_action: String!
        message_template: [ParagraphTemplate]!
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
            call_to_action: String!
            message_template: [MessageTemplateInput]!
        ): UrgentAction
        updateUrgentAction(
            id: ID!
            title: String!
            story: [StoryStepInput]!
            call_to_action: String!
            message_template: [MessageTemplateInput]!
        ): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }

    type ListMetadata {
        count: Int!
    }
`;
