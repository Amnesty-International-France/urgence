import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { Labeled, required, TextInput } from 'react-admin';

import { Card } from './Card';

const defaultTitle = 'Merci pour votre action ! Et maintenant ?';
const defaultText = `Un message, c'est bien. Des dizaines, c'est encore mieux.<br/><b>Et si 5 de vos amis faisaient comme vous ?</b>`;
const defaultTweet = `@cible, respectez les droits humains !`;
const defaultMessage = `J'ai agi avec Amnesty France !`;

type ShareInputProps = {
    source: string;
};

export const Part7Share = ({ source }: ShareInputProps) => {
    return (
        <>
            <p style={{ fontStyle: 'italic' }}>(only for members already registered)</p>
            <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
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
                            <RichTextInput source={`${source}.telegram.message`} label="Message" />
                        </>
                    </Labeled>
                </Card>
            </Box>
        </>
    );
};

export default Part7Share;
