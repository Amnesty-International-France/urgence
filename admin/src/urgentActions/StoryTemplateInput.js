import React from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import injectSheet from 'react-jss';
import { CardContent, Card, Avatar } from 'material-ui';

import MediumInput from './MediumInput';
import DisplayOptionsInput from './DisplayOptionsInput';
import RichTextInput from '../form/RichTextInput';

import { pink } from '../../../front/src/themes/colors';
import StorySlide from '../../../front/src/urgentActions/StorySlide';
import { Router } from '../../../front/src/gateway/ReactRouter';

const styles = {
    root: {
        margin: '1rem 1rem 2rem',
        maxWidth: 500,
    },
    avatar: {
        color: '#fff',
        backgroundColor: pink,
        float: 'left',
    },
    formContainer:{
        marginLeft: 60,
        '& > div': {
            width: '100%',
            margin: 0,
            marginBottom: 25,
            '& > label': {
                fontSize: '1.5em',
                fontWeight: 'bold',
            },
        },
    },
    preview: {
        height: 600,
        width: 375,
        margin: 16,
        fontFamily: "'Amnesty Trade Gothic', 'Arial', sans-serif",
        // the rules below override desktop media queries so that the preview is forced to appear like on mobile
        '& .story-step > div': {
            padding: '0 !important',
            '& .step': {
                flexDirection: 'column !important',
            },
            '& .act a': {
                display: 'block !important',
            }
        }
    }
};

const defaultFormData = {
    content: null,
    displayOptions: {
        backgroundColor: null,
        mediumPosition: null,
    },
    medium: null,
};

const noop = () => { };

export const StoryTemplateInput = ({ classes, source, index }) => (
    <div style={{display:'flex'}}>
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Avatar className={classes.avatar}>{index + 1}</Avatar>
                <div className={classes.formContainer}>
                    <RichTextInput
                        source={`${source}content`}
                        label="Text"
                        isRequired
                    />
                    <MediumInput
                        source={`${source}medium`}
                        label="Illustration"
                    />
                    <DisplayOptionsInput
                        source={`${source}displayOptions`}
                        label="Display Options"
                    />
                </div>
            </CardContent>
        </Card>
        <FormDataConsumer>
            {({ formData }) =>
                <div className={`${classes.preview} preview`}>
                    {/* Router is necessary cause ActButton needs match params passed in its props */}
                    <Router>
                        <StorySlide
                            step={{...defaultFormData, ...formData.story[index]}}
                            index={index + 1}
                            total={formData.story.length}
                            nextSlide={noop}
                        />
                    </Router>
                </div>
            }
        </FormDataConsumer>
    </div>
);

StoryTemplateInput.propTypes = {
    source: PropTypes.string.isRequired,
};

export default addField(injectSheet(styles)(StoryTemplateInput));
