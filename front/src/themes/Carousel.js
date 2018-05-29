import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'swiper/dist/js/swiper';
import classnames from 'classnames';
import 'swiper/dist/css/swiper.css';

export class Carousel extends Component {
    componentDidMount() {
        const { initialSlide, afterChange } = this.props;
        const swiper = new Swiper(this.container, {
            initialSlide,
            direction: 'horizontal',
            on: {
                slideChange: function() {
                    if (!swiper) {
                        return;
                    }
                    afterChange(swiper.activeIndex);
                },
            },
        });
        this.swiper = swiper;
    }
    initContainer = container => {
        this.container = container;
    };
    nextSlide = () => {
        this.swiper.slideNext();
    };
    componentWillUnmount() {
        this.swiper.destroy();
    }

    render() {
        const { children, className } = this.props;
        return (
            <div className={classnames(className, 'swiper-container')} ref={this.initContainer}>
                <div className={'swiper-wrapper'}>{children({ nextSlide: this.nextSlide })}</div>
            </div>
        );
    }
}

Carousel.propTypes = {
    initialSlide: PropTypes.number,
    children: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
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
