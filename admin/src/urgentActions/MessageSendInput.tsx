import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, maxLength, minLength, required, TextInput } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { getScreenIndex, MESSAGE_SEND } from './screenIndex';

type MessageSendInputProps = {
    source: string;
};

export const MessageSendInput = ({ source }: MessageSendInputProps) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'start',
        }}
    >
        <FormDataConsumer>
            {({ formData }) => {
                const data = formData[source];
                const hasMessageTemplate =
                    data && data.message_template && data.message_template.length > 0;

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
                            {getScreenIndex(
                                MESSAGE_SEND,
                                formData.story.length,
                                formData.call_to_action.interpelation_mode,
                            )}
                        </Box>
                        <Card>
                            <RichTextInput
                                fullWidth
                                label="Consigne écran"
                                source={`${source}.text_send`}
                                defaultValue="Complétez ce formulaire pour envoyer ce message."
                            />
                            <TextInput
                                source={`${source}.button_send`}
                                label="Bouton"
                                defaultValue="Voir l'email"
                                validate={[required(), minLength(3), maxLength(25)]}
                            />
                        </Card>
                        <Box sx={{ flex: 1 }}>
                            {hasMessageTemplate ? (
                                <FrontPreview previewDevice="mobile">
                                    TODO : Front Preview Mobile
                                </FrontPreview>
                            ) : (
                                <p>You should write a message to see this preview</p>
                            )}
                        </Box>
                    </Box>
                );
            }}
        </FormDataConsumer>
    </Box>
);
