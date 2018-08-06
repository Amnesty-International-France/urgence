import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getLogoColorForStep } from '../urgentActions/StoryStep';
import { StoryStepPropType, routeMatch, LinkType } from '../propTypes';
import generateUrl from '../services/generateUrl';
import { withThemeContext } from '../themes/ThemeContext';
import Carousel from '../themes/Carousel';
import StorySlide from './StorySlide';

const styles = {
    height: '100%',
};

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

        return (
            <div className={className}>
                {(!story || !story.length) && (
                    <p className="error">Cette action urgente n&#39;existe plus.</p>
                )}

                {story &&
                    story.length > 0 && (
                        <Carousel initialSlide={parseInt(page, 10)} afterChange={this.afterChange}>
                            {({ nextSlide }) =>
                                story.map((step, index) => (
                                    <StorySlide
                                        key={step.content}
                                        step={step}
                                        total={story.length}
                                        index={index + 1}
                                        nextSlide={nextSlide}
                                        link={story.length === index + 1 ? endStoryLink : null}
                                    />
                                ))
                            }
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
