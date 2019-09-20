import isUUID from 'validator/lib/isUUID';

import { getUrgentAction } from './repository';
import {
    authenticate,
    addCampaignMember as addCampaignMemberIntoSalesForce,
    getContactByEmail,
    register,
} from '../services/salesForceApi';

export const addCampaignMember = async (id, { firstname, lastname, email }) => {
    if (!isUUID(id)) {
        return new Error(`Invalid UUID format: ${id}`);
    }

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return new Error('Not Found');
    }

    if (!urgentAction.campaign_code) {
        return { firstname, lastname, email };
    }

    const { body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;

    await addCampaignMemberIntoSalesForce(accessToken, urgentAction, {
        firstname,
        lastname,
        email,
    });

    const { body: contactBody } = await getContactByEmail(authBody.access_token, email);

    return { firstname, lastname, email, registered: contactBody.registered };
};

export const registerContact = async ({ firstname, lastname, email, phone }) => {
    const { body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;

    await register(accessToken, { firstname, lastname, email, phone });

    return { firstname, lastname, email, registered: true };
};
