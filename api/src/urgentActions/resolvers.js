import {
    getUrgentAction,
    getUrgentActionBySlug,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
} from './repository';

import { uploadImageFromStory } from '../services/uploadImageFromStory';

const prepareUrgentActionForDatabase = async urgentAction => {
    const uploadedStory = await uploadImageFromStory(urgentAction.story);

    return {
        ...urgentAction,
        story: JSON.stringify(uploadedStory),
        end_of_story_link: JSON.stringify(urgentAction.end_of_story_link),
        message_template: JSON.stringify(urgentAction.message_template),
        message_link: JSON.stringify(urgentAction.message_link),
        email_thank: JSON.stringify(urgentAction.email_thank),
        letter_thank: JSON.stringify(urgentAction.letter_thank),
        call_to_action: JSON.stringify(urgentAction.call_to_action),
    };
};

export default {
    Query: {
        allUrgentActions: (_, { perPage, page, sortField, sortOrder }) =>
            getUrgentActions({ perPage, page, sortField, sortOrder }),
        UrgentAction: (_, { id }) => getUrgentAction(id),
        UrgentActionBySlug: (_, { slug }) => getUrgentActionBySlug(slug),
        _allUrgentActionsMeta: () => countUrgentActions(),
    },
    Mutation: {
        createUrgentAction: async (_, urgentAction) => {
            const preparedUa = await prepareUrgentActionForDatabase(urgentAction);
            return createUrgentAction(preparedUa);
        },
        updateUrgentAction: async (_, urgentAction) => {
            const preparedUa = await prepareUrgentActionForDatabase(urgentAction);
            return updateUrgentAction(urgentAction.id, preparedUa);
        },
        deleteUrgentAction: (_, id) => removeUrgentAction(id),
    },
};
