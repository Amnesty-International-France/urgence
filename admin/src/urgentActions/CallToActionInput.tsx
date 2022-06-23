import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import {
    FormDataConsumer,
    Labeled,
    maxLength,
    minLength,
    RadioButtonGroupInput,
    required,
    TextInput,
} from 'react-admin';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { ParticipationInput } from './ParticipationInput';
import { CALL_TO_ACTION, getScreenIndex } from './screenIndex';

export const CallToActionInput = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'start' }}>
            <FormDataConsumer>
                {({ formData }) => {
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
                                    CALL_TO_ACTION,
                                    formData.story.length,
                                    formData.call_to_action.interpelation_mode,
                                )}
                            </Box>
                            <Card>
                                <RadioButtonGroupInput
                                    source="call_to_action.interpelation_mode"
                                    label="Mode d'interpelation"
                                    defaultValue="email"
                                    choices={[
                                        { id: 'email', name: 'Email' },
                                        { id: 'rs', name: 'Réseaux sociaux' },
                                    ]}
                                />

                                <TextInput
                                    source="call_to_action.title"
                                    label="Title"
                                    defaultValue="On passe à l'action !"
                                    validate={required()}
                                    multiline
                                    fullWidth
                                />

                                <RichTextInput
                                    source="call_to_action.message"
                                    label="Message"
                                    defaultValue="Envoyez dès maintenant un e-mail pour interpeller le Responsable du pouvoir judiciaire."
                                    validate={required()}
                                />
                                {formData.call_to_action.interpelation_mode === 'email' && (
                                    <TextInput
                                        source="call_to_action.button"
                                        label="Bouton"
                                        defaultValue="Voir l'email"
                                        validate={[required(), minLength(3), maxLength(25)]}
                                    />
                                )}
                                <ParticipationInput source={'call_to_action.progress'} />
                                {formData.call_to_action.interpelation_mode === 'rs' && (
                                    <Labeled label="Twitter Sharing">
                                        <>
                                            <TextInput
                                                source="call_to_action.twitter_action.title"
                                                label="Title"
                                                defaultValue="Action Urgente"
                                            />
                                            <TextInput
                                                source="call_to_action.twitter_action.message"
                                                label="Message"
                                                defaultValue="@cible - respectez les droits humains !"
                                                helperText="@cible est le nom de l'organisation"
                                            />
                                            <TextInput
                                                source="call_to_action.twitter_action.hashtags"
                                                label="Hashtags"
                                                defaultValue="actionurgente,amnesty"
                                                helperText="Séparer les hashtags par des virgules"
                                            />
                                            <TextInput
                                                source="call_to_action.twitter_action.url"
                                                label="Url"
                                                defaultValue="https://www.amnesty.fr/action-urgente"
                                                helperText="Url de l'action"
                                            />
                                        </>
                                    </Labeled>
                                )}
                            </Card>
                            <Box sx={{ flex: 1 }}>
                                <FrontPreview previewDevice="mobile">
                                    TODO : Front Preview Mobile
                                </FrontPreview>
                            </Box>
                        </Box>
                    );
                }}
            </FormDataConsumer>
        </Box>
    );
};
