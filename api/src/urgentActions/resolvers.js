import { path, assocPath } from 'ramda';

import {
    getUrgentAction,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction
} from "./repository";
import uploadImage from '../services/uploadImage';


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
        updateUrgentAction: async (_, { id, story, ...data }) => {
            console.log(story[0].medium);
            const images = story.map((storyStep) => path(['medium', 'src'], storyStep));
            const srcs = await Promise.all(images.map(uploadImage));
            const uploadedStory = story.map((storyStep, index) => assocPath(['medium', 'src'], srcs[index], storyStep));
            return updateUrgentAction(id, {
                ...data,
                story: JSON.stringify(uploadedStory),
            });
        },
        deleteUrgentAction: (_, id) => removeUrgentAction(id),
    },
};
