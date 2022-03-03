import {
    getUrgentAction,
    getUrgentActionBySlug,
    getDefaultUrgentAction,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
} from './repository';
import { addCampaignMember, addCampaignMemberTwitter, registerContact } from './campaignMember';

import { uploadImageFromStory } from '../services/uploadImageFromStory';
import { getOriginCodeByCampaignCode, authenticate } from '../services/salesForceApi';
import { uploadImageDesktopFromStory } from '../services/uploadImageDesktopFromStory';
import { uploadImageFromSocialMetadata } from '../services/uploadImageFromSocialMetadata';

const prepareUrgentActionForDatabase = async urgentAction => {
    let uploadedStory = await uploadImageFromStory(urgentAction.story);
    uploadedStory = await uploadImageDesktopFromStory(uploadedStory);
    const uploadedSocialMetadata = await uploadImageFromSocialMetadata(
        urgentAction.social_metadata,
    );
    const { body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;
    let originCode;
    try {
        originCode = await getOriginCodeByCampaignCode(accessToken, urgentAction.campaign_code);
    } catch (error) {
        originCode = 'AU_WEBAPP';
    }

    return {
        ...urgentAction,
        story: JSON.stringify(uploadedStory),
        origin_code: originCode,
        message: JSON.stringify(urgentAction.message),
        email_thank: JSON.stringify(urgentAction.email_thank),
        end_thank: JSON.stringify(urgentAction.end_thank),
        call_to_action: JSON.stringify(urgentAction.call_to_action),
        register: JSON.stringify(urgentAction.register),
        social_metadata: JSON.stringify(uploadedSocialMetadata),
    };
};

export default {
    Query: {
        allUrgentActions: (_, { perPage, page, sortField, sortOrder }) =>
            getUrgentActions({ perPage, page, sortField, sortOrder }),
        UrgentAction: (_, { id }) => getUrgentAction(id),
        UrgentActionBySlug: (_, { slug }) => getUrgentActionBySlug(slug),
        DefaultUrgentAction: () => getDefaultUrgentAction(),
        _allUrgentActionsMeta: () => countUrgentActions(),
    },
    Mutation: {
        createUrgentAction: async (_, urgentAction, context) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            const preparedUa = await prepareUrgentActionForDatabase(urgentAction);
            return createUrgentAction(preparedUa);
        },
        updateUrgentAction: async (_, urgentAction, context) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            const preparedUa = await prepareUrgentActionForDatabase(urgentAction);
            return updateUrgentAction(urgentAction.id, preparedUa);
        },
        deleteUrgentAction: (_, id, context) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return removeUrgentAction(id);
        },
        addCampaignMember: (_, { id, member }) => {
            return addCampaignMember(id, member);
        },
        addCampaignMemberTwitter: (_, { id }) => {
            return addCampaignMemberTwitter(id);
        },
        registerContact: (_, { id, member }) => {
            return registerContact(id, member);
        },
        addResponseCount: async (_, { id }) => {
            const urgentAction = await getUrgentAction(id);
            const response_count = urgentAction.response_count + 1;
            return updateUrgentAction(urgentAction.id, { response_count });
        },
    },
};
