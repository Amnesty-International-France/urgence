import { ElementType } from 'react';
// // import ReactPixel from 'react-facebook-pixel';
// import GoogleAnalytics from 'react-ga';
// import { useLocation, useParams, useEffect } from 'react-router';

export type AnalyticsProps = {
    WrappedComponent: ElementType;
    options?: any;
};

// https://github.com/zsajjad/react-facebook-pixel/issues/65

export const Analytics = ({ WrappedComponent, options = {} }: AnalyticsProps) => {
    // const location = useLocation();
    // const params = useParams();

    // useEffect(() => {
    //     import('react-facebook-pixel')
    //       .then(module => module.default)
    //       .then(ReactPixel => {
    //         ReactPixel.init('your-pixel-code)
    //         ReactPixel.pageView()
    //       })
    //   }, []
    // const trackPage = (page: any, AURef: any, step: any) => {
    //     GoogleAnalytics.set({
    //         page,
    //         dimension1: AURef,
    //         dimension2: step,
    //         ...options,
    //     });
    //     GoogleAnalytics.pageview(page, [], step);

    //     // ReactPixel.track('PageView', {
    //     //     page,
    //     //     dimension1: AURef,
    //     //     dimension2: step,
    //     //     ...options,
    //     // });
    // };
    // const pageUrl = location.pathname + location.search;
    // trackPage(pageUrl, params.slug, params.step);
    // return <WrappedComponent trackPage={trackPage} />;
    const trackPage = () => true;
    return <WrappedComponent trackPage={trackPage} />;
};
export default Analytics;
