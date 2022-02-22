import React, { Fragment, useEffect, useState } from 'react';

import classnames from 'classnames';
import glamorous from 'glamorous';
import IconButton from './IconButton';
import PropTypes from 'prop-types';
import Swiper from 'swiper/js/swiper.js';

import 'swiper/css/swiper.css';

import { black } from './colors';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StoryTouch from '../urgentActions/story/StoryTouch';
import MobileDetect from 'mobile-detect';

const styles = {
    height: '100%',
    '& .swiper-controls': {
        position: 'fixed',
        bottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '5px',
        height: '60px',
        zIndex: '100',
        '.right': {
            right: '20px',
        },
        '.left': {
            left: '20px',
        },
    },
    '& .icon': {
        cursor: 'pointer',
    },
};

export const Carousel = ({
    afterChange,
    afterLastChange,
    children,
    className,
    current,
    initialSlide,
    total,
}) => {
    const [swiper, setSwiper] = useState(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        initSwiper();
        return () => {
            if (swiper) {
                setTimeout(() => {
                    swiper.destroy();
                }, 500);
            }
        };
    }, [container]);

    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };

    const initSwiper = () => {
        const swiper = new Swiper(container, {
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
        setSwiper(swiper);
    };

    const slideNext = () => {
        swiper.slideNext();
    };

    const slidePrevious = () => {
        swiper.slidePrev();
    };

    return (
        <div className={className}>
            {current < total + 1 && isOnMobile() && (
                <StoryTouch slideNext={slideNext} slidePrevious={slidePrevious} />
            )}
            <div className="swiper-container" ref={setContainer}>
                <div className="swiper-wrapper">{children()}</div>
            </div>
            {current < total + 1 && (
                <Fragment>
                    <div className={classnames('swiper-controls right')}>
                        <IconButton
                            className={classnames({
                                'next-arrow': current !== total,
                                'last-arrow': current === total,
                            })}
                            onClick={slideNext}
                        >
                            <FontAwesomeIcon icon={faArrowRight} color={black} className="icon" />
                        </IconButton>
                    </div>
                    {current != 1 && (
                        <div className={classnames('swiper-controls left')}>
                            <IconButton
                                className={classnames('left transparent previous-arrow')}
                                onClick={slidePrevious}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                            </IconButton>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

Carousel.propTypes = {
    afterChange: PropTypes.func,
    afterLastChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.func,
    current: PropTypes.number,
    initialSlide: PropTypes.number,
    total: PropTypes.number,
};

export default glamorous(Carousel)(styles);
