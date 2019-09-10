import isUUID from 'validator/lib/isUUID';

import { getUrgentAction } from './repository';
import { authenticate, registerCampaignMember } from './salesForceApi';

export const addCampaignMember = async (id, { firstname, lastname, email }) => {
    if (!isUUID(id)) {
        return Error(`Invalid UUID format: ${id}`);
    }

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return Error('Not Found');
    }

    if (!urgentAction.campaign_code) {
        return;
    }

    const authResponse = await authenticate();
    const auth = await authResponse.json();

    if (authResponse.status !== 200) {
        return Error('Unable to contact SalesForce');
    }

    registerCampaignMember(auth.access_token, urgentAction, {
        firstname,
        lastname,
        email,
    });
};
