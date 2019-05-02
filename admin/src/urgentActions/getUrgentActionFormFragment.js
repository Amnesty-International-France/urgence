import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import { ArrayInput, LongTextInput, SimpleForm, FormDataConsumer, required } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

import { USE_CALL_TO_ACTION_LINK, LETTER_ACTIVATED } from '../flags';

import StoryTemplateInput from './StoryTemplateInput';
import CallToActionInput from './CallToActionInput';
import MessageInput from './MessageInput';
import ThanksInput from './ThanksInput';
import RegisterInput from './RegisterInput';
import LetterInput from './LetterInput';

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
        '&.register': {
            backgroundColor: teal[50],
        },
        '&.thank-you': {
            backgroundColor: green[50],
        },
    },
};

const generateSlug = (title = '') =>
    slugify(title, {
        replacement: '-',
        remove: /[*+~.()'"!:@#,]/g,
        lower: true,
    });

export const Form = ({ classes }) => (
    <Fragment>
        <div className={classes.form}>
            <LongTextInput
                source="title"
                validate={required()}
                inputProps={{ autoFocus: true }}
            />
            <FormDataConsumer>
                {({ formData }) => {
                    formData.slug = generateSlug(formData.title);
                    return <LongTextInput source="slug" disabled />;
                }}
            </FormDataConsumer>
        </div>

        <div className={`${classes.form} story`}>
            <h2>Story</h2>
            <ArrayInput source="story" label="">
                <StoryStepFormIterator>
                    <StoryTemplateInput source="" withLink={USE_CALL_TO_ACTION_LINK} />
                </StoryStepFormIterator>
            </ArrayInput>
        </div>

        <div className={`${classes.form} call-to-action`}>
            <h2>Call to Action</h2>
            <CallToActionInput source="call_to_action" withLink={USE_CALL_TO_ACTION_LINK} />
        </div>

        <div className={`${classes.form} message`}>
            <h2>Message</h2>
            <MessageInput source="" withLink={USE_CALL_TO_ACTION_LINK} />
        </div>

        <div className={`${classes.form} continue`}>
            <h2>Continue</h2>
            <ThanksInput source="email_thank" withLink={USE_CALL_TO_ACTION_LINK} />
        </div>

        {LETTER_ACTIVATED && (
            <div className={`${classes.form} letter`}>
                <h2>Letter</h2>
                <LetterInput source="recipient" />
            </div>
        )}

        <div className={`${classes.form} register`}>
            <h2>Register</h2>
            <RegisterInput source="register" />
        </div>

        <div className={`${classes.form} thank-you`}>
            <h2>Thank You</h2>
            <ThanksInput source="end_thank" withLink={USE_CALL_TO_ACTION_LINK} final />
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
