import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import Image from '../themes/Image';

export const StoryStep = ({ className, medium, displayOptions, content }) => (
    <div
        className={className}
        style={{ backgroundColor: displayOptions.backgroundColor }}
    >
        <Image {...medium} />
        <RichText html={content} />
    </div>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    medium: PropTypes.shape({
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),
    displayOptions: PropTypes.shape({
        position: PropTypes.oneOf(['top', 'bottom']),
        backgroundColor: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
};

export default glamorous(StoryStep)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 24,
    '& > *': {
        flex: '1 0 0',
    },
    '& .rich-text': {
        padding: '2rem 3rem',
    },
});
