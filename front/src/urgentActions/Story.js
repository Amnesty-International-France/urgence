import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Carousel from '../themes/Carousel';
import StoryStep from '../urgentActions/StoryStep';
import { StoryStepPropType } from '../propTypes';

export const Story = ({ className, loading, story }) =>
    loading ? (
        <p className="loading">Loading...</p>
    ) : (
        <Fragment>
            {(!story || !story.length) && (
                <p className="error">
                    This urgent action does not exist anymore.
                </p>
            )}

            {story &&
                story.length > 0 && (
                    <Carousel className={className}>
                        {story.map((step, index) => (
                            <StoryStep
                                key={step.content}
                                {...step}
                                last={index === story.length - 1}
                            />
                        ))}
                    </Carousel>
                )}
        </Fragment>
    );

Story.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    story: PropTypes.arrayOf(PropTypes.shape(StoryStepPropType)),
};

export default glamorous(Story)({
    height: '100vh',
});
