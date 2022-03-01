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
const QUERY_BASE_URL = `${baseUrl}/data/${version}`;

export const authenticate = async () => {
    console.log('Authentication request', {
        url: AUTHENTICATE_URL,
        method: 'POST',
        headers: {
            Accept: JSON_TYPE,
        },
    });

    const response = await fetch(AUTHENTICATE_URL, {
        method: 'POST',
        headers: {
            Accept: JSON_TYPE,
        },
    });
    const status = response.status;
    const body = await response.json();

    console.log('Authentication response', { status, body });

    if (status >= 400) {
        throw new Error(`Error authenticating to SalesForce: ${body.error_description}`);
    }

    return { status, body };
};

const isMemberAlreadyAddedError = errors =>
    errors.every(({ errorCode }) => errorCode === 'DUPLICATE_VALUE');

export const addCampaignMember = async (
    access_token,
    { campaign_code },
    { firstname, lastname, email, civility },
) => {
    const url = `${QUERY_BASE_URL}/sobjects/CampaignMember`;
    let origin_code = 'AU_WEBAPP';
    try {
        origin_code = await getOriginCodeByCampaignCode(access_token, campaign_code);
    } catch {
        console.error('Error getting origin code, fallback to default one (AU_WEBAPP)');
    }
    let salesForcecivility = '';
    if (civilityMap[civility]) {
        salesForcecivility = civilityMap[civility];
    }

    console.log('addCampaignMember request', {
        url,
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
            Tech_Salutation__c: salesForcecivility,
            Campaign: {
                Code__c: campaign_code,
            },
        }),
    });

    const response = await fetch(url, {
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
            Tech_Salutation__c: salesForcecivility,
            Campaign: {
                Code__c: campaign_code,
            },
        }),
    });

    const status = response.status;
    const body = await response.json();

    console.log('addCampaignMember response', { status, body });

    if (status >= 400 && !isMemberAlreadyAddedError(body)) {
        throw new Error(
            `Error while registering campaign member into SalesForce: ${body
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    return { status, body };
};

const civilityMap = {
    'M.': 'M',
    'Mme.': 'MME',
    Autre: '',
};

export const register = async (access_token, { firstname, lastname, email, phone, civility }) => {
    const url = `${QUERY_BASE_URL}/sobjects/Contact`;

    let salesForcecivility = '';
    if (civilityMap[civility]) {
        salesForcecivility = civilityMap[civility];
    }

    console.log('register request', {
        url,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
            'Content-Type': JSON_TYPE,
        },
        body: JSON.stringify({
            Actions_urgentes_via_le_smartphone__c: true,
            Salutation: salesForcecivility,
            LastName: lastname,
            FirstName: firstname,
            EMAIL: email,
            MobilePhone: phone,
        }),
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
            'Content-Type': JSON_TYPE,
        },
        body: JSON.stringify({
            Actions_urgentes_via_le_smartphone__c: true,
            Salutation: salesForcecivility,
            LastName: lastname,
            FirstName: firstname,
            EMAIL: email,
            MobilePhone: phone,
        }),
    });

    const status = response.status;
    const body = await response.json();

    console.log('register response', status, body);

    if (status >= 400) {
        throw new Error(
            `Error while registering contact into SalesForce: ${body
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    return { status, body };
};

export const getContactByEmail = async (access_token, email) => {
    const url = `${QUERY_BASE_URL}/query?q=SELECT+Actions_urgentes_via_le_smartphone__c+from+contact+where+email='${email}'`;

    console.log('getContactByEmail request', {
        url,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
        },
    });

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
        },
    });

    const status = response.status;
    const body = await response.json();

    if (status >= 400) {
        return new Error(
            `Error while quering contacts from SalesForce: ${body
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    const contacts = body.records || [];
    const registered = contacts.some(record => !!record.Actions_urgentes_via_le_smartphone__c);

    return {
        status,
        body: {
            contacts,
            registered,
        },
    };
};

export const getOriginCodeByCampaignCode = async (access_token, campaign_code) => {
    const url = `${QUERY_BASE_URL}/query?q=select+Code_origine__r.Name+from+Campaign+where+Name='${campaign_code}'`;

    console.log('getCodeOrigineByCampaignCode request', {
        url,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
        },
    });

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
        },
    });

    const status = response.status;
    const body = await response.json();

    console.log('getCodeOrigineByCampaignCode response', (status, body));

    if (status >= 400) {
        return new Error(
            `Error while quering contacts from SalesForce: ${body
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    const originCode = body.records && body.records[0].Code_origine__r.Name;

    return originCode;
};
