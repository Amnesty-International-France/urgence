import GraphQLJSON from 'graphql-type-json';

import {
    getUrgentAction,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction
} from "./repository";

export const UrgentActionsResolver = {
    Query: {
        allUrgentActions: (_, { perPage, page, sortField, sortOrder }) => getUrgentActions({ perPage, page, sortField, sortOrder }),
        UrgentAction: (_, { id }) => getUrgentAction(id),
        _allUrgentActionsMeta: () => countUrgentActions()
    },
    Mutation: {
        createUrgentAction: (_, data) => createUrgentAction(data),
        updateUrgentAction: (_, { id, ...data }) => updateUrgentAction(id, data),
        deleteUrgentAction: (_, id) => removeUrgentAction(id),
    },
    JSON: GraphQLJSON,
};
