import { LongForm } from './LongForm';
import Part1Camgaign from './Part1Campaign';
import Part2SocialNetworks from './Part2SocialNetworks';
import Part3Story from './Part3Story';
import Part4CallToAction from './Part4CallToAction';
import Part5MessageView from './Part5MessageView';
import Part6MessageSend from './Part6MessageSend';
import Part7Share from './Part7Share';
import Part8Register from './Part8Register';
import Part9Thanks from './Part9Thanks';

export type Medium = {
    title: string;
    src: string;
    crop?: {
        x: number;
        y: number;
        width: number;
        height: number;
        unit: string;
    };
};
export type StoryStep = {
    content: string;
    medium?: Medium;
    mediumDesktop?: Medium;
};

export type TwitterAction = {
    title: string;
    message: string;
    hashtags: string;
    url: string;
};

export type CallToAction = {
    title: string;
    message: string;
    button: string;
    interpelation_mode: 'email' | 'rs';
    progress: {
        display: boolean;
        message: string;
        display_threshold: number | null;
        objective: number | null;
    };
    twitter_action?: TwitterAction;
};

export type FormData = {
    id: string;
    title: string;
    slug: string;
    is_default: boolean;
    campaign_code: string;
    origin_code: string;
    story?: StoryStep[];
    call_to_action?: CallToAction;
    creation_date: string;
    last_edition_date: string;
    response_count: number;
    social_metadata?: {
        title: string;
        description: string;
        medium?: Medium;
    };
    email_thank?: {
        title: string;
        text: string;
        share: {
            twitter_message: string;
            message: string;
        };
        telegram: {
            message: string;
            url: string;
        };
    };
    end_thank?: {
        title: string;
        text: string;
    };
    message?: {
        text_view: string;
        text_send: string;
        button_view: string;
        button_send: string;
        object_example: string;
        object_indication: string;
        message_template: { value: string }[];
        recipient: {
            mail: string;
            copies_to: string;
            cci: string;
        };
    };
    register?: {
        button: string;
        phone_indication: string;
        text: string;
        title: string;
    };
};

const ActionForm = () => {
    return (
        <LongForm>
            <LongForm.Section label="The Campaign">
                <Part1Camgaign />
            </LongForm.Section>
            <LongForm.Section label="Social Networks">
                <Part2SocialNetworks />
            </LongForm.Section>
            <LongForm.Section label="Story">
                <Part3Story />
            </LongForm.Section>
            <LongForm.Section label="Call to action">
                <Part4CallToAction />
            </LongForm.Section>
            <LongForm.Section label="Message view">
                <Part5MessageView />
            </LongForm.Section>
            <LongForm.Section label="Message send">
                <Part6MessageSend />
            </LongForm.Section>
            <LongForm.Section label="Share">
                <Part7Share />
            </LongForm.Section>
            <LongForm.Section label="Register">
                <Part8Register />
            </LongForm.Section>
            <LongForm.Section label="Thanks">
                <Part9Thanks />
            </LongForm.Section>
        </LongForm>
    );
};

export default ActionForm;
