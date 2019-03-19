import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Swiper from 'swiper/dist/js/swiper';
import classnames from 'classnames';
import 'swiper/dist/css/swiper.css';

import IconButton from './IconButton';
import Steps from './Steps';

const styles = {
    '& .swiper-container': {
        height: '100%',
    },
    '& .swiper-wrapper': {
        height: 'calc(100% - 60px - 17px)',
        '@media (min-width: 1024px)': {
            height: 'calc(100% - 60px - 25px)',
        },
    },
    '& .swiper-controls': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '5px 24px',
        height: '60px',
        width: '100%',
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
};

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

    slide = () => {
        const { current, total } = this.props;

        if (current + 1 === total) {
            this.props.afterLastChange();
            return;
        }
        this.swiper.slideNext();
    };

    componentWillUnmount() {
        this.swiper.destroy();
    }

    render() {
        icon;
        const { children, icon, className, current, total } = this.props;

        return (
            <div className={classnames(className, 'swiper-container')} ref={this.initContainer}>
                <div className="swiper-wrapper">{children({ nextSlide: this.nextSlide })}</div>
                <div className="swiper-controls">
                    <IconButton
                        className={classnames({
                            'next-arrow': current + 1 !== total,
                            'last-arrow': current + 1 === total,
                        })}
                        onClick={this.slide}
                    >
                        {icon}
                    </IconButton>
                </div>
                <div className="swiper-pagination">
                    <Steps current={current} total={total} />
                </div>
            </div>
        );
    }
}

IconButton.propTypes = {
    ...IconButton.propTypes,
    className: PropTypes.string,
};

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
