const uuidByString = require('uuid-by-string');

const query = require('../db/client');
const { insertUrgentAction } = require('../urgentActions/repository');

const createUrgentAction = async urgentAction => insertUrgentAction({
    title: "Commutation of William Montgomery's sentence",
    ...urgentAction,
    id: uuidByString(urgentAction.title || "Commutation of William Montgomery's sentence")
});

const truncateAll = async () => query('TRUNCATE urgent_action');

module.exports = {
    createUrgentAction,
    truncateAll,
};
