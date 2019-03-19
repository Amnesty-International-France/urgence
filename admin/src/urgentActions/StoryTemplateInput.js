import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, preview } from './styles';
import MediumInput from './MediumInput';
import FrontPreview, { noop } from './FrontPreview';
import DisplayOptionsInput from './DisplayOptionsInput';
import RichTextInput from '../form/RichTextInput';
import { get as getScreenIndex, STORY } from './screenIndex';

import StorySlide from '../../../front/src/urgentActions/story/StorySlide';

const styles = {
    ...root,
    preview: {
        ...preview,
        // the rules below override desktop media queries so that the preview is forced to appear like on mobile
        '& .story-step > div': {
            padding: '0 !important',
            '& .step': {
                flexDirection: 'column !important',
            },
            '& .act a': {
                display: 'block !important',
            },
            '& .link': {
                textAlign: 'center',
            },
        },
    },
};

const defaultFormData = {
    content: null,
    displayOptions: {
        backgroundColor: null,
        mediumPosition: null,
    },
    medium: null,
};

export const StoryTemplateInput = ({ classes, source, index, withLink }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>
                        {getScreenIndex(STORY, null, index + 1)}
                    </Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <RichTextInput source={`${source}content`} label="Text" />
                                <MediumInput source={`${source}medium`} label="Illustration" />
                                <DisplayOptionsInput
                                    source={`${source}displayOptions`}
                                    label="Display Options"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <StorySlide
                            step={{ ...defaultFormData, ...formData.story[index] }}
                            index={index + 1}
                            total={formData.story.length}
                            nextSlide={noop}
                            link={
                                formData.story.length === index + 1
                                    ? formData.end_of_story_link
                                    : null
                            }
                        />
                    </FrontPreview>
                </Fragment>
            )}
        </FormDataConsumer>
    </div>
);

StoryTemplateInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
    index: PropTypes.number.isRequired,
    withLink: PropTypes.bool,
};

StoryTemplateInput.defaultProps = {
    source: '',
    withLink: false,
};

export default addField(withStyles(styles)(StoryTemplateInput));
