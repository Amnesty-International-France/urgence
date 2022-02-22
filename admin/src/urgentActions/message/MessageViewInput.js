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

export const MessageSendInput = ({ classes, source }) => (
    <div className={classNames(classes.root, classes.bordered)}>
        <FormDataConsumer>
            {({ formData }) => {
                const data = formData[source];
                const displayPreview =
                    data && data.message_template && data.message_template.length > 0;

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
                                        source={`${source}.text_view`}
                                        defaultValue="Parce que les messages uniques ont plus d'impact nous vous invitons à personnaliser l'objet de l'email."
                                    />
                                    <RichTextInput
                                        fullWidth
                                        multiline
                                        label="Object Tip"
                                        source={`${source}.object_indication`}
                                        defaultValue="Indiquez par exemple que vous souhaitez parler de cette situation inacceptable."
                                    />
                                    <TextInput
                                        source={`${source}.object_example`}
                                        label="Object Example"
                                    />
                                    <Labeled label="Recipient">
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
                                    <ArrayInput
                                        label="Message"
                                        source={`${source}.message_template`}
                                    >
                                        <SimpleParagraphFormIterator>
                                            <ParagraphTemplateInput source="" />
                                        </SimpleParagraphFormIterator>
                                    </ArrayInput>
                                    <TextInput
                                        source={`${source}.button_view`}
                                        label="Button"
                                        defaultValue="Suivant"
                                        validate={[required(), minLength(3), maxLength(25)]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        {displayPreview ? ((
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
                            )
                        ) : (
                            <p>You should write a message to see this preview</p>
                        )}
                    </Fragment>
                );
            }}
        </FormDataConsumer>
    </div>
);

MessageSendInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(MessageSendInput));
