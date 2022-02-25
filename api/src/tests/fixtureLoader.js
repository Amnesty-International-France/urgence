const query = require('../db/client');

import { createUrgentAction as insertUrgentAction } from '../urgentActions/repository';
import { createSetting as insertSetting } from '../settings/repository';

export const createUrgentAction = async ({ story, message, ...urgentAction } = {}) => {
    const defaultUrgentAction = {
        title: "Commutation of William Montgomery's sentence",
        slug: 'commutation-of-william-montgomerys-sentence',
        story: [],
        call_to_action: {},
        message: {
            message_template: [],
        },
        email_thank: {},
        register: {},
        end_thank: {},
        social_metadata: {},
    };

    return insertUrgentAction({
        ...defaultUrgentAction,
        ...urgentAction,
        story: JSON.stringify(story),
        message: JSON.stringify(message),
    });
};

export const createSetting = async setting => {
    const defaultSetting = {
        type: 'my-type',
        content: '',
    };

    return insertSetting({
        ...defaultSetting,
        ...setting,
    });
};

export const truncateAll = async () => {
    await query('TRUNCATE urgent_action');
    await query('TRUNCATE settings');
};
