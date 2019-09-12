import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'swiper/dist/js/swiper';
import classnames from 'classnames';
import 'swiper/dist/css/swiper.css';

import IconButton from './IconButton';

const styles = {
    '& .swiper-container': {
        height: '100%',
    },
    '& .swiper-wrapper': {
        height: 'calc(100% - 10px)',
    },
    '& .swiper-controls': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '5px 24px',
        marginTop: '-60px',
        height: '60px',
        width: '100%',
        zIndex: '100',
    },
    '& .swiper-progress-bar': {
        position: 'relative',
        margin: '0px',
        padding: '0px',
        height: '100%',
        width: '100%',
    },
};

export class Carousel extends Component {
    componentDidMount() {
        const { initialSlide, afterChange, total } = this.props;
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
                touchEnd: function() {
                    if (
                        swiper &&
                        swiper.activeIndex + 1 === total &&
                        swiper.swipeDirection === 'next'
                    ) {
                        afterChange(swiper.activeIndex);
                    }
                },
            },
        });
        this.swiper = swiper;
    }

    initContainer = element => {
        this.container = element;
    };

    slide = () => {
        const { current, total } = this.props;

        if (current === total) {
            this.props.afterLastChange();
            return;
        }
        this.swiper.slideNext();
    };

    componentWillUnmount() {
        setTimeout(() => {
            this.swiper.destroy();
        }, 100);
    }

    render() {
        const { children, icon, className, current, total } = this.props;

        return (
            <div className={classnames(className, 'swiper-container')} ref={this.initContainer}>
                <div className="swiper-wrapper">{children()}</div>
                <div className="swiper-controls">
                    <IconButton
                        className={classnames({
                            'next-arrow': current !== total,
                            'last-arrow': current === total,
                        })}
                        onClick={this.slide}
                    >
                        {icon}
                    </IconButton>
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
    icon: PropTypes.element.isRequired,
    className: PropTypes.string.isRequired,
    afterChange: PropTypes.func,
    afterLastChange: PropTypes.func,
};

export default glamorous(Carousel)(styles);
