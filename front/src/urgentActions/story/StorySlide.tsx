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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={classnames(className, 'swiper-slide')}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="story-step">{children({ ...step })}</div>
    </div>
);

export default styled(StorySlide)(styles);
