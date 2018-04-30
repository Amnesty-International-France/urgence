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
}) => (
    <Slider
        className={className}
        infinite={false}
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
};

export default glamorous(Carousel)({
    '.slick-slide > div': {
        height: '100%',
    },
});
