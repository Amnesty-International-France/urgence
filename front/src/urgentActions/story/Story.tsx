import styled from '@emotion/styled';
import { Component } from 'react';
import { compose } from 'recompose';
import ANALYTICS_CATEGORIES from '../../analytics/categories';
import Act from '../Act';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { black, white, yellow } from '../../themes/colors';
import { withThemeContext } from '../../themes/ThemeContext';

import { Navigate, NavigateFunction } from 'react-router';
import { SwiperSlide } from 'swiper/react';
import generateUrl from '../../services/generateUrl';
import Carousel from '../../themes/Carousel';
import withRouter from '../../withRouter';
import StoryCover from './StoryCover';
import StorySlide from './StorySlide';
import StoryStep from './StoryStep';
import { paramsType } from '../../propTypes';

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
    navigate: NavigateFunction;
    params?: any;
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
                        <SwiperSlide>
                            <StorySlide step={cover}>
                                {(storyCoverProps) => <StoryCover {...storyCoverProps} />}
                            </StorySlide>
                        </SwiperSlide>
                        {restStory.map((step, index) => (
                            <SwiperSlide key={index + 1}>
                                <StorySlide step={step}>
                                    {(storyStepProps) => <StoryStep {...storyStepProps} />}
                                </StorySlide>
                            </SwiperSlide>
                        ))}

                        <SwiperSlide>
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
                        </SwiperSlide>
                    </Carousel>
                )}
            </div>
        );
    }
}

export const WithStylesStory = styled(Story)(styles);

// @ts-ignore guillaumep
export default compose(withThemeContext, withRouter)(WithStylesStory);
