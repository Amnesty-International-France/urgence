import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = (page, AURef, step) => {
        GoogleAnalytics.set({
            page,
            AURef,
            step,
            ...options,
        });
        GoogleAnalytics.pageview(page, [], step);
    };

    // eslint-disable-next-line
    const HOC = class extends Component {
        componentDidMount() {
            // eslint-disable-next-line
            const page = this.props.location.pathname + this.props.location.search;
            trackPage(page, this.props.match.params.id, this.props.match.params.step);
        }

        componentDidUpdate(prevProps) {
            const currentPage = prevProps.location.pathname + prevProps.location.search;
            const nextPage = this.props.location.pathname + this.props.location.search;

            if (currentPage !== nextPage) {
                trackPage(nextPage, this.props.match.params.id, this.props.match.params.step);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
};

export const trackEvent = (analyticsCategory, eventName, objectType, objectName, options = {}) => {
    if (analyticsCategory) {
        GoogleAnalytics.event({
            category: analyticsCategory,
            action: `${eventName} on ${
                options.disabled ? options.disabled : ''
            } ${objectType}: ${objectName}`,
            label: `${eventName} on ${
                options.disabled ? options.disabled : ''
            } ${objectType}: ${objectName} (label: ${options.label ? options.label : '-'}, state: ${
                options.state ? options.state : '-'
            }, value: ${options.value ? options.value : '-'})`,
        });
    }
};

export default withTracker;
