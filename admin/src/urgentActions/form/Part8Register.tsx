import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { required, TextInput } from 'react-admin';
import { Card } from './Card';

const defaultTitle = `Merci ! On compte sur vous pour nos prochaines actions !`;
const defaultText = `Vous aimeriez aider d'autres personnes ? Inscrivez-vous pour recevoir nos prochaines Actions Urgentes. <br/> On vous en envoie 1 à 2 par mois.`;
const defaultPhoneIndication = `Inscrivez votre numéro de mobile pour recevoir les alertes SMS`;
const defaultButton = `Je m'inscris`;

type RegisterInputProps = {
    source: string;
};

export const Part8Register = ({ source }: RegisterInputProps) => {
    return (
        <>
            <p style={{ fontStyle: 'italic' }}>(for new members)</p>

            <Box sx={{ display: 'flex', alignItems: 'start', width: '100%' }}>
                <Card>
                    <RichTextInput
                        source={`${source}.title`}
                        label="Title"
                        defaultValue={defaultTitle}
                        validate={[required()]}
                    />
                    <RichTextInput
                        source={`${source}.text`}
                        label="Text"
                        defaultValue={defaultText}
                        validate={[required()]}
                    />
                    <RichTextInput
                        source={`${source}.phone_indication`}
                        label="Consignes inscription"
                        defaultValue={defaultPhoneIndication}
                    />
                    <TextInput
                        source={`${source}.button`}
                        label="Bouton"
                        defaultValue={defaultButton}
                        validate={[required()]}
                    />
                </Card>
            </Box>
        </>
    );
};

export default Part8Register;
