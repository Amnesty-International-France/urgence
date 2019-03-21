import GoogleAnalytics from 'react-ga';

export default (category, eventName, objectType, objectName, UAId, step, options = {}) => {
    if (category) {
        return;
    }
    const action = `${eventName} on ${options.disabled || ''} ${objectType}: ${objectName}`;
    const label = `${eventName} on ${options.disabled || ''} ${objectType}: ${objectName}`;
    const details = `label: ${options.label || '-'}, state: ${options.state ||
        '-'}, value: ${options.value || '-'}`;

    GoogleAnalytics.event({
        category,
        action,
        label: `${label} (${details})`,
        dimension1: UAId,
        dimension2: step,
    });
};
