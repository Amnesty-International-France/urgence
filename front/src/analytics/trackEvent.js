import GoogleAnalytics from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

const buildDetail = (label, state) => {
    let details = [];
    if (label) details.push(`label: ${label}`);
    if (state) details.push(`state: ${state}`);
    return details.join(', ');
};

export default (category, eventName, objectType, objectName, slug, step, options = {}) => {
    if (!category) {
        return;
    }
    const action = `${eventName} on ${options.disabled || ''} ${objectType}: ${objectName}`;
    const label = `${eventName} on ${options.disabled || ''} ${objectType}: ${objectName}`;
    const details = buildDetail(options.label, options.state);

    GoogleAnalytics.event({
        category,
        action,
        label: `${label} (${details})`,
        dimension1: slug,
        dimension2: step,
    });

    ReactPixel.trackCustom(eventName, {
        category,
        objectType,
        objectName,
        slug,
        step,
        ...options,
    });
};
