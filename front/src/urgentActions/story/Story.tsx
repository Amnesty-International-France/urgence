import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
// @ts-expect-error TS(6142): Module '../Act' was resolved to '/home/guillaume/d... Remove this comment to see the full error message
import Act from '../Act';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import ANALYTICS_CATEGORIES from '../../analytics/categories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { black, white, yellow } from '../../themes/colors';
// @ts-expect-error TS(6142): Module '../../themes/ThemeContext' was resolved to... Remove this comment to see the full error message
import { withThemeContext } from '../../themes/ThemeContext';
import { StoryStepPropType, paramsType } from '../../propTypes';

// @ts-expect-error TS(6142): Module '../../themes/Carousel' was resolved to '/h... Remove this comment to see the full error message
import Carousel from '../../themes/Carousel';
import generateUrl from '../../services/generateUrl';
// @ts-expect-error TS(6142): Module './StorySlide' was resolved to '/home/guill... Remove this comment to see the full error message
import StorySlide from './StorySlide';
// @ts-expect-error TS(6142): Module './StoryCover' was resolved to '/home/guill... Remove this comment to see the full error message
import StoryCover from './StoryCover';
// @ts-expect-error TS(6142): Module './StoryStep' was resolved to '/home/guilla... Remove this comment to see the full error message
import StoryStep from './StoryStep';
import { Navigate } from 'react-router';
// @ts-expect-error TS(6142): Module '../../withRouter' was resolved to '/home/g... Remove this comment to see the full error message
import withRouter from '../../withRouter';

const styles = {
    '& .icon': {
        cursor: 'pointer',
    },
};

export const getLogoColorForStoryStep = (step: any) =>
    step === 'story'
        ? { logoColor: black, logoBackgroundColor: yellow }
        : { logoColor: white, logoBackgroundColor: black };

type StoryProps = {
    className?: string;
    context: {
        changeLogoColor: (...args: any[]) => any;
    };
    story?: any[]; // TODO: PropTypes.shape(StoryStepPropType)
    navigate?: (...args: any[]) => any;
    // @ts-expect-error TS(2749): 'paramsType' refers to a value, but is being used ... Remove this comment to see the full error message
    params?: paramsType;
    callToAction?: any;
    responseCount?: number;
    auId?: string;
};
export class Story extends Component<StoryProps> {
    afterChange = (page: any) => {
        const {
            context,
            params: { slug, page: currentPage },
            navigate,
            story,
        } = this.props;

        if (page === +currentPage) {
            this.afterLastChange();
            return;
        }

        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        if (!story[page]) {
            return;
        }

        context.changeLogoColor(getLogoColorForStoryStep('story'));
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        navigate(generateUrl('story', { slug, page }));
    };

    afterLastChange = () => {
        const { context, params, navigate } = this.props;

        context.changeLogoColor(getLogoColorForStoryStep('act'));
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        navigate(generateUrl('act', params));
    };

    componentDidMount() {
        const {
            context,
            params: { step },
        } = this.props;

        context.changeLogoColor(getLogoColorForStoryStep(step));
    }

    render() {
        const {
            className,
            story,
            callToAction,
            responseCount,
            params: { page },
            auId,
        } = this.props;

        const total = story ? story.length : 0;
        const current = page != null ? parseInt(page, 10) : total;

        if (!story || story.length === 0 || current > total) {
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <Navigate to={generateUrl('error')} />;
        }

        const [cover, ...restStory] = story;

        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={className}>
                {total > 0 && (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Carousel
                        initialSlide={current}
                        current={current + 1}
                        total={total}
                        afterChange={this.afterChange}
                        afterLastChange={this.afterLastChange}
                    >
                        {() => (
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <Fragment>
                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <StorySlide step={cover}>
                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    {(storyCoverProps) => <StoryCover {...storyCoverProps} />}
                                </StorySlide>

                                {restStory.map((step, index) => (
                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                    <StorySlide key={index + 1} step={step}>
                                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                        {(storyStepProps) => <StoryStep {...storyStepProps} />}
                                    </StorySlide>
                                ))}

                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <StorySlide>
                                    {(storyProps) => (
                                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                        <Act
                                            {...storyProps}
                                            data={{
                                                ...callToAction,
                                                response_count: responseCount,
                                                auId,
                                            }}
                                            actions={() =>
                                                callToAction && callToAction.button ? (
                                                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

export const WithStylesStory = styled(Story)(styles);

export default compose(withThemeContext, withRouter)(WithStylesStory);
