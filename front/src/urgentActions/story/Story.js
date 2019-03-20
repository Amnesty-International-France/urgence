import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { black, white } from '../../themes/colors';
import { withThemeContext } from '../../themes/ThemeContext';
import Carousel from '../../themes/Carousel';
import { StoryStepPropType, routeMatch, LinkType } from '../../propTypes';
import generateUrl from '../../services/generateUrl';
import RightArrow from '../../icons/RightArrow';

import StorySlide from './StorySlide';
import StoryCover from './StoryCover';
import StoryStep, { getLogoColorForStep } from './StoryStep';

const styles = {
    backgroundColor: white,
    height: '100%',
    '& .icon': {
        cursor: 'pointer',
    },
};

export class Story extends Component {
    afterChange = page => {
        const {
            context,
            match: {
                params: { id, page: currentPage },
            },
            history,
            story,
        } = this.props;

        if (page === +currentPage) {
            this.afterLastChange();
            return;
        }

        context.changeLogoColor(getLogoColorForStep(story[page]));
        history.push(generateUrl('story', { id, page }));
    };

    afterLastChange = () => {
        const {
            match: { params },
            history,
        } = this.props;

        history.push(generateUrl('act', params));
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
            story,
            endStoryLink,
            match: {
                params: { page },
            },
        } = this.props;

        const total = story ? story.length : 0;
        const current = parseInt(page, 10);
        const [cover, ...restStory] = story;

        return (
            <div
                className={classnames(className)}
                style={{
                    ...(current === 0 &&
                        cover.medium &&
                        cover.medium.src && {
                            backgroundImage: `url(${cover.medium.src})`,
                            backgroundPosition: 'top',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }),
                }}
            >
                {(!story || !story.length) && (
                    <p className="error">Cette action urgente n&#39;existe plus.</p>
                )}

                {total > 0 && (
                    <Carousel
                        initialSlide={current}
                        current={current + 1}
                        total={total + 1}
                        afterChange={this.afterChange}
                        afterLastChange={this.afterLastChange}
                        icon={<RightArrow className="icon" fill={current === 0 ? white : black} />}
                    >
                        {() => (
                            <Fragment>
                                <StorySlide step={cover} total={total} index={0}>
                                    {storyCoverProps => <StoryCover {...storyCoverProps} />}
                                </StorySlide>
                                {restStory.map((step, index) => (
                                    <StorySlide
                                        key={step.content}
                                        step={step}
                                        total={total}
                                        index={index + 1}
                                    >
                                        {storyStepProps => (
                                            <StoryStep
                                                {...storyStepProps}
                                                link={total === index + 1 ? endStoryLink : null}
                                            />
                                        )}
                                    </StorySlide>
                                ))}
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
    endStoryLink: LinkType,
    story: PropTypes.arrayOf(PropTypes.shape(StoryStepPropType)),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: routeMatch,
};

export const WithStylesStory = glamorous(Story)(styles);

export default compose(
    withRouter,
    withThemeContext,
)(WithStylesStory);
