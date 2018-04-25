import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import Image from '../themes/Image';
import { StoryStepPropType } from '../propTypes';
import { colors } from '../themes/colors';

export const StoryStep = ({ className, medium, displayOptions, content }) => (
    <div
        className={className}
        style={{ backgroundColor: colors[displayOptions.backgroundColor] }}
    >
        {medium &&
            displayOptions.mediumPosition === 'top' && <Image {...medium} />}

        <RichText html={content} />

        {medium &&
            displayOptions.mediumPosition === 'bottom' && <Image {...medium} />}
    </div>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    ...StoryStepPropType,
};

export default glamorous(StoryStep)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    fontSize: 24,
    '& > *': {
        flex: '1 0 0',
    },
    '& .rich-text': {
        padding: '2rem 3rem',
    },
});
