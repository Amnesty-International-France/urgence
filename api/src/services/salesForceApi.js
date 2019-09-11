import fetch from 'isomorphic-unfetch';

import { salesforce } from '../../../config';

const {
    baseUrl,
    version,
    consumerKey,
    consumerSecret,
    username,
    password,
    securityToken,
} = salesforce;

const JSON_TYPE = 'application/json';

const AUTHENTICATE_URL = `${baseUrl}/oauth2/token?grant_type=password&client_id=${consumerKey}&client_secret=${consumerSecret}&username=${username}&password=${password}${securityToken}`;

export const authenticate = () =>
    fetch(AUTHENTICATE_URL, {
        method: 'POST',
        headers: {
            Accept: JSON_TYPE,
        },
    });

const QUERY_BASE_URL = `${baseUrl}/data/${version}`;

export const registerCampaignMember = async (
    access_token,
    { campaign_code, origin_code },
    { firstname, lastname, email },
) => {
    const url = `${QUERY_BASE_URL}/sobjects/CampaignMember`;

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

export const getCampaignMemberDetails = async (access_token, { id }) => {
    const url = `${QUERY_BASE_URL}/query/?q=SELECT+ID,Contact.name,Contact.Optin_Actions_Urgentes__c+from+campaignmember+where+id=${id}`;

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
