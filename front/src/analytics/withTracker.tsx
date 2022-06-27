import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import PropTypes from 'prop-types';

const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = (page, AURef, step) => {
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

    const HOC = class extends Component {
        static propTypes = {
            location: PropTypes.object,
            match: PropTypes.object,
        };

        componentDidMount() {
            const {
                location: { pathname, search },
                match: {
                    params: { slug, step, page },
                },
            } = this.props;

            const pageUrl = pathname + search;
            trackPage(pageUrl, slug, `${step}${page ? page : ''}`);
        }

        componentDidUpdate(prevProps) {
            const {
                location: { pathname, search },
                match: {
                    params: { slug, step, page },
                },
            } = this.props;

            const currentPageUrl = prevProps.location.pathname + prevProps.location.search;
            const nextPageUrl = pathname + search;

            if (currentPageUrl !== nextPageUrl) {
                trackPage(nextPageUrl, slug, `${step}${page ? page : ''}`);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
};

export default withTracker);
