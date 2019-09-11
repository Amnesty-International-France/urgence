import isUUID from 'validator/lib/isUUID';

import { getUrgentAction } from './repository';
import { authenticate, registerCampaignMember, getContactByEmail } from '../services/salesForceApi';

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

    const { status: authResponseStatus, body: authBody } = await authenticate();
    const accessToken = authBody ? authBody.access_token : null;

    if (authResponseStatus !== 200 || !accessToken) {
        return new Error('Authentication to SalesForce API failed');
    }

    await registerCampaignMember(authBody.access_token, urgentAction, {
        firstname,
        lastname,
        email,
    });

    const { status: contactResponseStatus, body: contactBody } = await getContactByEmail(
        authBody.access_token,
        email,
    );

    if (contactResponseStatus !== 200) {
        return new Error('Unable to query contacts in SalesForce API');
    }

    return { firstname, lastname, email, registered: contactBody.registered };
};
