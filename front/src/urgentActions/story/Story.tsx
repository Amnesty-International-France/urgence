import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import Act from '../Act';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import ANALYTICS_CATEGORIES from '../../analytics/categories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { black, white, yellow } from '../../themes/colors';
import { withThemeContext } from '../../themes/ThemeContext';
import { StoryStepPropType, paramsType } from '../../propTypes';

import Carousel from '../../themes/Carousel';
import generateUrl from '../../services/generateUrl';
import StorySlide from './StorySlide';
import StoryCover from './StoryCover';
import StoryStep from './StoryStep';
import { Navigate } from 'react-router';
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
            return <Navigate to={generateUrl('error')} />;
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
                                    {(storyCoverProps) => <StoryCover {...storyCoverProps} />}
                                </StorySlide>

                                {restStory.map((step, index) => (
                                    <StorySlide key={index + 1} step={step}>
                                        {(storyStepProps) => <StoryStep {...storyStepProps} />}
                                    </StorySlide>
                                ))}

                                <StorySlide>
                                    {(storyProps) => (
                                        <Act
                                            {...storyProps}
                                            data={{
                                                ...callToAction,
                                                response_count: responseCount,
                                                auId,
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

export const WithStylesStory = styled(Story)(styles);

export default compose(withThemeContext, withRouter)(WithStylesStory);
