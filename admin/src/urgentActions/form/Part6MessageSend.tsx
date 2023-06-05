import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';

import { FormDataConsumer } from 'react-admin';

import { MessageSendInput } from '../MessageSendInput';
import { MessageViewInput } from '../MessageViewInput';

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

const Part6MessageSend = () => {
    return (
        <FormDataConsumer>
            {({ formData }: { formData: FormData }) => {
                if (formData.call_to_action?.interpelation_mode === 'email') {
                    return (

                            <Box sx={{ backgroundColor: red[50] }}>
                                <h2>Message Send</h2>
                                <MessageSendInput source="message" />
                            </Box>
                    );
                }
            }}
        </FormDataConsumer>
    );
};

export default Part6MessageSend;
