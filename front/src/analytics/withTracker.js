import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';

const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = page => {
        GoogleAnalytics.set({
            page,
            ...options,
        });
        GoogleAnalytics.pageview(page);
    };

    // eslint-disable-next-line
    const HOC = class extends Component {
        componentDidMount() {
            // eslint-disable-next-line
            const page = this.props.location.pathname + this.props.location.search;
            trackPage(page);
        }

        componentDidUpdate(prevProps) {
            const currentPage = prevProps.location.pathname + prevProps.location.search;
            const nextPage = this.props.location.pathname + this.props.location.search;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
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
