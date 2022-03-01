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

    type MediumSocial {
        title: String
        src: Uploadable
    }

    input MediumSocialInput {
        title: String
        src: Uploadable
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

    type Progress {
        display: Boolean
        objective: Int
        display_threshold: Int
        message: String
    }

    input ProgressInput {
        display: Boolean
        objective: Int
        display_threshold: Int
        message: String
    }

    type CallToAction {
        title: String
        message: String
        button: String
        progress: Progress
    }

    input CallToActionInput {
        title: String
        message: String
        button: String
        progress: ProgressInput
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

    type MessageTemplate {
        value: String!
    }

    input MessageTemplateInput {
        value: String!
    }

    type SocialMetadata {
        title: String
        medium: MediumSocial
        description: String
    }

    input SocialMetadataInput {
        title: String
        description: String
        medium: MediumSocialInput
    }

    type Message {
        text_view: String
        text_send: String
        button_view: String
        button_send: String
        object_indication: String
        object_example: String
        message_template: [MessageTemplate]
        recipient: Recipient
    }

    input MessageInput {
        text_view: String!
        text_send: String!
        button_view: String!
        button_send: String!
        object_indication: String
        object_example: String
        message_template: [MessageTemplateInput]
        recipient: RecipientInput
    }

    type Share {
        message: String
        twitter_message: String
    }

    input ShareInput {
        active: Boolean
        message: String
        twitter_message: String
    }

    type Register {
        title: String
        text: String
        phone_indication: String
        button: String
    }

    input RegisterInput {
        title: String!
        text: String!
        phone_indication: String
        button: String!
    }

    type Telegram {
        url: String,
        message: String
    }

    input TelegramInput {
        url: String,  
        message: String
    }

    type EmailThanks {
        title: String
        text: String
        button: String
        share: Share
        telegram: Telegram
    }

    input EmailThankInput {
        title: String
        text: String
        button: String
        share: ShareInput
        telegram: TelegramInput
    }

    type EndThanks {
        title: String
        text: String
    }

    input EndThankInput {
        title: String
        text: String
    }

    type UrgentAction {
        id: ID!
        title: String!
        slug: String
        is_default: Boolean
        campaign_code: String
        origin_code: String
        story: [StoryStep]
        call_to_action: CallToAction
        message: Message
        creation_date: DATE
        last_edition_date: DATE
        email_thank: EmailThanks
        end_thank: EndThanks
        register: Register
        social_metadata: SocialMetadata
        response_count: Int
    }

    input CampaignMemberInput {
        firstname: String!
        lastname: String!
        email: String!
        phone: String
        civility: String
    }

    type CampaignMember {
        firstname: String!
        lastname: String!
        email: String!
        registered: Boolean
    }

    extend type Query {
        UrgentAction(id: ID!): UrgentAction
        UrgentActionBySlug(slug: String!): UrgentAction
        DefaultUrgentAction: UrgentAction
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
            origin_code: String
            story: [StoryStepInput]
            call_to_action: CallToActionInput
            message: MessageInput
            email_thank: EmailThankInput
            end_thank: EndThankInput
            register: RegisterInput
            social_metadata: SocialMetadataInput
            response_count: Int
        ): UrgentAction
        updateUrgentAction(
            id: ID!
            title: String!
            slug: String
            campaign_code: String
            origin_code: String
            is_default: Boolean
            story: [StoryStepInput]
            call_to_action: CallToActionInput
            message: MessageInput
            email_thank: EmailThankInput
            end_thank: EndThankInput
            register: RegisterInput
            social_metadata: SocialMetadataInput
            response_count: Int
        ): UrgentAction
        deleteUrgentAction(id: ID!): UrgentAction
        addCampaignMember(id: ID!, member: CampaignMemberInput!): CampaignMember!
        registerContact(member: CampaignMemberInput!): CampaignMember!
        addResponseCount(id: ID!): UrgentAction!
    }
`;
