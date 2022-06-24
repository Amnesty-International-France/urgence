import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const styles = {
    height: '100%',
    '& .story-step': {
        flex: '1 0 0',
    },
};

export const StorySlide = ({ children, className, step }) => (
    <div className={classnames(className, 'swiper-slide')}>
        <div className="story-step">{children({ ...step })}</div>
    </div>
);

StorySlide.propTypes = {
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
    step: PropTypes.object,
};

export default styled(StorySlide)(styles);
