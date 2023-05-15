import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import {
    FormDataConsumer,
    Labeled,
    maxLength,
    minLength,
    required,
    TextInput,
} from 'react-admin';
import isEmail from 'validator/lib/isEmail';
import { Card } from './Card';
import { MailtoCheck } from './MailtoCheck';
import { ParagraphTemplateInput } from './ParagraphTemplateInput';
import { getScreenIndex, MESSAGE_VIEW } from './screenIndex';
import { FormData } from './UrgentActionsForm';

type MessageViewInputProps = {
    source: string;
};

export const validateEmailsList = (text: string) =>
    text && !!text.split(',').find((t) => !isEmail(t))
        ? 'Must contain only emails separated by a comma.'
        : null;

const getMailtoLink = (data: any) => {
    if (!data) {
        return `mailto:?subject=&body=`;
    }
    return `mailto:${encodeURIComponent(
        data.recipient && data.recipient.mail ? data.recipient.mail : '',
    )}?subject=${encodeURIComponent(data.object_example)}`
        .concat(data.message_template && data.message_template[0] && data.message_template[0].value ? `&body=${encodeURIComponent(data.message_template[0].value)}` : '')
        .concat(
            data.recipient && data.recipient.copies_to
                ? `&cc=${encodeURIComponent(data.recipient.copies_to)}`
                : '',
        )
        .concat(data.recipient && data.recipient.cci ? `&bcc=${encodeURIComponent(data.recipient.cci)}` : '');
};

export const MessageViewInput = ({ source }: MessageViewInputProps) => {
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
                    //@ts-ignore
                    const data = formData[source];
                    const mailto = getMailtoLink(data);
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
                                {getScreenIndex(MESSAGE_VIEW, storySteps, interpelationMode)}
                            </Box>
                            <Card>
                                <Labeled label="Object">
                                    <>
                                        <RichTextInput
                                            fullWidth
                                            label="Introduction étape 1 (objet)"
                                            source={`${source}.object_indication`}
                                            defaultValue="Nous vous en proposons un mais vous pouvez le personnaliser"
                                        />
                                        <TextInput
                                            fullWidth
                                            source={`${source}.object_example`}
                                            label="Exemple"
                                        />
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

                                        <ParagraphTemplateInput
                                            source={`${source}.message_template[0]`}
                                            mailtoLength={mailto.length}
                                        />
                                    </>
                                </Labeled>
                                <Labeled label="Tester l'ouverture du lien mailto">
                                    <>
                                        <MailtoCheck
                                            mailto={mailto}
                                        />
                                    </>
                                </Labeled>
                                <Labeled label="Destinataires">
                                    <>
                                        <TextInput
                                            fullWidth
                                            label="Mail To"
                                            source={`${source}.recipient.mail`}
                                            validate={validateEmailsList}
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
                            </Card>
                        </Box>
                    );
                }}
            </FormDataConsumer>
        </Box>
    );
};
