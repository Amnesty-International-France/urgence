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

import { root, preview, messageFormScreenPreview } from './styles';
import { get as getScreenIndex, MESSAGE } from './screenIndex';
import ParagraphTemplateInput from './ParagraphTemplateInput';
import FrontPreview from './FrontPreview';

import Message from '../../../front/src/urgentActions/message/Message';
import Link from '../../../front/src/themes/Link';
import SimpleParagraphFormIterator from './SimpleParagraphFormIterator';

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

const initMessageTemplate = [{ value: '' }];

export const MessageInput = ({ classes, source }) => (
    <div className={classNames(classes.root, classes.bordered)}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(MESSAGE, formData)}</Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <Labeled label="Recipient">
                                    <Fragment>
                                        <TextInput
                                            fullWidth
                                            type="email"
                                            label="Mail"
                                            source={`${source}recipient.mail`}
                                            validate={validateRecipientEmail}
                                        />
                                        <TextInput
                                            fullWidth
                                            label="Copies to"
                                            source={`${source}recipient.copies_to`}
                                            validate={validateEmailsList}
                                        />
                                        <TextInput
                                            fullWidth
                                            label="CCI"
                                            source={`${source}recipient.cci`}
                                            validate={validateEmailsList}
                                        />
                                    </Fragment>
                                </Labeled>
                                <ArrayInput label="Message" source={`${source}message_template`}>
                                    <SimpleParagraphFormIterator>
                                        <ParagraphTemplateInput source="" />
                                    </SimpleParagraphFormIterator>
                                </ArrayInput>
                                <TextInput
                                    fullWidth
                                    label="Object tip"
                                    source={`${source}object_indication`}
                                    defaultValue={`Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.`}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    {formData.message_template && (
                        <FrontPreview className={classes.preview}>
                            <Message
                                messageTemplate={
                                    formData.message_template &&
                                    formData.message_template[0] &&
                                    formData.message_template[0].value
                                        ? formData.message_template
                                        : initMessageTemplate
                                }
                                objectIndication={formData.object_indication || ''}
                                action={<Link to="#" label="J'envoie" />}
                                setEmail={() => {}}
                                setObject={() => {}}
                                setCivility={() => {}}
                                setFirstname={() => {}}
                                setLastname={() => {}}
                            />
                        </FrontPreview>
                    )}
                </Fragment>
            )}
        </FormDataConsumer>
    </div>
);

MessageInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

MessageInput.defaultProps = {};

export default addField(withStyles(styles)(MessageInput));
