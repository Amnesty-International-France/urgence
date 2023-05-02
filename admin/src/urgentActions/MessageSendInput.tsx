import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, maxLength, minLength, required, TextInput } from 'react-admin';
import { Card } from './Card';
import { getScreenIndex, MESSAGE_SEND } from './screenIndex';
import { FormData } from './UrgentActionsForm';

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
            {({ formData }: { formData: FormData }) => {
                //@ts-ignore
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
                            {getScreenIndex(MESSAGE_SEND, storySteps, interpelationMode)}
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
                    </Box>
                );
            }}
        </FormDataConsumer>
    </Box>
);
