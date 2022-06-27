import GoogleAnalytics from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

const buildDetail = (label: any, state: any) => {
    let details = [];
    if (label) details.push(`label: ${label}`);
    if (state) details.push(`state: ${state}`);
    return details.join(', ');
};

export default (
    category: any,
    eventName: any,
    objectType: any,
    objectName: any,
    slug: any,
    step: any,
    options = {},
) => {
    if (!category) {
        return;
    }
    const action = `${eventName} on ${
        (options as any).disabled || ''
    } ${objectType}: ${objectName}`;
    const label = `${eventName} on ${(options as any).disabled || ''} ${objectType}: ${objectName}`;
    const details = buildDetail((options as any).label, (options as any).state);

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
