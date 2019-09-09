const query = require('../db/client');

import { createUrgentAction as insertUrgentAction } from '../urgentActions/repository';
import { createSetting as insertSetting } from '../settings/repository';

export const createUrgentAction = async ({ story, message_template, ...urgentAction } = {}) => {
    const defaultUrgentAction = {
        title: "Commutation of William Montgomery's sentence",
        slug: 'commutation-of-william-montgomerys-sentence',
        recipient: {},
        end_thank: {},
        register: {},
    };

    return insertUrgentAction({
        ...defaultUrgentAction,
        ...urgentAction,
        story: JSON.stringify(story),
        message_template: JSON.stringify(message_template),
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
