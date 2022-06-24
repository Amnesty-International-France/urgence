import Box from '@mui/material/Box';
import { RichTextInput } from 'ra-input-rich-text';
import {
    ArrayInput,
    FormDataConsumer,
    Labeled,
    maxLength,
    minLength,
    required,
    SimpleFormIterator,
    TextInput,
} from 'react-admin';
import isEmail from 'validator/lib/isEmail';
import { Card } from './Card';
import { FrontPreview } from './FrontPreview';
import { ParagraphTemplateInput } from './ParagraphTemplateInput';
import { getScreenIndex, MESSAGE_VIEW } from './screenIndex';
import { FormData } from './UrgentActionsForm';

type MessageViewInputProps = {
    source: string;
};

type Recipient = {
    mail: string | null;
    copies_to: string | null;
    cci: string | null;
};

export const validateEmailsList = (text: string) =>
    text && !!text.split(',').find((t) => !isEmail(t))
        ? 'Must contain only emails separated by a comma.'
        : null;

const getMailToHeaderLength = (recipient: Recipient, subject: string) => {
    return `mailto:${encodeURIComponent(
        recipient && recipient.mail ? recipient.mail : '',
    )}?subject=${encodeURIComponent(subject)}`
        .concat(
            recipient && recipient.copies_to
                ? `&cc=${encodeURIComponent(recipient.copies_to)}`
                : '',
        )
        .concat(recipient && recipient.cci ? `&bcc=${encodeURIComponent(recipient.cci)}` : '')
        .length;
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
                    const hasMessageTemplate =
                        data && data.message_template && data.message_template.length > 0;
                    const mailToHeaderLength = data
                        ? getMailToHeaderLength(data.recipient, data.object_example)
                        : 0;
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

                                        <ArrayInput
                                            label="Corps du mail"
                                            source={`${source}.message_template`}
                                            sx={{
                                                '& .RaSimpleFormIterator-indexContainer': {
                                                    display: 'none',
                                                },
                                            }}
                                        >
                                            <SimpleFormIterator
                                                disableAdd={hasMessageTemplate}
                                                disableRemove
                                                disableReordering
                                            >
                                                <ParagraphTemplateInput
                                                    headerCount={mailToHeaderLength}
                                                    limit={2000}
                                                    dataMessageTemplate={
                                                        data && data.message_template
                                                    }
                                                />
                                            </SimpleFormIterator>
                                        </ArrayInput>
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
};
