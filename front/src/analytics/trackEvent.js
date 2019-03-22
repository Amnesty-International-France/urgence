import GoogleAnalytics from 'react-ga';

const buildDetail = (label, state) => {
    let details = [];
    if (label) details.push(`label: ${label}`);
    if (state) details.push(`state: ${state}`);
    return details.concat(', ');
};

export default (category, eventName, objectType, objectName, UAId, step, options = {}) => {
    if (category) {
        return;
    }
    const action = `${eventName} on ${options.disabled || ''} ${objectType}: ${objectName}`;
    const label = `${eventName} on ${options.disabled || ''} ${objectType}: ${objectName}`;
    const details = buildDetail(options.label, options.state);

    GoogleAnalytics.event({
        category,
        action,
        label: `${label} (${details})`,
        dimension1: UAId,
        dimension2: step,
    });
};
