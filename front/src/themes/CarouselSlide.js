import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export const CarouselSlide = ({ className, backgroundColor, children }) => (
    <div className={className} style={{ backgroundColor }}>
        {children}
    </div>
);

CarouselSlide.propTypes = {
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
    children: PropTypes.node.isRequired,
};

CarouselSlide.defauldProps = {
    backgroundColor: 'white',
};

export default glamorous(CarouselSlide)({
    height: '100vh',
    overflow: 'auto',
    fontSize: 24,
    '& > *': {
        flex: '1 0 0',
    },
    '& .rich-text, & > p': {
        padding: '2em 3em',
        lineHeight: '1.5em',
        textAlign: 'justify',
    },
});
