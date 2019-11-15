import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
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

import MessageView from '../../../../front/src/urgentActions/message-view/MessageView';
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

export const MessageInput = ({ classes, source }) => (
    <div className={classNames(classes.root, classes.bordered)}>
        <FormDataConsumer>
            {({ formData }) => {
                const data = formData[source];

                return (
                    <Fragment>
                        <Avatar className={classes.avatar}>
                            {getScreenIndex(MESSAGE_VIEW, formData)}
                        </Avatar>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className={classes.formContainer}>
                                    <RichTextInput
                                        fullWidth
                                        multiline
                                        label="Message Tip"
                                        source={`${source}.text`}
                                        defaultValue="Parce que les messages uniques ont plus d'impact nous vous invitons à personnaliser l'objet de l'email."
                                    />
                                    <RichTextInput
                                        fullWidth
                                        multiline
                                        label="Object Tip"
                                        source={`${source}.object_indication`}
                                        defaultValue="Indiquez par exemple que vous souhaitez parler de cette situation inacceptable."
                                    />
                                    <Labeled label="Recipient">
                                        <Fragment>
                                            <TextInput
                                                fullWidth
                                                type="email"
                                                label="Mail To"
                                                source={`${source}.recipient.mail`}
                                                validate={validateRecipientEmail}
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
                                    <ArrayInput
                                        label="Message"
                                        source={`${source}.message_template`}
                                    >
                                        <SimpleParagraphFormIterator>
                                            <ParagraphTemplateInput source="" />
                                        </SimpleParagraphFormIterator>
                                    </ArrayInput>
                                </div>
                            </CardContent>
                        </Card>
                        <FrontPreview className={classes.preview}>
                            {data && (
                                <MessageView
                                    text={data.text || ''}
                                    messageTemplate={data.message_template}
                                    objectIndication={data.object_indication || ''}
                                    action={<Link to="#" label="Suivant" />}
                                    setEmail={() => {}}
                                    setObject={() => {}}
                                    setCivility={() => {}}
                                    setFirstname={() => {}}
                                    setLastname={() => {}}
                                />
                            )}
                        </FrontPreview>
                    </Fragment>
                );
            }}
        </FormDataConsumer>
    </div>
);

MessageInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(MessageInput));
