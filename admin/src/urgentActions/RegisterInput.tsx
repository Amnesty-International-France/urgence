import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import { FormDataConsumer, required, TextInput } from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { getScreenIndex, REGISTER } from './screenIndex';
import { FormData } from './UrgentActionsForm';

const defaultTitle = `Merci ! On compte sur vous pour nos prochaines actions !`;
const defaultText = `Vous aimeriez aider d'autres personnes ? Inscrivez-vous pour recevoir nos prochaines Actions Urgentes. <br/> On vous en envoie 1 à 2 par mois.`;
const defaultPhoneIndication = `Inscrivez votre numéro de mobile pour recevoir les alertes SMS`;
const defaultButton = `Je m'inscris`;

type RegisterInputProps = {
    source: string;
};

export const RegisterInput = ({ source }: RegisterInputProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
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
                                {getScreenIndex(REGISTER, storySteps, interpelationMode) + 'B'}
                            </Box>
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
                            <FrontPreview previewDevice="mobile">
                                TODO : Front Preview Mobile
                            </FrontPreview>
                        </Box>
                    );
                }}
            </FormDataConsumer>
        </Box>
    );
};
