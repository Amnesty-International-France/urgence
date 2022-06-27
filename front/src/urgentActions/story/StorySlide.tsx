import React from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const styles = {
    height: '100%',
    '& .story-step': {
        flex: '1 0 0',
    },
};

type Props = {
    children: (...args: any[]) => any;
    className?: string;
    step?: any;
};

export const StorySlide = ({ children, className, step }: Props) => (
    <div className={classnames(className, 'swiper-slide')}>
        <div className="story-step">{children({ ...step })}</div>
    </div>
);

export default styled(StorySlide)(styles);
