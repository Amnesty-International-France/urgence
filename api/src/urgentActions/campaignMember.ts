import isUUID from 'validator/lib/isUUID';

import { getUrgentAction } from './repository';
import {
    authenticate,
    addCampaignMember as addCampaignMemberIntoSalesForce,
    getContactByEmail,
    register,
} from '../services/salesForceApi';

export type CampaignMember = {
    civility: 'M.' | 'Mme.' | 'Autre';
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    originCode: string;
};

export const addCampaignMember = async (
    id: string,
    { firstname, lastname, email, civility }: CampaignMember,
) => {
    if (!isUUID(id)) {
        return new Error(`Invalid UUID format: ${id}`);
    }

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return new Error('Not Found');
    }

    if (!urgentAction.campaign_code) {
        return { firstname, lastname, email, civility };
    }

    const { body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;

    await addCampaignMemberIntoSalesForce(accessToken, urgentAction, {
        firstname,
        lastname,
        email,
        civility,
    });

    const { body: contactBody } = await getContactByEmail(authBody.access_token, email);

    return { firstname, lastname, email, registered: contactBody.registered };
};

export const addCampaignMemberTwitter = async (
    id: string,
    { firstname, lastname, email, civility }: CampaignMember,
) => {
    if (!isUUID(id)) {
        return new Error(`Invalid UUID format: ${id}`);
    }

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return new Error('Not Found');
    }

    const { body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;

    await addCampaignMemberIntoSalesForce(
        accessToken,
        urgentAction,
        { firstname, lastname, email: email || '', civility },
        'Tweet',
    );

    return { succes: true };
};

export const registerContact = async (
    id: string,
    { firstname, lastname, email, phone, civility }: CampaignMember,
) => {
    const { body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;

    const urgentAction = await getUrgentAction(id);

    await register(accessToken, {
        civility,
        firstname,
        lastname,
        email,
        phone,
        originCode: urgentAction.origin_code,
    });

    return { firstname, lastname, email, civility, registered: true };
};
