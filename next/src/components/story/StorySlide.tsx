import styled from '@emotion/styled';
import classnames from 'classnames';
import React from 'react';

// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';

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
    <div className={classnames(className)}>
        <div className="story-step">{children({ ...step })}</div>
    </div>
);

export default styled(StorySlide)(styles);
