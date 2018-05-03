import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export const CarouselSlide = ({
    className,
    backgroundColor,
    color,
    children,
}) => (
    <div className={className} style={{ backgroundColor, color }}>
        {children}
    </div>
);

CarouselSlide.propTypes = {
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node.isRequired,
};

CarouselSlide.defauldProps = {
    backgroundColor: 'white',
    color: 'black',
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
