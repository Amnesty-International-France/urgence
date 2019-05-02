const query = require('../db/client');

import { createUrgentAction as insertUrgentAction } from '../urgentActions/repository';

export const createUrgentAction = async ({ story, message_template, ...urgentAction } = {}) => {
    const defaultUrgentAction = {
        title: "Commutation of William Montgomery's sentence",
        slug: 'commutation-of-william-montgomerys-sentence',
        recipient: {},
        letter_thank: {},
    };

    return insertUrgentAction({
        ...defaultUrgentAction,
        ...urgentAction,
        story: JSON.stringify(story),
        message_template: JSON.stringify(message_template),
    });
};

export const truncateAll = async () => query('TRUNCATE urgent_action');
