import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { maxLength, minLength, required, TextInput } from 'react-admin';
import { Card } from './Card';

type MessageSendInputProps = {
    source: string;
};

export const Part6MessageSend = ({ source }: MessageSendInputProps) => (
    <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
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

export default Part6MessageSend;
