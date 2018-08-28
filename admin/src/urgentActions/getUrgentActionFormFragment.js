import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ArrayInput, LongTextInput, required, SimpleForm } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

import StoryTemplateInput from './StoryTemplateInput';
import CallToActionInput from './CallToActionInput';
import MessageInput from './MessageInput';
import ObjectInput from './ObjectInput';
import FullNameInput from './FullNameInput';
import ThanksInput from './ThanksInput';
import AddressInput from './AddressInput';
import EmailInput from './EmailInput';

import StoryStepFormIterator from './StoryStepFormIterator';

const styles = {
    form: {
        padding: '0 1em 1em 1em',
        alignItems: 'flex-start',
        '& h2': {
            margin: 0,
            paddingTop: '1rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            color: grey[600],
        },
        '&.story': {
            backgroundColor: blue[50],
        },
        '&.call-to-action': {
            backgroundColor: yellow[50],
        },
        '&.message': {
            backgroundColor: teal[50],
        },
        '&.continue': {
            backgroundColor: yellow[50],
        },
        '&.letter': {
            backgroundColor: teal[50],
        },
        '&.thank-you': {
            backgroundColor: green[50],
        },
    },
};

export const Form = ({ classes }) => (
    <Fragment>
        <div className={classes.form}>
            <LongTextInput source="title" validate={required()} />
        </div>

        <div className={`${classes.form} story`}>
            <h2>Story</h2>
            <ArrayInput source="story" label="">
                <StoryStepFormIterator>
                    <StoryTemplateInput source="" />
                </StoryStepFormIterator>
            </ArrayInput>
        </div>

        <div className={`${classes.form} call-to-action`}>
            <h2>Call to Action</h2>
            <CallToActionInput source="call_to_action" />
        </div>

        <div className={`${classes.form} message`}>
            <h2>Message</h2>
            <MessageInput source="" />
            <ObjectInput source="" />
            <FullNameInput source="" />
        </div>

        <div className={`${classes.form} continue`}>
            <h2>Continue</h2>
            <ThanksInput source="email_thank" />
        </div>

        <div className={`${classes.form} letter`}>
            <h2>Letter</h2>
            <AddressInput source="recipient.postal_address" />
            <EmailInput source="" />
        </div>

        <div className={`${classes.form} thank-you`}>
            <h2>Thank You</h2>
            <ThanksInput source="letter_thank" final />
        </div>
    </Fragment>
);

Form.propTypes = {
    classes: PropTypes.object,
};

const StyledForm = withStyles(styles)(Form);

export default () => (
    <SimpleForm className="urgent-action-form">
        <StyledForm />
    </SimpleForm>
);
