import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, minLength, maxLength, required, FormDataConsumer, TextInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

import { root, preview, messageFormScreenPreview } from '../styles';
import { get as getScreenIndex, MESSAGE_SEND } from '../screenIndex';
import RichTextInput from '../../form/RichTextInput';
import FrontPreview from '../FrontPreview';

import MessageSend from '../../../../front/src/urgentActions/message-send/MessageSend';
import Link from '../../../../front/src/themes/Link';

import { LETTER_ACTIVATED } from '../../flags';

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

export const MessageSendInput = ({ classes, source }) => (
    <div className={classNames(classes.root, { [classes.bordered]: LETTER_ACTIVATED })}>
        <FormDataConsumer>
            {({ formData }) => {
                const data = formData[source];
                const displayPreview =
                    data && data.message_template && data.message_template.length > 0;

                return (
                    <Fragment>
                        <Avatar className={classes.avatar}>
                            {getScreenIndex(MESSAGE_SEND, formData)}
                        </Avatar>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className={classes.formContainer}>
                                    <RichTextInput
                                        fullWidth
                                        multiline
                                        label="Message Send Tip"
                                        source={`${source}.text_send`}
                                        defaultValue="Complétez ce formulaire pour envoyer ce message."
                                    />
                                    <TextInput
                                        source={`${source}.button_send`}
                                        label="Button"
                                        defaultValue="Voir l'email"
                                        validate={[required(), minLength(3), maxLength(25)]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        {displayPreview ? (
                            <FrontPreview className={classes.preview}>
                                <MessageSend
                                    text={data.text_send || ''}
                                    messageTemplate={data.message_template}
                                    action={<Link to="#" label={data.button_send} />}
                                    setCivility={() => {}}
                                    setFirstname={() => {}}
                                    setLastname={() => {}}
                                    setEmail={() => {}}
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

MessageSendInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(MessageSendInput));
