import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'swiper/js/swiper.js';
import classnames from 'classnames';
import 'swiper/css/swiper.css';

import IconButton from './IconButton';

const styles = {
    height: '100%',
    '& .swiper-controls': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '5px 50px',
        marginTop: '-50px',
        height: '60px',
        zIndex: '100',
    },
};

export class Carousel extends Component {
    componentDidMount() {
        const { initialSlide, afterChange, afterLastChange } = this.props;
        const swiper = new Swiper(this.container, {
            initialSlide,
            direction: 'horizontal',
            on: {
                slideChange: () => {
                    if (!swiper) {
                        return;
                    }
                    if (swiper.isEnd) {
                        afterLastChange();
                    } else {
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
            <div className={className}>
                <div className="swiper-container" ref={this.initContainer}>
                    <div className="swiper-wrapper">{children()}</div>
                </div>
                {current < total + 1 && (
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
                )}
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
