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
import { ParticipationInput } from './ParticipationInput';
import { FormData } from './index';

export const Part4CallToAction = () => {
    return (
        <FormDataConsumer>
            {({ formData }: { formData: FormData }) => {
                return (
                    <>
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
                        {formData.call_to_action?.interpelation_mode === 'email' && (
                            <TextInput
                                source="call_to_action.button"
                                label="Bouton"
                                defaultValue="Voir l'email"
                                validate={[required(), minLength(3), maxLength(25)]}
                            />
                        )}
                        <ParticipationInput source={'call_to_action.progress'} />
                        {formData.call_to_action?.interpelation_mode === 'rs' && (
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
                    </>
                );
            }}
        </FormDataConsumer>
    );
};

export default Part4CallToAction;
