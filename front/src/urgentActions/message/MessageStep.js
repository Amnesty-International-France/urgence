import React from 'react';
import PropTypes from 'prop-types';

import RichText from '../../themes/RichText';
import CarouselSlide from '../../themes/CarouselSlide';

export const StoryStep = ({ className, content }) => (
    <CarouselSlide className={className}>
        <RichText html={content} />
    </CarouselSlide>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
    last: PropTypes.bool,
};

export default StoryStep;
