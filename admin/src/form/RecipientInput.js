import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ContactEmail from '@material-ui/icons/ContactMail';
import isEmail from 'validator/lib/isEmail';

import { email, required, LongTextInput, TextInput } from 'react-admin';
import { pink } from '../../../front/src/themes/colors';

const styles = {
    root: {
        margin: '1rem 0 1rem',
        maxWidth: 700,
    },
    avatar: {
        color: pink,
    },
    wrapper: {
        marginTop: -24,
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

export const validateRecipientEmail = [required(), email()];

export const validateEmailsList = text =>
    text && !!text.split(',').find(t => !isEmail(t))
        ? 'Must contain only emails separated by a comma.'
        : null;

export const validatePostalAddress = required();

export const RecipientInput = ({ classes, label, ...rest }) => (
    <Card className={classes.root}>
        <CardHeader avatar={<ContactEmail className={classes.avatar} />} title={label} />
        <CardContent>
            <div className={classes.wrapper}>
                <div className={classes.emails}>
                    <TextInput
                        fullWidth
                        type="email"
                        label="Mail"
                        source="recipient.mail"
                        validate={validateRecipientEmail}
                    />
                    <TextInput
                        fullWidth
                        label="Copies to"
                        source="recipient.copies_to"
                        validate={validateEmailsList}
                    />
                    <TextInput
                        fullWidth
                        label="CCI"
                        source="recipient.cci"
                        validate={validateEmailsList}
                    />
                </div>
                <div className={classes.postalAddress}>
                    <LongTextInput
                        label="Postal Address"
                        source="recipient.postal_address"
                        validate={validatePostalAddress}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);

RecipientInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default withStyles(styles)(RecipientInput);
