import { gql } from 'apollo-server-express';

export default gql`
    scalar Uploadable

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
        transparent
    }

    enum ParagraphTemplateType {
        fixed
    }

    type Link {
        label: String
        url: String
    }

    type StoryStep {
        content: String!
        medium: Medium
        displayOptions: DisplayOptions
    }

    input StoryStepInput {
        content: String!
        medium: MediumInput
        displayOptions: DisplayOptionsInput
    }

    type Medium {
        title: String!
        src: Uploadable!
    }

    input MediumInput {
        title: String!
        src: Uploadable!
    }

    type DisplayOptions {
        mediumPosition: Position!
        backgroundColor: Color!
        color: Color
    }

    input DisplayOptionsInput {
        mediumPosition: Position!
        backgroundColor: Color!
        color: Color
    }

    type CallToAction {
        title: String
        message: String
        button: String
    }

    input CallToActionInput {
        title: String
        message: String
        button: String
    }

    type ParagraphTemplate {
        value: String!
    }

    type Recipient {
        mail: String!
        copies_to: String
        cci: String
        postal_address: String
        button: String
    }

    input RecipientInput {
        mail: String!
        copies_to: String
        cci: String
        postal_address: String
        button: String
    }

    type Share {
        message: String
        active_twitter: Boolean
        twitter_message: String
        twitter_title: String
    }

    input ShareInput {
        active: Boolean
        message: String
        active_twitter: Boolean
        twitter_message: String
        twitter_title: String
    }

    type Register {
        text: String
        button: String
    }

    input RegisterInput {
        text: String
        button: String
    }

    type Thanks {
        title: String
        text: String
        button: String
        share: Share
    }

    input ThankInput {
        title: String
        text: String
        button: String
        share: ShareInput
    }

    input MessageTemplateInput {
        value: String!
    }

    type UrgentAction {
        id: ID!
        title: String!
        slug: String
        campaign_code: String
        story: [StoryStep]
        call_to_action: CallToAction
        object_indication: String
        message_template: [ParagraphTemplate]
        creation_date: DATE
        last_edition_date: DATE
        recipient: Recipient
        email_thank: Thanks
        end_thank: Thanks
        register: Register
    }

    extend type Query {
        UrgentAction(id: ID!): UrgentAction
        UrgentActionBySlug(slug: String!): UrgentAction
        allUrgentActions(
            page: Int
            perPage: Int
            sortField: String
            sortOrder: String
        ): [UrgentAction]
        _allUrgentActionsMeta(
            page: Int
            perPage: Int
            sortField: String
            sortOrder: String
        ): ListMetadata
    }

    extend type Mutation {
        createUrgentAction(
            title: String!
            slug: String
            campaign_code: String
            story: [StoryStepInput]
            call_to_action: CallToActionInput
            object_indication: String
            message_template: [MessageTemplateInput]
            recipient: RecipientInput
            email_thank: ThankInput
            end_thank: ThankInput
            register: RegisterInput
        ): UrgentAction
        updateUrgentAction(
            id: ID!
            title: String!
            slug: String
            campaign_code: String
            story: [StoryStepInput]
            call_to_action: CallToActionInput
            object_indication: String
            message_template: [MessageTemplateInput]
            recipient: RecipientInput
            email_thank: ThankInput
            end_thank: ThankInput
            register: RegisterInput
        ): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
    }
`;
