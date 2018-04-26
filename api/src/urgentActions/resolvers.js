import { path, assocPath } from 'ramda';

import {
    getUrgentAction,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction
} from "./repository";

import { uploadImageFromStory } from '../services/uploadImageFromStory';

export const UrgentActionsResolver = {
    Query: {
        allUrgentActions: (_, { perPage, page, sortField, sortOrder }) => getUrgentActions({ perPage, page, sortField, sortOrder }),
        UrgentAction: (_, { id }) => getUrgentAction(id),
        _allUrgentActionsMeta: () => countUrgentActions()
    },
    Mutation: {
        createUrgentAction: async (_, { story, message_template, ...data}) => {
            const uploadedStory = await uploadImageFromStory(story);

            return createUrgentAction({
                ...data,
                story: JSON.stringify(uploadedStory),
                message_template: JSON.stringify(message_template),
            });
        },
        updateUrgentAction: async (_, { id, story, message_template, ...data }) => {
            const uploadedStory = await uploadImageFromStory(story);

            return updateUrgentAction(id, {
                ...data,
                story: JSON.stringify(uploadedStory),
                message_template: JSON.stringify(message_template),
            });
        },
        deleteUrgentAction: (_, id) => removeUrgentAction(id),
    },
};
