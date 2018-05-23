import classnames from 'classnames';
import get from 'lodash.get';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
import { compose } from 'recompose';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import StoryStep, { getLogoColorForStep } from '../urgentActions/StoryStep';
import { StoryStepPropType, routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';
import { textColorForBackgroundColor, colors } from '../themes/colors';
import { RightArrow } from '../icons';
import { withThemeContext } from '../themes/ThemeContext';
import LoadingScreen from '../themes/LoadingScreen';

const styles = {
    '&': {
        height: '100vh',
    },

    '& .slick-slide > div': {
        display: 'flex',
        flexDirection: 'column',
    },

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

    '& .slide': {
        height: '100%',
        flexDirection: 'column',
        display: 'flex !important',
    },

    '& .bottom > *': {
        flex: '1 0 0',
    },

    '& .next-arrow': {
        position: 'relative',
        top: 4,
        textAlign: 'right',
    },

    '& .counter': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: 18,
        lineHeight: '22px',
    },
};

const rightArrowColor = step => textColorForBackgroundColor(step.displayOptions.backgroundColor);

export class Story extends Component {
    afterChange = page => {
        const {
            match: {
                params: { id, page: currentPage },
            },
            history,
            story,
        } = this.props;

        if (page === +currentPage) {
            return;
        }

        this.props.context.changeLogoColor(getLogoColorForStep(story[page]));
        history.push(generateUrl('story', { id, page }));
    };

    initSlider = slider => {
        this.slider = slider;
    };

    nextSlide = () => {
        this.slider.slickNext();
    };

    componentDidUpdate(prevProps) {
        const {
            story,
            match: {
                params: { page },
            },
        } = this.props;

        if ((!prevProps.story && story) || prevProps.match.params.page !== page) {
            this.props.context.changeLogoColor(getLogoColorForStep(story[page]));
        }
    }

    render() {
        const {
            className,
            loading,
            story,
            match: {
                params: { page },
            },
        } = this.props;

        return loading ? (
            <LoadingScreen />
        ) : (
            <Fragment>
                {(!story || !story.length) && (
                    <p className="error">Cette action urgente n&#39;existe plus.</p>
                )}

                {story &&
                    story.length > 0 && (
                        <Slider
                            className={className}
                            infinite={false}
                            afterChange={this.afterChange}
                            initialSlide={parseInt(page, 10)}
                            ref={this.initSlider}
                        >
                            {story.map((step, index) => (
                                <div
                                    className={classnames({
                                        slide: true,
                                        'with-bottom-media':
                                            get(step, 'displayOptions.mediumPosition') === 'bottom',
                                    })}
                                    key={step.content}
                                >
                                    <div className="story-step">
                                        <StoryStep
                                            {...step}
                                            hasActButton={index === story.length - 1}
                                        />
                                    </div>

                                    <div
                                        className="bottom"
                                        style={{
                                            backgroundColor:
                                                colors[step.displayOptions.backgroundColor],
                                            color: textColorForBackgroundColor(
                                                step.displayOptions.backgroundColor,
                                            ),
                                        }}
                                    >
                                        <div className="counter">
                                            {index + 1}/{story.length}
                                        </div>

                                        {index + 1 < story.length && (
                                            <div className="next-arrow">
                                                <RightArrow
                                                    onClick={this.nextSlide}
                                                    color={rightArrowColor(step)}
                                                    size={28}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
            </Fragment>
        );
    }
}

Story.propTypes = {
    className: PropTypes.string,
    context: PropTypes.shape({
        changeLogoColor: PropTypes.func.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    story: PropTypes.arrayOf(PropTypes.shape(StoryStepPropType)),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: routeMatch,
};

export const WithStylesStory = glamorous(Story)(styles);

export default compose(withRouter, withThemeContext)(WithStylesStory);
