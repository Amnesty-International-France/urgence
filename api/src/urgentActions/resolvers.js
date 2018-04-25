import { path, assocPath } from 'ramda';

import {
    getUrgentAction,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction
} from "./repository";
import uploadImageFromStory from '../services/uploadImageFromStory';



export const UrgentActionsResolver = {
    Query: {
        allUrgentActions: (_, { perPage, page, sortField, sortOrder }) => getUrgentActions({ perPage, page, sortField, sortOrder }),
        UrgentAction: (_, { id }) => getUrgentAction(id),
        _allUrgentActionsMeta: () => countUrgentActions()
    },
    Mutation: {
        createUrgentAction: async (_, { story, ...data}) => {
            const uploadedStory = await uploadImageFromStory(story);

            return createUrgentAction({
                ...data,
                story: JSON.stringify(uploadedStory),
            });
        },
        updateUrgentAction: async (_, { id, story, ...data }) => {
            const uploadedStory = await uploadImageFromStory(story);

            return updateUrgentAction(id, {
                ...data,
                story: JSON.stringify(uploadedStory),
            });
        },
        deleteUrgentAction: (_, id) => removeUrgentAction(id),
    },
};
