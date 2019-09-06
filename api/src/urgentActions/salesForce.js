import isUUID from 'validator/lib/isUUID';
import fetch from 'isomorphic-unfetch';

import { getUrgentAction } from './repository';
import { salesforce } from '../../../config';

const JSON_TYPE = 'application/json';

const authenticate = () =>
    fetch(
        `${salesforce.baseUrl}/oauth2/token?grant_type=password&client_id=${
            salesforce.consumerKey
        }&client_secret=${salesforce.consumerSecret}&username=${salesforce.username}&password=${
            salesforce.password
        }${salesforce.securityToken}`,
        {
            method: 'POST',
            headers: {
                Accept: JSON_TYPE,
            },
        },
    );

const registerCampaignMember = async (access_token, campaignCode, { firstname, lastname, email }) =>
    fetch(`${salesforce.baseUrl}/data/v44.0/sobjects/CampaignMember`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
            'Content-Type': JSON_TYPE,
        },
        body: JSON.stringify({
            Tech_Email__c: email,
            Tech_FirstName__c: firstname,
            Tech_LastName__c: lastname,
            Type_de_participation__c: 'Smartphone',
            Actions_effectuees__c: 'Email',
            Status: 'a participé',
            Campaign: {
                Code__c: campaignCode,
            },
        }),
    });

export const addCampaignMember = async (id, { firstname, lastname, email }) => {
    if (!isUUID(id)) {
        return Error(`Invalid UUID format: ${id}`);
    }

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return Error('Not Found');
    }

    if (!urgentAction.campaign_code || urgentAction.campaign_code === '') {
        return;
    }

    const authResponse = await authenticate();
    const auth = await authResponse.json();

    if (authResponse.status !== 200) {
        return Error('Unable to contact SalesForce');
    }

    return registerCampaignMember(auth.access_token, urgentAction.campaign_code, {
        firstname,
        lastname,
        email,
    });
};
