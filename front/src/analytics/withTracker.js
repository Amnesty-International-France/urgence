import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
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
                    params: { id, step },
                },
            } = this.props;

            const page = pathname + search;
            trackPage(page, id, step);
        }

        componentDidUpdate(prevProps) {
            const {
                location: { pathname, search },
                match: {
                    params: { id, step },
                },
            } = this.props;

            const currentPage = prevProps.location.pathname + prevProps.location.search;
            const nextPage = pathname + search;

            if (currentPage !== nextPage) {
                trackPage(nextPage, id, step);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
};

export default withTracker;
