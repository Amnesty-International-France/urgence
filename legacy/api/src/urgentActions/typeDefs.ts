import { gql } from 'apollo-server-express';

// TODO : remove template_messageIds from MessageInput when a new version of ra-data-graphql-simple will be released
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
        mediumDesktop: MediumDesktop
        displayOptions: DisplayOptions
    }

    input StoryStepInput {
        content: String!
        medium: MediumInput
        mediumDesktop: MediumDesktopInput
        displayOptions: DisplayOptionsInput
    }

    type MediumDesktop {
        title: String!
        src: Uploadable!
        crop: CropDesktop
    }

    input MediumDesktopInput {
        title: String!
        src: Uploadable!
        crop: CropDesktopInput
    }

    type Medium {
        title: String!
        src: Uploadable!
        crop: Crop
    }

    input MediumInput {
        title: String!
        src: Uploadable!
        crop: CropInput
    }

    type CropDesktop {
        unit: String
        x: Float
        y: Float
        width: Float
        height: Float
    }

    input CropDesktopInput {
        unit: String
        x: Float
        y: Float
        width: Float
        height: Float
    }
    type Crop {
        unit: String
        x: Float
        y: Float
        width: Float
        height: Float
    }

    input CropInput {
        unit: String
        x: Float
        y: Float
        width: Float
        height: Float
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

    type TwitterAction {
        title: String
        message: String
        hashtags: String
        url: String
    }

    input TwitterActionInput {
        title: String
        message: String
        hashtags: String
        url: String
    }

    type CallToAction {
        title: String
        message: String
        button: String
        progress: Progress
        interpelation_mode: String
        twitter_action: TwitterAction
    }

    input CallToActionInput {
        title: String
        message: String
        button: String
        progress: ProgressInput
        interpelation_mode: String
        twitter_action: TwitterActionInput
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
        message_templateIds: [ID]
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
        url: String
        message: String
    }

    input TelegramInput {
        url: String
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

    type CampaignMemberTwitter {
        firstname: String!
        lastname: String!
        email: String!
        phone: String
        civility: String
    }

    input CampaignMemberTwitterInput {
        firstname: String!
        lastname: String!
        email: String!
        phone: String
        civility: String
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
        addCampaignMemberTwitter(
            id: ID!
            member: CampaignMemberTwitterInput!
        ): CampaignMemberTwitter!
        registerContact(id: ID, member: CampaignMemberInput!): CampaignMember!
        addResponseCount(id: ID!): UrgentAction!
    }
`;
