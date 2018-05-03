import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Carousel = ({
    children,
    className,
    initialSlide,
    afterChange,
    vertical,
}) => (
    <Slider
        className={className}
        infinite={false}
        vertical={vertical}
        verticalSwiping={vertical}
        afterChange={afterChange}
        initialSlide={initialSlide}
    >
        {children}
    </Slider>
);

Carousel.propTypes = {
    className: PropTypes.string,
    initialSlide: PropTypes.string,
    children: PropTypes.node.isRequired,
    afterChange: PropTypes.func,
    vertical: PropTypes.bool,
};

export default glamorous(Carousel)({
    height: '100%',
    '.slick-slide > div': {
        height: '100%',
    },
    '.slick-slider': {
        height: '100%',
    },
});
