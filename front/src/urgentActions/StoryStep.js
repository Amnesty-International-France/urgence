import React from 'react';
import PropTypes from 'prop-types';

import RichText from '../themes/RichText';
import Image from '../themes/Image';
import ActButton from './ActButton';
import { StoryStepPropType } from '../propTypes';
import { colors } from '../themes/colors';
import CarouselSlide from '../themes/CarouselSlide';

export const StoryStep = ({
    className,
    medium,
    displayOptions,
    content,
    last,
}) => (
    <CarouselSlide
        backgroundColor={colors[displayOptions.backgroundColor]}
        className={className}
    >
        {medium &&
            displayOptions.mediumPosition === 'top' && <Image {...medium} />}

        <RichText html={content} />

        {last && <ActButton />}
        {medium &&
            displayOptions.mediumPosition === 'bottom' && <Image {...medium} />}
    </CarouselSlide>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    last: PropTypes.bool,
    ...StoryStepPropType,
};

export default StoryStep;
