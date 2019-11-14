import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import {
    ArrayInput,
    LongTextInput,
    SelectInput,
    SimpleForm,
    FormDataConsumer,
    required,
} from 'react-admin';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { teal, blue, red, yellow, green, grey, orange } from '@material-ui/core/colors';

import { LETTER_ACTIVATED } from '../flags';

import StoryTemplateInput from './StoryTemplateInput';
import CallToActionInput from './CallToActionInput';
import MessageInput from './MessageInput';
import ThanksInput from './ThanksInput';
import ShareInput from './ShareInput';
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
            backgroundColor: red[50],
        },
        '&.letter': {
            backgroundColor: red[50],
        },
        '&.share': {
            backgroundColor: teal[50],
        },
        '&.register': {
            backgroundColor: teal[50],
        },
        '&.thank-you': {
            backgroundColor: green[50],
        },
    },
    warning: {
        color: orange[600],
    },
};

const generateSlug = (title = '') =>
    slugify(title, {
        replacement: '-',
        remove: /[*+~.()'"!:@#,]/g,
        lower: true,
    });

const autoFocusProps = { autoFocus: true };

const Form = ({ classes, record }) => {
    const [emptyCode, setEmptyCode] = useState(!record.campaign_code);

    const handleTextFieldChange = e => {
        setEmptyCode(e.target.value === '');
    };

    return (
        <Fragment>
            <div className={classes.form}>
                <Grid container spacing={8} justify="space-between">
                    <Grid item xs>
                        <LongTextInput
                            source="campaign_code"
                            label="Campaign Code"
                            onChange={handleTextFieldChange}
                            helperText={
                                emptyCode ? (
                                    <span className={classes.warning}>
                                        Activists actions won't be sent down to SalesForce while
                                        this field remains empty.
                                    </span>
                                ) : (
                                    ''
                                )
                            }
                            inputProps={autoFocusProps}
                        />
                    </Grid>
                    <Grid item xs>
                        <LongTextInput
                            source="origin_code"
                            label="Origin Code"
                            defaultValue="AU_WEBAPP"
                        />
                    </Grid>
                    <Grid item xs>
                        <SelectInput
                            source="is_default"
                            label="Set As Default"
                            defaultValue={false}
                            style={{ width: '100%' }}
                            choices={[
                                { id: true, name: 'Yes' },
                                { id: false, name: 'No' },
                            ]}
                        />
                    </Grid>
                </Grid>
                <LongTextInput source="title" validate={required()} />
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
            </div>

            {LETTER_ACTIVATED && (
                <div className={`${classes.form} letter`}>
                    <h2>Letter</h2>
                    <LetterInput source="recipient" />
                </div>
            )}

            <div className={`${classes.form} share`}>
                <h2>Share (only for members already registered)</h2>
                <ShareInput source="email_thank" />
            </div>

            <div className={`${classes.form} register`}>
                <h2>Register (for new members)</h2>
                <RegisterInput source="register" />
            </div>

            <div className={`${classes.form} thank-you`}>
                <h2>Final Thank You</h2>
                <ThanksInput source="end_thank" final />
            </div>
        </Fragment>
    );
};

Form.propTypes = {
    classes: PropTypes.object,
};

const StyledForm = withStyles(styles)(Form);

export default () => (
    <SimpleForm className="urgent-action-form">
        <StyledForm />
    </SimpleForm>
);
