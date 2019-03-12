import classnames from 'classnames';
import get from 'lodash.get';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import StoryStep from '../urgentActions/StoryStep';
import { textColorForBackgroundColor, colors } from '../themes/colors';
import { RightArrow } from '../icons';
import { LinkType } from '../propTypes';

const styles = {
    '& .story-step': {
        flex: '1 0 0',
    },

    '& .bottom': {
        flex: '0 0 50px',
        alignItems: 'center',
        padding: '17px 24px',
        display: 'flex',
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

    '& .bottom > *': {
        flex: '1 0 0',
    },

    '& .next-arrow': {
        position: 'relative',
        top: 4,
        textAlign: 'right',
        fontSize: 28,
    },

    '& .counter': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: 18,
        lineHeight: '22px',
    },
};

const rightArrowColor = step => textColorForBackgroundColor(step.displayOptions.backgroundColor);

export class StorySlide extends Component {
    render() {
        const { className, step, index, total, nextSlide, lastSlide, link } = this.props;
        return (
            <div
                className={classnames(className, {
                    'swiper-slide': true,
                    'with-bottom-media': get(step, 'displayOptions.mediumPosition') === 'bottom',
                })}
                style={{ height: '100%' }}
                key={step.content}
            >
                <div className="story-step">
                    <StoryStep link={link} {...step} />
                </div>

                <div
                    className="bottom"
                    style={{
                        backgroundColor: colors[step.displayOptions.backgroundColor],
                        color: textColorForBackgroundColor(step.displayOptions.backgroundColor),
                    }}
                >
                    <div className="counter">
                        {index}/{total}
                    </div>

                    {index < total ? (
                        <div className="next-arrow" onClick={nextSlide}>
                            <RightArrow fill={rightArrowColor(step)} />
                        </div>
                    ) : (
                        <div className="next-arrow" onClick={lastSlide}>
                            <RightArrow fill={rightArrowColor(step)} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

StorySlide.propTypes = {
    className: PropTypes.string,
    step: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    nextSlide: PropTypes.func.isRequired,
    lastSlide: PropTypes.func.isRequired,
    link: LinkType,
};

export default glamorous(StorySlide)(styles);
