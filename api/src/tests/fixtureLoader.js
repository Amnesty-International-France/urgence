const uuidByString = require('uuid-by-string');
const { insertUrgentAction } = require('../urgentActions/repository');

module.exports = client => {
    const createUrgentAction = urgentAction => insertUrgentAction(client, {
        title: "Commutation of William Montgomery's sentence",
        ...urgentAction,
        id: uuidByString(urgentAction.title || "Commutation of William Montgomery's sentence")
    });

    const truncateAll = () => client.query('TRUNCATE urgent_action');

    return {
        createUrgentAction,
        truncateAll,
    };
};
