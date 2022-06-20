import {
    addCampaignMember,
    addCampaignMemberTwitter,
    CampaignMember,
    registerContact,
} from './campaignMember';
import {
    countUrgentActions,
    createUrgentAction,
    getDefaultUrgentAction,
    getUrgentAction,
    getUrgentActionBySlug,
    getUrgentActions,
    removeUrgentAction,
    updateUrgentAction,
    UrgentAction,
    UrgentActionDb,
} from './repository';

import { Context } from 'apollo-server-core';
import { authenticate, getOriginCodeByCampaignCode } from '../services/salesForceApi';
import { uploadImageDesktopFromStory } from '../services/uploadImageDesktopFromStory';
import { uploadImageFromSocialMetadata } from '../services/uploadImageFromSocialMetadata';
import { uploadImageFromStory } from '../services/uploadImageFromStory';
import { AuthenticatedUser } from '../users/resolvers';

const prepareUrgentActionForDatabase = async (
    urgentAction: UrgentAction,
): Promise<UrgentActionDb> => {
    let uploadedStory = await uploadImageFromStory(urgentAction.story);
    uploadedStory = await uploadImageDesktopFromStory(uploadedStory);
    const uploadedSocialMetadata = await uploadImageFromSocialMetadata(
        urgentAction.social_metadata,
    );
    let originCode;
    try {
        const { body: authBody } = await authenticate();
        const accessToken = authBody ? authBody.access_token : null;

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
        allUrgentActions: (
            _: null,
            {
                perPage,
                page,
                sortField,
                sortOrder,
            }: {
                perPage: number;
                page: number;
                sortField: string;
                sortOrder: 'ASC' | 'DESC';
            },
        ) => getUrgentActions({ perPage, page, sortField, sortOrder }),
        UrgentAction: (_: null, { id }: { id: string }) => getUrgentAction(id),
        UrgentActionBySlug: (_: null, { slug }: { slug: string }) => getUrgentActionBySlug(slug),
        DefaultUrgentAction: () => getDefaultUrgentAction(),
        _allUrgentActionsMeta: () => countUrgentActions(),
    },
    Mutation: {
        createUrgentAction: async (
            _: null,
            urgentAction: UrgentAction,
            context?: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            const preparedUa = await prepareUrgentActionForDatabase(urgentAction);
            return createUrgentAction(preparedUa);
        },
        updateUrgentAction: async (
            _: null,
            urgentAction: UrgentAction,
            context?: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            const preparedUa = await prepareUrgentActionForDatabase(urgentAction);
            return updateUrgentAction(urgentAction.id, preparedUa);
        },
        deleteUrgentAction: (
            _: null,
            id: string,
            context?: Context<{ user: AuthenticatedUser }>,
        ) => {
            if (!context || !context.user || context.user.role !== 'admin') {
                return null;
            }

            return removeUrgentAction(id);
        },
        addCampaignMember: (_: null, { id, member }: { id: string; member: CampaignMember }) => {
            return addCampaignMember(id, member);
        },
        addCampaignMemberTwitter: (
            _: null,
            { id, member }: { id: string; member: CampaignMember },
        ) => {
            return addCampaignMemberTwitter(id, member);
        },
        registerContact: (_: null, { id, member }: { id: string; member: CampaignMember }) => {
            return registerContact(id, member);
        },
        addResponseCount: async (_: null, { id }: { id: string }) => {
            const urgentAction = await getUrgentAction(id);
            if (!urgentAction) {
                throw new Error('Urgent action not found');
            }
            const response_count = urgentAction.response_count + 1;
            return updateUrgentAction(urgentAction.id, { response_count });
        },
    },
};
