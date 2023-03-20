import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, Labeled, required, TextInput } from 'react-admin';

import { Card } from './Card';
import { getScreenIndex, SHARE } from './screenIndex';
import { FormData } from './UrgentActionsForm';

const defaultTitle = 'Merci pour votre action ! Et maintenant ?';
const defaultText = `Un message, c'est bien. Des dizaines, c'est encore mieux.<br/><b>Et si 5 de vos amis faisaient comme vous ?</b>`;
const defaultTweet = `@cible, respectez les droits humains !`;
const defaultMessage = `J'ai agi avec Amnesty France !`;

type ShareInputProps = {
    source: string;
};

export const ShareInput = ({ source }: ShareInputProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
            }}
        >
            <FormDataConsumer>
                {({ formData }: { formData: FormData }) => {
                    const storySteps = formData.story ? formData.story.length : 0;
                    const interpelationMode = formData.call_to_action?.interpelation_mode;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '1em',
                                    marginRight: '8px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    backgroundColor: 'primary.main',
                                    fontSize: '1.25rem',
                                }}
                            >
                                {getScreenIndex(SHARE, storySteps, interpelationMode) + 'A'}
                            </Box>
                            <Card>
                                <TextInput
                                    source={`${source}.title`}
                                    fullWidth
                                    label="Title"
                                    defaultValue={defaultTitle}
                                    validate={[required()]}
                                />
                                <RichTextInput
                                    source={`${source}.text`}
                                    label="Contenu"
                                    defaultValue={defaultText}
                                    validate={[required()]}
                                />
                                <TextInput
                                    source={`${source}.share.twitter_message`}
                                    fullWidth
                                    label="Message du post twitter"
                                    defaultValue={defaultTweet}
                                    multiline
                                    validate={[required()]}
                                />
                                <TextInput
                                    source={`${source}.share.message`}
                                    fullWidth
                                    label="Message de partage WhatsApp"
                                    defaultValue={defaultMessage}
                                    multiline
                                    validate={[required()]}
                                />
                                <Labeled label="Activer communauté Telegram">
                                    <>
                                        <TextInput
                                            source={`${source}.telegram.url`}
                                            label="Lien canal Telegram"
                                            fullWidth
                                        />
                                        <RichTextInput
                                            source={`${source}.telegram.message`}
                                            label="Message"
                                        />
                                    </>
                                </Labeled>
                            </Card>
                        </Box>
                    );
                }}
            </FormDataConsumer>
        </Box>
    );
};
