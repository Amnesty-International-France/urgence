import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'react-id-swiper';
import 'swiper/dist/css/swiper.css';

export class Carousel extends Component {
    initSlider = slider => {
        this.slider = slider.swiper;
    };
    nextSlide = () => {
        this.slider.slideNext();
    };

    render() {
        const { children, initialSlide, afterChange } = this.props;
        return (
            <Swiper direction="horizontal" initialSlide={initialSlide} ref={this.initSlider}>
                {children({ nextSlide: this.nextSlide })}
            </Swiper>
        );
    }
}

Carousel.propTypes = {
    initialSlide: PropTypes.number,
    children: PropTypes.func.isRequired,
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
