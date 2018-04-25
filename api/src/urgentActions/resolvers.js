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
        createUrgentAction: (_, { story, ...data}) => createUrgentAction({
            ...data,
            story: JSON.stringify(story),
        }),
        updateUrgentAction: (_, { id, story, ...data }) => updateUrgentAction(id, {
            ...data,
            story: JSON.stringify(story),
        }),
        deleteUrgentAction: (_, id) => removeUrgentAction(id),
    },
};
