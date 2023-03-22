import { ReactNode, useRef } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import SwiperClass, { Navigation } from 'swiper';
import 'swiper/css';
import { Swiper } from 'swiper/react';

import IconButton from './IconButton';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { black } from '@/components/themes/colors';

const styles = {
    height: '100%',
    '& .swiper-controls': {
        position: 'fixed',
        bottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 30px',
        height: '60px',
        zIndex: '100',
        width: '100%',
        pointerEvents: 'none',
        '& div': {
            pointerEvents: 'auto',
        },
    },
    '& .hidden': {
        visibility: 'hidden',
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
    if (total == null) {
        total = 0;
    }

    const buttonPrev = useRef<HTMLDivElement>(null);
    const buttonNext = useRef<HTMLDivElement>(null);
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

    return (
        <div className={className}>
            <Swiper
                modules={[Navigation]}
                initialSlide={initialSlide}
                onSlideChange={(swiper: SwiperClass) => {
                    if (swiper.isEnd) {
                        afterLastChange();
                    } else {
                        afterChange(swiper.activeIndex);
                    }
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                direction="horizontal"
                onClick={(swiper: SwiperClass) => handleSwiperClick(swiper)}
            >
                {children}
            </Swiper>

            <div className="swiper-controls">
                <div
                    ref={buttonPrev}
                    className={classnames('swiper-button-prev left', current === 1 ? 'hidden' : '')}
                >
                    <IconButton className={classnames('left transparent previous-arrow')}>
                        <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                    </IconButton>
                </div>
                <div
                    ref={buttonNext}
                    className={classnames(
                        'swiper-button-next right',
                        current === total + 1 ? 'hidden' : '',
                    )}
                >
                    <IconButton
                        className={classnames({
                            'next-arrow': current !== total,
                            'last-arrow': current === total,
                        })}
                    >
                        <FontAwesomeIcon icon={faArrowRight} color={black} className="icon" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(Carousel)(styles);
