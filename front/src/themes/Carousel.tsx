import { Fragment, ReactNode, useRef } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { Swiper } from 'swiper/react';
import SwiperClass from 'swiper';
import 'swiper/css/bundle';

import IconButton from './IconButton';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { red } from '@material-ui/core/colors';
import MobileDetect from 'mobile-detect';
import { black } from './colors';

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
        backgroundColor: red,
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

type Props = {
    afterChange: (...args: any[]) => any;
    afterLastChange: (...args: any[]) => any;
    className?: string;
    children: ReactNode[] | ReactNode;
    current?: number;
    initialSlide?: number;
    total?: number;
};

export const Carousel = ({
    afterChange,
    afterLastChange,
    children,
    className,
    current,
    initialSlide,
    total,
}: Props) => {
    const swiper = useRef<SwiperClass | null>(null);
    if (total == null) {
        total = 0;
    }
    const slideNext = () => {
        console.log(swiper);
        !isOnMobile() && swiper.current && swiper.current.slideNext();
    };

    const slidePrevious = () => {
        !isOnMobile() && swiper.current && swiper.current.slidePrev();
    };
    const handleSwiperClick = (swiper: SwiperClass) =>
        function (event: any) {
            if (!swiper) return;
            const containerRect = swiper.el.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerLeft = containerRect.left;
            const clickX = event.clientX;
            const hasClickTheLeftSide = clickX < containerLeft + containerWidth * 0.3;
            if (hasClickTheLeftSide) {
                swiper.slidePrev();
            } else {
                swiper.slideNext();
            }
        };

    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };

    return (
        <div className={className}>
            <Swiper
                initialSlide={initialSlide}
                onSlideChange={(swiper: SwiperClass) => {
                    if (swiper.isEnd) {
                        afterLastChange();
                    } else {
                        afterChange(swiper.activeIndex);
                    }
                }}
                direction="horizontal"
                onClick={(swiper: SwiperClass) => handleSwiperClick(swiper)}
            >
                {children}
            </Swiper>

            <div className="swiper-controls">
                {current !== total + 1 && (
                    <div className={classnames('right')}>
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
                )}
                {current !== 1 && (
                    <div className={classnames('swiper-button-prev left')}>
                        <IconButton
                            className={classnames('left transparent previous-arrow')}
                            onClick={slidePrevious}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(Carousel)(styles);
