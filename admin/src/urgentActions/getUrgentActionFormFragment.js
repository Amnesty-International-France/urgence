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
    Labeled,
    TextInput,
} from 'react-admin';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { teal, blue, red, yellow, green, grey, orange, purple } from '@material-ui/core/colors';

import { LETTER_ACTIVATED } from '../flags';

import StoryTemplateInput from './StoryTemplateInput';
import CallToActionInput from './CallToActionInput';
import MessageViewInput from './message/MessageViewInput';
import MessageSendInput from './message/MessageSendInput';
import ThanksInput from './ThanksInput';
import ShareInput from './ShareInput';
import RegisterInput from './RegisterInput';
import LetterInput from './LetterInput';

import StoryStepFormIterator from './StoryStepFormIterator';
import MediumInput from './MediumInput';

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
        '&.social-metadata': {
            backgroundColor: purple[50],
        },
        '&.story': {
            backgroundColor: blue[50],
        },
        '&.call-to-action': {
            backgroundColor: yellow[50],
        },
        '&.message-view, &.message-send, &.letter': {
            backgroundColor: red[50],
        },
        '&.share, &.register': {
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

const isSocialMediaAction = (record, source) => {
    return (
        record &&
        record[source] &&
        record[source].interpelation_mode &&
        record[source].interpelation_mode === 'rs'
    );
};

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

            <div className={`${classes.form} social-metadata`}>
                <h2>Social Metadata</h2>
                <Fragment>
                    <FormDataConsumer>
                        {({ formData }) => {
                            if (!formData.social_metadata) {
                                formData.social_metadata = {};
                            }
                            formData.social_metadata.title = formData.social_metadata.title
                                ? formData.social_metadata.title
                                : formData.title;
                            return (
                                <TextInput source="social_metadata.title" fullWidth label="Title" />
                            );
                        }}
                    </FormDataConsumer>

                    <TextInput source="social_metadata.description" fullWidth label="Description" />
                    <MediumInput source="social_metadata.medium" label="Cover" />
                </Fragment>
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

            <FormDataConsumer>
                {({ formData }) => {
                    if (!isSocialMediaAction(formData, 'call_to_action')) {
                        return (
                            <Fragment>
                                <div className={`${classes.form} message-view`}>
                                    <h2>Message View</h2>
                                    <MessageViewInput source="message" />
                                </div>

                                <div className={`${classes.form} message-send`}>
                                    <h2>Message Send</h2>
                                    <MessageSendInput source="message" />
                                </div>

                                {LETTER_ACTIVATED && (
                                    <div className={`${classes.form} letter`}>
                                        <h2>Letter</h2>
                                        <LetterInput source="recipient" />
                                    </div>
                                )}
                            </Fragment>
                        );
                    }
                }}
            </FormDataConsumer>

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
