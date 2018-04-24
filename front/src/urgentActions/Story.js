import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Carousel from '../themes/Carousel';
import StoryStep from '../urgentActions/StoryStep';
import { StoryStepPropType } from '../propTypes';

const Story = ({ className, story }) => (
    <Carousel className={className}>
        {story.map(step => <StoryStep key={step.content} {...step} />)}
    </Carousel>
);

Story.propTypes = {
    className: PropTypes.string,
    story: PropTypes.arrayOf(StoryStepPropType),
};

export default glamorous(Story)({
    maxWidth: 360,
    height: '100vh',
    maxHeight: 540,
});
