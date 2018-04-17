const { getUrgentAction, getUrgentActions } = require('./repository');

module.exports = {
    Query: {
        UrgentActions: () => getUrgentActions(),
        UrgentAction: (_, { id }) => getUrgentAction(id),
    },
};
