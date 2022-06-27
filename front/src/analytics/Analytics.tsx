import { ElementType } from 'react';
import ReactPixel from 'react-facebook-pixel';
import GoogleAnalytics from 'react-ga';
import { useLocation, useParams } from 'react-router';

export type AnalyticsProps = {
    WrappedComponent: ElementType;
    options?: any;
};

export const Analytics = ({ WrappedComponent, options = {} }: AnalyticsProps) => {
    const location = useLocation();
    const params = useParams();
    const trackPage = (page: any, AURef: any, step: any) => {
        GoogleAnalytics.set({
            page,
            dimension1: AURef,
            dimension2: step,
            ...options,
        });
        GoogleAnalytics.pageview(page, [], step);

        ReactPixel.track('PageView', {
            page,
            dimension1: AURef,
            dimension2: step,
            ...options,
        });
    };
    const pageUrl = location.pathname + location.search;
    trackPage(pageUrl, params.slug, params.step);
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <WrappedComponent trackPage={trackPage} />;
};
export default Analytics;
