import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.css';

export const Carousel = ({ children, className, initialSlide, afterChange, vertical }) => (
    <Swiper className={className} direction="horizontal">
        {children}
    </Swiper>
);

Carousel.propTypes = {
    className: PropTypes.string,
    initialSlide: PropTypes.string,
    children: PropTypes.node.isRequired,
    afterChange: PropTypes.func,
    vertical: PropTypes.bool,
};

export default glamorous(Carousel)({
    '& .swiper-container': {
        height: '100%',
    },
    '& .swiper-wrapper': {
        height: '100%',
    },
});
