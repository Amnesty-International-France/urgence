import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import Act from '../Act';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import ANALYTICS_CATEGORIES from '../../analytics/categories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { black, white, yellow } from '../../themes/colors';
import { withThemeContext } from '../../themes/ThemeContext';
import { StoryStepPropType, routeMatch } from '../../propTypes';

import Carousel from '../../themes/Carousel';
import generateUrl from '../../services/generateUrl';
import StorySlide from './StorySlide';
import StoryCover from './StoryCover';
import StoryStep from './StoryStep';

const styles = {
    '& .icon': {
        cursor: 'pointer',
    },
};

export const getLogoColorForStoryStep = step =>
    step === 'story'
        ? { logoColor: black, logoBackgroundColor: yellow }
        : { logoColor: white, logoBackgroundColor: black };
export class Story extends Component {
    afterChange = page => {
        const {
            context,
            match: {
                params: { slug, page: currentPage },
            },
            history,
            story,
        } = this.props;

        if (page === +currentPage) {
            this.afterLastChange();
            return;
        }

        if (!story[page]) {
            return;
        }

        context.changeLogoColor(getLogoColorForStoryStep('story'));
        history.push(generateUrl('story', { slug, page }));
    };

    afterLastChange = () => {
        const {
            context,
            match: { params },
            history,
        } = this.props;

        context.changeLogoColor(getLogoColorForStoryStep('act'));
        history.push(generateUrl('act', params));
    };

    componentDidMount() {
        const {
            context,
            match: {
                params: { step },
            },
        } = this.props;

        context.changeLogoColor(getLogoColorForStoryStep(step));
    }

    render() {
        const {
            className,
            story,
            callToAction,
            responseCount,
            match: {
                params: { page },
            },
            auId,
        } = this.props;

        const total = story ? story.length : 0;
        const current = page != null ? parseInt(page, 10) : total;

        if (!story || story.length === 0 || current > total) {
            return <Redirect to={generateUrl('error')} />;
        }

        const [cover, ...restStory] = story;

        return (
            <div className={className}>
                {total > 0 && (
                    <Carousel
                        initialSlide={current}
                        current={current + 1}
                        total={total}
                        afterChange={this.afterChange}
                        afterLastChange={this.afterLastChange}
                    >
                        {() => (
                            <Fragment>
                                <StorySlide step={cover}>
                                    {storyCoverProps => <StoryCover {...storyCoverProps} />}
                                </StorySlide>

                                {restStory.map((step, index) => (
                                    <StorySlide key={index + 1} step={step}>
                                        {storyStepProps => <StoryStep {...storyStepProps} />}
                                    </StorySlide>
                                ))}

                                <StorySlide>
                                    {storyProps => (
                                        <Act
                                            {...storyProps}
                                            data={{
                                                ...callToAction,
                                                response_count: responseCount,
                                                auId
                                            }}
                                            actions={() =>
                                                callToAction && callToAction.button ? (
                                                    <ToUrgentActionPageLink
                                                        label={callToAction.button}
                                                        step="act"
                                                        pageName="message-view"
                                                        analyticsCategory={ANALYTICS_CATEGORIES.ACT}
                                                        buttonName="OpenMessageView"
                                                    />
                                                ) : null
                                            }
                                        />
                                    )}
                                </StorySlide>
                            </Fragment>
                        )}
                    </Carousel>
                )}
            </div>
        );
    }
}

Story.propTypes = {
    className: PropTypes.string,
    context: PropTypes.shape({
        changeLogoColor: PropTypes.func.isRequired,
    }).isRequired,
    story: PropTypes.arrayOf(PropTypes.shape(StoryStepPropType)),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: routeMatch,
    callToAction: PropTypes.object,
    responseCount: PropTypes.number,
    auId: PropTypes.number,
};

export const WithStylesStory = glamorous(Story)(styles);

export default compose(withRouter, withThemeContext)(WithStylesStory);
