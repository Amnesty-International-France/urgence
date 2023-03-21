import Box from '@mui/material/Box';
import { blue, green, grey, orange, purple, red, teal, yellow } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import {
    ArrayInput,
    BooleanInput,
    FormDataConsumer,
    required,
    SimpleFormIterator,
    TextInput,
    useRecordContext,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';

import { CallToActionInput } from './CallToActionInput';
import { CustomAddButton } from './CustomAddButton';
import { MediumInput } from './MediumInput';
import { MessageSendInput } from './MessageSendInput';
import { MessageViewInput } from './MessageViewInput';
import { RegisterInput } from './RegisterInput';
import { ShareInput } from './ShareInput';
import { StoryTemplateInput } from './StoryTemplateInput';
import { ThanksInput } from './ThanksInput';

const generateSlug = (title = '') =>
    slugify(title, {
        replacement: '-',
        remove: /[*+~.()'"!:@#,]/g,
        lower: true,
    });

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

export const UrgentActionsForm = () => {
    const { setValue } = useFormContext();
    const record = useRecordContext();
    const [emptyCode, setEmptyCode] = useState(!record?.campaign_code);

    const handleCampaignCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmptyCode(event.target.value === '');
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        const slug = generateSlug(title);
        setValue('slug', slug);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                '& h2': {
                    margin: 0,
                    paddingTop: '1rem',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    color: grey[600],
                },
                '& > div.MuiBox-root': {
                    padding: '0 1em 1em 1em',
                },
            }}
        >
            <Box>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={8}>
                        <TextInput
                            source="campaign_code"
                            label="Code Campagne"
                            fullWidth
                            onChange={handleCampaignCodeChange}
                            helperText={
                                emptyCode ? (
                                    <Box component="span" sx={{ color: orange[600] }}>
                                        Activists actions won{"'"}t be sent down to SalesForce while
                                        this field remains empty.
                                    </Box>
                                ) : (
                                    <span></span>
                                )
                            }
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <BooleanInput
                            source="is_default"
                            label="Afficher par défaut"
                            defaultValue={false}
                            helperText={false}
                        />
                    </Grid>
                </Grid>
                <TextInput
                    label="Titre"
                    source="title"
                    validate={required()}
                    fullWidth
                    onChange={handleTitleChange}
                />
                <TextInput source="slug" fullWidth disabled />
            </Box>
            <Box sx={{ backgroundColor: purple[50] }}>
                <h2>Métadonnées Réseaux sociaux</h2>
                <TextInput source="social_metadata.title" fullWidth label="Title" />
                <TextInput source="social_metadata.description" fullWidth label="Description" />
                <MediumInput source="social_metadata.medium" label="Cover" />
            </Box>
            <Box sx={{ backgroundColor: blue[50] }}>
                <h2>Story</h2>
                <ArrayInput
                    source="story"
                    label={false}
                    sx={{
                        '& .RaSimpleFormIterator-indexContainer': {
                            padding: 0,
                        },
                        '& .RaSimpleFormIterator-index': {
                            borderRadius: '50%',
                            color: '#fff',
                            backgroundColor: 'primary.main',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.25rem',
                        },
                    }}
                >
                    <SimpleFormIterator disableReordering addButton={<CustomAddButton />}>
                        <StoryTemplateInput />
                    </SimpleFormIterator>
                </ArrayInput>
            </Box>
            <Box sx={{ backgroundColor: yellow[50] }}>
                <h2>Call to action</h2>
                <CallToActionInput />
            </Box>
            <FormDataConsumer>
                {({ formData }: { formData: FormData }) => {
                    if (formData.call_to_action?.interpelation_mode === 'email') {
                        return (
                            <>
                                <Box sx={{ backgroundColor: red[50] }}>
                                    <h2>Message View</h2>
                                    <MessageViewInput source="message" />
                                </Box>
                                <Box sx={{ backgroundColor: red[50] }}>
                                    <h2>Message Send</h2>
                                    <MessageSendInput source="message" />
                                </Box>
                            </>
                        );
                    }
                }}
            </FormDataConsumer>
            <Box sx={{ backgroundColor: teal[50] }}>
                <h2>Share (only for members already registered)</h2>
                <ShareInput source="email_thank" />
            </Box>
            <Box sx={{ backgroundColor: teal[50] }}>
                <h2>Register (for new members)</h2>
                <RegisterInput source="register" />
            </Box>
            <Box sx={{ backgroundColor: green[50] }}>
                <h2>Final Thank You</h2>
                <ThanksInput source="end_thank" />
            </Box>
        </Box>
    );
};
