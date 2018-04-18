const { getUrgentAction, getUrgentActions, countUrgentActions } = require('./repository');

module.exports = {
    Query: {
        allUrgentActions: () => getUrgentActions(),
        UrgentAction: (_, { id }) => getUrgentAction(id),
        _allUrgentActionsMeta: () => countUrgentActions()
    },
};
