import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Paper from '@material-ui/core/Paper';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { black, white } from '../../themes/colors';
import { withThemeContext } from '../../themes/ThemeContext';
import Carousel from '../../themes/Carousel';
import { StoryStepPropType, routeMatch } from '../../propTypes';
import generateUrl from '../../services/generateUrl';

import StorySlide from './StorySlide';
import StorySlidePlaceholder from './StorySlidePlaceholder';
import StoryCover from './StoryCover';
import StoryStep, { getLogoColorForStep } from './StoryStep';

const styles = {
    height: '80vh',
    '& .icon': {
        cursor: 'pointer',
    },
};

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
        context.changeLogoColor(getLogoColorForStep(story[page]));
        history.push(generateUrl('story', { slug, page }));
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
            context,
        } = this.props;

        if (!story[page]) {
            return;
        }

        if ((!prevProps.story && story) || prevProps.match.params.page !== page) {
            context.changeLogoColor(getLogoColorForStep(story[page]));
        }
    }

    render() {
        const {
            className,
            story,
            match: {
                params: { page },
            },
        } = this.props;

        const total = story ? story.length : 0;
        const current = parseInt(page, 10);

        if (!story || story.length === 0 || current > total - 1) {
            return <Redirect to={generateUrl('error')} />;
        }

        const [cover, ...restStory] = story;

        return (
            <Paper className={className} elevation={4}>
                {total > 0 && (
                    <Carousel
                        initialSlide={current}
                        current={current + 1}
                        total={total}
                        afterChange={this.afterChange}
                        afterLastChange={this.afterLastChange}
                        icon={
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                color={current === 0 ? white : black}
                                className="icon"
                            />
                        }
                    >
                        {() => (
                            <Fragment>
                                <StorySlide index={0} step={cover}>
                                    {storyCoverProps => <StoryCover {...storyCoverProps} />}
                                </StorySlide>
                                {restStory.map((step, index) => (
                                    <StorySlide key={index + 1} index={index + 1} step={step}>
                                        {storyStepProps => <StoryStep {...storyStepProps} />}
                                    </StorySlide>
                                ))}
                                <StorySlidePlaceholder />
                            </Fragment>
                        )}
                    </Carousel>
                )}
            </Paper>
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
};

export const WithStylesStory = glamorous(Story)(styles);

export default compose(withRouter, withThemeContext)(WithStylesStory);
