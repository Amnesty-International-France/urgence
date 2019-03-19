import classnames from 'classnames';
import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import StoryStep from '../urgentActions/StoryStep';

import { LinkType } from '../propTypes';

const styles = {
    height: 'calc(100% - 17px)',
    '& .story-step': {
        flex: '1 0 0',
    },
    '& .slide.with-bottom-media .bottom': {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100vw',
        '@media (max-aspect-ratio: 1/1)': {
            color: '#fff !important',
            backgroundColor: 'transparent !important',
            background: 'linear-gradient(#0000, #000f)',
            '& svg': {
                fill: '#fff !important',
            },
        },
    },
};

export const StorySlide = ({ className, step, link }) => {
    return (
        <div
            key={step.content}
            className={classnames(className, {
                'swiper-slide': true,
                'with-bottom-media': get(step, 'displayOptions.mediumPosition') === 'bottom',
            })}
        >
            <div className="story-step">
                <StoryStep link={link} {...step} />
            </div>
        </div>
    );
};

StorySlide.propTypes = {
    className: PropTypes.string,
    step: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    link: LinkType,
};

export default glamorous(StorySlide)(styles);
