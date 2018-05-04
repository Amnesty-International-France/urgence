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
        color: Color
    }

    input StoryStepInput {
        content: String!
        medium: MediumInput
        displayOptions: DisplayOptionsInput!
    }

    input MessageTemplateInput {
        value: String!
    }

    input RecipientInput {
        mail: String!
        copies_to: String
        cci: String
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
        color: Color
    }

    type StoryStep {
        content: String!
        medium: Medium
        displayOptions: DisplayOptions!
    }

    type ParagraphTemplate {
        value: String!
    }

    type Recipient {
        mail: String!
        copies_to: String
        cci: String
    }

    type UrgentAction {
        id: ID!
        title: String!
        story: [StoryStep]!
        call_to_action: String!
        object_indication: String!
        message_template: [ParagraphTemplate]!
        creation_date: DATE!
        last_edition_date: DATE!
        recipient: Recipient
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
            object_indication: String!
            message_template: [MessageTemplateInput]!
            recipient: RecipientInput!
        ): UrgentAction
        updateUrgentAction(
            id: ID!
            title: String!
            story: [StoryStepInput]!
            call_to_action: String!
            object_indication: String!
            message_template: [MessageTemplateInput]!
            recipient: RecipientInput!
        ): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }

    type ListMetadata {
        count: Int!
    }
`;
