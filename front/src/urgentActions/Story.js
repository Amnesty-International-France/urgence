import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { withRouter } from 'react-router';

import Carousel from '../themes/Carousel';
import StoryStep from '../urgentActions/StoryStep';
import { StoryStepPropType, routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

export class Story extends Component {
    afterChange = page => {
        const {
            match: {
                params: { id, page: currentPage },
            },
            history,
        } = this.props;

        if (page.toString() === currentPage) {
            return;
        }
        history.push(generateUrl('story', { id, page }));
    };

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
            <p className="loading">Loading...</p>
        ) : (
            <Fragment>
                {(!story || !story.length) && (
                    <p className="error">
                        Cette action urgent n&#39;existe plus.
                    </p>
                )}

                {story &&
                    story.length > 0 && (
                        <Carousel
                            initialSlide={page}
                            className={className}
                            afterChange={this.afterChange}
                        >
                            {story.map((step, index) => (
                                <StoryStep
                                    key={step.content}
                                    {...step}
                                    hasActButton={index === story.length - 1}
                                />
                            ))}
                        </Carousel>
                    )}
            </Fragment>
        );
    }
}

Story.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    story: PropTypes.arrayOf(PropTypes.shape(StoryStepPropType)),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: routeMatch,
};

export default withRouter(
    glamorous(Story)({
        height: '100vh',
    }),
);
