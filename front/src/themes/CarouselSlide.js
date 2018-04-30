import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export const StoryStep = ({ className, backgroundColor, children }) => (
    <div className={className} style={{ backgroundColor }}>
        {children}
    </div>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
    children: PropTypes.node.isRequired,
};

StoryStep.defauldProps = {
    backgroundColor: 'white',
};

export default glamorous(StoryStep)({
    height: window.innerHeight,
    overflow: 'auto',
    fontSize: 24,
    '& > *': {
        flex: '1 0 0',
    },
    '& .rich-text': {
        padding: '2rem 3rem',
    },
});
