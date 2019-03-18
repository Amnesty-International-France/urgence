import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'swiper/dist/js/swiper';
import classnames from 'classnames';
import 'swiper/dist/css/swiper.css';

import Steps from './Steps';

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

    initContainer = element => {
        this.container = element;
    };

    nextSlide = () => {
        this.swiper.slideNext();
    };

    componentWillUnmount() {
        this.swiper.destroy();
    }

    render() {
        const { children, className, current, total } = this.props;

        return (
            <div className={classnames(className, 'swiper-container')} ref={this.initContainer}>
                <div className="swiper-wrapper">{children({ nextSlide: this.nextSlide })}</div>
                <div className="swiper-pagination">
                    <Steps current={current} total={total} />
                </div>
            </div>
        );
    }
}

Carousel.propTypes = {
    initialSlide: PropTypes.number,
    current: PropTypes.number,
    total: PropTypes.number,
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
        height: 'calc(100% - 17px)',
        '@media (min-width: 1024px)': {
            height: 'calc(100% - 25px)',
        },
    },
    '& .swiper-pagination': {
        margin: '0px',
        padding: '0px',
        height: '17px',
        width: '100%',
        '@media (min-width: 1024px)': {
            height: '25px',
        },
    },
});
