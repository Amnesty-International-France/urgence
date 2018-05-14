const uuidByString = require('uuid-by-string');

const query = require('../db/client');

import { createUrgentAction as insertUrgentAction } from '../urgentActions/repository';

const createUrgentAction = async ({ story, message_template, ...urgentAction } = {}) => {
    const defaultUrgentAction = {
        title: "Commutation of William Montgomery's sentence",
    };
    return insertUrgentAction({
        ...defaultUrgentAction,
        ...urgentAction,
        story: JSON.stringify(story),
        message_template: JSON.stringify(message_template),
    });
};

const truncateAll = async () => query('TRUNCATE urgent_action');

export default {
    createUrgentAction,
    truncateAll,
};
