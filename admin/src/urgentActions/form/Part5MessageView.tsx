import { RichTextInput } from 'ra-input-rich-text';
import { Labeled, maxLength, minLength, required, TextInput } from 'react-admin';
import isEmail from 'validator/lib/isEmail';

type MessageViewInputProps = {
    source: string;
};

export const validateEmailsList = (text: string) =>
    text && !!text.split(',').find((t) => !isEmail(t))
        ? 'Must contain only emails separated by a comma.'
        : null;

export const Part5MessageView = ({ source }: MessageViewInputProps) => {
    return (
        <>
            <Labeled label="Object">
                <>
                    <RichTextInput
                        fullWidth
                        label="Introduction étape 1 (objet)"
                        source={`${source}.object_indication`}
                        defaultValue="Nous vous en proposons un mais vous pouvez le personnaliser"
                    />
                    <TextInput fullWidth source={`${source}.object_example`} label="Exemple" />
                </>
            </Labeled>
            <Labeled label="Message">
                <>
                    <RichTextInput
                        fullWidth
                        label="Introduction étape 2 (message)"
                        source={`${source}.text_view`}
                        defaultValue="Voici un modèle de message que nous vous proposons d'envoyer. Vous pourrez bien sûr le personnaliser depuis votre boite mail."
                    />
                    <TextInput
                        source={`${source}.message_template[0].value`}
                        label="Corps du mail"
                        validate={[required()]}
                        multiline
                        fullWidth
                    />
                </>
            </Labeled>

            <Labeled label="Destinataires">
                <>
                    <TextInput
                        fullWidth
                        label="Mail To"
                        source={`${source}.recipient.mail`}
                        validate={[required(), validateEmailsList]}
                    />
                    <TextInput
                        fullWidth
                        label="Copies To"
                        source={`${source}.recipient.copies_to`}
                        validate={validateEmailsList}
                    />
                    <TextInput
                        fullWidth
                        label="CCI"
                        source={`${source}.recipient.cci`}
                        validate={validateEmailsList}
                    />
                </>
            </Labeled>
            <TextInput
                source={`${source}.button_view`}
                label="Bouton"
                defaultValue="Suivant"
                validate={[required(), minLength(3), maxLength(25)]}
            />
        </>
    );
};

export default Part5MessageView;
