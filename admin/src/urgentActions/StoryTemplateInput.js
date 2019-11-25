import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, storyScreenPreview } from './styles';
import MediumInput from './MediumInput';
import FrontPreview from './FrontPreview';
import RichTextInput from '../form/RichTextInput';
import { get as getScreenIndex, STORY } from './screenIndex';

import StorySlide from '../../../front/src/urgentActions/story/StorySlide';
import StoryStep from '../../../front/src/urgentActions/story/StoryStep';
import StoryCover from '../../../front/src/urgentActions/story/StoryCover';

const styles = {
    ...root,
    preview: {
        ...storyScreenPreview,
        '& .rich-text': {
            '@media (min-width: 1024px)': {
                fontSize: '16px !important',
            },
        },
        '& .step': {
            padding: '100px 20px !important',
            '@media (min-aspect-ratio: 1/1)': {
                padding: '100px 20px !important',
            },
        },
        '@media (min-width: 1024px)': {
            '& .rich-text > p': {
                fontSize: '16px !important',
            },
            '& .ql-size-large': {
                padding: '4px 0 !important',
                fontSize: '26px !important',
                lineHeight: '39px !important',
            },
            '& .ql-size-huge': {
                padding: '6px 0 !important',
                fontSize: '36px !important',
                lineHeight: '54px !important',
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

const StoryCoverInput = ({ source }) => (
    <Fragment>
        <RichTextInput source={`${source}content`} label="Text *" isRequired />
        <MediumInput source={`${source}medium`} label="Cover" />
    </Fragment>
);

const StoryStepInput = ({ source }) => (
    <Fragment>
        <RichTextInput source={`${source}content`} label="Text *" isRequired />
    </Fragment>
);

export const StoryTemplateInput = ({ classes, source, index }) => (
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
                                {index === 0 ? (
                                    <StoryCoverInput source={source} />
                                ) : (
                                    <StoryStepInput source={source} />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <StorySlide
                            index={index}
                            step={{ ...defaultFormData, ...formData.story[index] }}
                        >
                            {props =>
                                index === 0 ? <StoryCover {...props} /> : <StoryStep {...props} />
                            }
                        </StorySlide>
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
};

export default addField(withStyles(styles)(StoryTemplateInput));
