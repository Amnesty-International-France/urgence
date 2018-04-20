import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Carousel = ({ children }) => (
    <Slider settings={settings}>{children}</Slider>
);

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Carousel;
