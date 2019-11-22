import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Act from '../Act';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import ANALYTICS_CATEGORIES from '../../analytics/categories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { black } from '../../themes/colors';
import { withThemeContext } from '../../themes/ThemeContext';
import Carousel from '../../themes/Carousel';
import { StoryStepPropType, routeMatch } from '../../propTypes';
import generateUrl from '../../services/generateUrl';

import StorySlide from './StorySlide';
import StoryCover from './StoryCover';
import StoryStep from './StoryStep';

const styles = {
    '& .icon': {
        cursor: 'pointer',
    },
};

export class Story extends Component {
    afterChange = page => {
        const {
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

        history.push(generateUrl('story', { slug, page }));
    };

    afterLastChange = () => {
        const {
            match: { params },
            history,
        } = this.props;

        history.push(generateUrl('act', params));
    };

    render() {
        const {
            className,
            story,
            match: {
                params: { page },
            },
            callToAction,
        } = this.props;

        const total = story ? story.length : 0;
        const current = page ? parseInt(page, 10) : total;

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
                        icon={
                            <FontAwesomeIcon icon={faArrowRight} color={black} className="icon" />
                        }
                    >
                        {() => (
                            <Fragment>
                                <StorySlide step={cover}>
                                    {storyCoverProps => (
                                        <StoryCover {...storyCoverProps} step={cover} />
                                    )}
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
                                            data={callToAction}
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
};

export const WithStylesStory = glamorous(Story)(styles);

export default compose(withRouter, withThemeContext)(WithStylesStory);
