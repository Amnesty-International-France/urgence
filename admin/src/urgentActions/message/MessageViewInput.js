import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    minLength,
    maxLength,
    required,
    FormDataConsumer,
    email,
    TextInput,
    ArrayInput,
    Labeled,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import isEmail from 'validator/lib/isEmail';

import { root, preview, messageFormScreenPreview } from '../styles';
import { get as getScreenIndex, MESSAGE_VIEW } from '../screenIndex';
import ParagraphTemplateInput from './ParagraphTemplateInput';
import RichTextInput from '../../form/RichTextInput';
import FrontPreview from '../FrontPreview';

import MessageView from '../../../../front/src/urgentActions/messageView/MessageView';
import Link from '../../../../front/src/themes/Link';
import SimpleParagraphFormIterator from '../SimpleParagraphFormIterator';

const styles = theme => ({
    ...root,
    bordered: {
        borderBottom: `solid 1px ${theme.palette.divider}`,
    },
    preview: {
        ...preview,
        ...messageFormScreenPreview,
    },
});

export const validateRecipientEmail = [required(), email()];

export const validateEmailsList = text =>
    text && !!text.split(',').find(t => !isEmail(t))
        ? 'Must contain only emails separated by a comma.'
        : null;

const getMailToHeaderLength = (recipient, subject, body) => {
    return `mailto:${encodeURIComponent(
        recipient ? recipient.mail : '',
    )}?subject=${encodeURIComponent(subject)}`
        .concat(
            recipient && recipient.copies_to
                ? `&cc=${encodeURIComponent(recipient.copies_to)}`
                : '',
        )
        .concat(recipient && recipient.cci ? `&bcc=${encodeURIComponent(recipient.cci)}` : '')
        .length;
};

export const MessageSendInput = ({ classes, source }) => {
    return (
        <div className={classNames(classes.root, classes.bordered)}>
            <FormDataConsumer>
                {({ formData }) => {
                    const data = formData[source];
                    const displayPreview =
                        data && data.message_template && data.message_template.length > 0;

                    const mailToHeaderLength = data
                        ? getMailToHeaderLength(data.recipient, data.object_example)
                        : 0;

                    return (
                        <Fragment>
                            <Avatar className={classes.avatar}>
                                {getScreenIndex(MESSAGE_VIEW, formData)}
                            </Avatar>
                            <Card className={classes.card}>
                                <CardContent className={classes.content}>
                                    <div className={classes.formContainer}>
                                        <Labeled label="Object">
                                            <Fragment>
                                                <RichTextInput
                                                    fullWidth
                                                    multiline
                                                    label="Introduction étape 1 (objet)"
                                                    source={`${source}.object_indication`}
                                                    defaultValue="Nous vous en proposons un mais vous pouvez le personnaliser"
                                                />
                                                <TextInput
                                                    fullWidth
                                                    source={`${source}.object_example`}
                                                    label="Exemple"
                                                />
                                            </Fragment>
                                        </Labeled>
                                        <Labeled label="Message">
                                            <Fragment>
                                                <RichTextInput
                                                    fullWidth
                                                    multiline
                                                    label="Introduction étape 2 (message)"
                                                    source={`${source}.text_view`}
                                                    defaultValue="Voici un modèle de message que nous vous proposons d'envoyer. Vous pourrez bien sûr le personnaliser depuis votre boite mail."
                                                />

                                                <ArrayInput
                                                    label="Corps du mail"
                                                    source={`${source}.message_template`}
                                                >
                                                    <SimpleParagraphFormIterator
                                                        disableAdd={
                                                            data &&
                                                            data.message_template &&
                                                            data.message_template.length > 0
                                                        }
                                                        disableRemove
                                                    >
                                                        <ParagraphTemplateInput
                                                            source=""
                                                            headerCount={mailToHeaderLength}
                                                            limit={2000}
                                                            dataMessageTemplate={
                                                                data && data.message_template
                                                            }
                                                        />
                                                    </SimpleParagraphFormIterator>
                                                </ArrayInput>
                                            </Fragment>
                                        </Labeled>
                                        <Labeled label="Destinataires">
                                            <Fragment>
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
                                            </Fragment>
                                        </Labeled>
                                        <TextInput
                                            source={`${source}.button_view`}
                                            label="Bouton"
                                            defaultValue="Suivant"
                                            validate={[required(), minLength(3), maxLength(25)]}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            {displayPreview ? (
                                <FrontPreview className={classes.preview}>
                                    <MessageView
                                        text={data.text_view || ''}
                                        messageTemplate={data.message_template}
                                        objectIndication={data.object_indication || ''}
                                        objectExample={data.object_example || ''}
                                        action={<Link to="#" label="Suivant" />}
                                        setEmail={() => {}}
                                        setObject={() => {}}
                                        setCivility={() => {}}
                                        setFirstname={() => {}}
                                        setLastname={() => {}}
                                    />
                                </FrontPreview>
                            ) : (
                                <p>You should write a message to see this preview</p>
                            )}
                        </Fragment>
                    );
                }}
            </FormDataConsumer>
        </div>
    );
};

MessageSendInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(MessageSendInput));
