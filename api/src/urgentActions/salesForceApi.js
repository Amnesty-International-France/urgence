import fetch from 'isomorphic-unfetch';

import { salesforce } from '../../../config';

const JSON_TYPE = 'application/json';

export const authenticate = () =>
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

export const getCampaignMemberDetails = async (access_token, { id }) => {
    const url = `${
        salesforce.baseUrl
    }/data/v44.0/query/?q=SELECT+ID,Contact.name,Contact.Optin_Actions_Urgentes__c+from+campaignmember+where+id=${id}`;

    const result = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
            'Content-Type': JSON_TYPE,
        },
    });

    const registered = result.records.some(record => !!record.Optin_Actions_Urgentes__c);

    return { registered };
};

export const registerCampaignMember = async (
    access_token,
    { campaign_code, origin_code },
    { firstname, lastname, email },
) => {
    const url = `${salesforce.baseUrl}/data/v44.0/sobjects/CampaignMember`;

    return fetch(url, {
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
            Tech_CodeOrigine__c: origin_code,
            Type_de_participation__c: 'Smartphone',
            Actions_effectuees__c: 'Email',
            Status: 'a participé',
            Campaign: {
                Code__c: campaign_code,
            },
        }),
    });
};
