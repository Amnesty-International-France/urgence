import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import { withStyles, Typography, Card, CardHeader, CardContent } from 'material-ui';
import ContactEmail from '@material-ui/icons/ContactMail';

import { Labeled, LongTextInput, TextInput, required } from 'react-admin';
import { pink } from '../../../front/src/themes/colors';

// const isEmail = email => email && validator.isEmail(email);

const styles = {
    root: {
        margin: '1rem 0 1rem',
        maxWidth: 700,
    },
    avatar: {
        color: pink,
    },
    wrapper: {
        marginTop: -48,
        display: 'flex',
    },
    emails: {
        flex: '1 0 0',
    },
    postalAddress: {
        flex: '1 0 0',
        marginLeft: '2rem',
    },
};

export const validateEmailsList = text =>
    text && text.split(',').find(email => !isEmail(email))
        ? 'Must contain only mail separated by ","'
        : null;

export const RecipientInput = ({ classes, label, ...rest }) => (
    <Card className={classes.root}>
        <CardHeader avatar={<ContactEmail className={classes.avatar} />} title="Recipient" />
        <CardContent>
            <div className={classes.wrapper}>
                <div className={classes.emails}>
                    <p>
                        <TextInput fullWidth type="email" label="Mail" source="recipient.mail" />
                    </p>
                    <p>
                        <TextInput fullWidth label="Copies to" source="recipient.copies_to" />
                    </p>
                    <p>
                        <TextInput fullWidth label="CCI" source="recipient.cci" />
                    </p>
                </div>
                <div className={classes.postalAddress}>
                    <p>
                        <LongTextInput label="Postal Address" source="recipient.postal_address" />
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);

RecipientInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default withStyles(styles)(RecipientInput);

/*
<LongTextInput
                label="Mail"
                source="recipient.mail"
                validate={[validateMail, required()]}
            />
            <LongTextInput label="Copies to" source="recipient.copies_to" validate={validateMail} />
            <LongTextInput label="CCI" source="recipient.cci" validate={validateMail} />
            */
