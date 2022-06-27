import { Fragment, ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import Swiper from 'swiper';
import IconButton from './IconButton';

import 'swiper/css';

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
    afterChange?: (...args: any[]) => any;
    afterLastChange?: (...args: any[]) => any;
    className?: string;
    children: (...args: any[]) => ReactElement;
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
    const [swiper, setSwiper] = useState(null);
    const [container, setContainer] = useState(null);

    const slideNext = () => {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        !isOnMobile() && swiper.slideNext();
    };

    const slidePrevious = () => {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        !isOnMobile() && swiper.slidePrev();
    };
    const handleSwiperClick = (swipper: any) =>
        function (event: any) {
            if (!container) return;
            const containerRect = (container as any).getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerLeft = containerRect.left;
            const clickX = event.clientX;
            const hasClickTheLeftSide = clickX < containerLeft + containerWidth * 0.3;
            if (hasClickTheLeftSide) {
                swipper.slidePrev();
            } else {
                swipper.slideNext();
            }
        };

    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };
    useEffect(() => {
        initSwiper();
        return () => {
            if (swiper) {
                setTimeout(() => {
                    if (isOnMobile()) {
                        document.removeEventListener('click', handleSwiperClick(swiper), false);
                    }
                    (swiper as any).destroy();
                }, 500);
            }
        };
    }, [container]);

    const initSwiper = () => {
        let swiper: any;
        // @ts-ignore TODO guillaumep
        swiper = new Swiper(container, {
            initialSlide,
            direction: 'horizontal',
            on: {
                slideChange: () => {
                    if (!swiper) {
                        return;
                    }
                    if (swiper.isEnd) {
                        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                        afterLastChange();
                    } else {
                        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                        afterChange(swiper.activeIndex);
                    }
                },
            },
        });
        if (isOnMobile()) {
            document.addEventListener('click', handleSwiperClick(swiper), false);
        }
        setSwiper(swiper);
    };

    return (
        <div className={className}>
            <div
                className="swiper"
                //@ts-ignore TODO
                ref={setContainer}
            >
                <div className="swiper-wrapper">{children()}</div>
            </div>

            <Fragment>
                {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
                {current != total + 1 && (
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
                )}
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
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(Carousel)(styles);
