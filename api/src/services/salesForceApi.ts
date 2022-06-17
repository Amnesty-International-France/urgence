import fetch from 'isomorphic-unfetch';

import config from '../../../config';
import { CampaignMember } from '../urgentActions/campaignMember';

const salesforce = config.salesforce;

const { baseUrl, version, consumerKey, consumerSecret, username, password, securityToken } =
    salesforce;

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

const isMemberAlreadyAddedError = (errors: { errorCode: string }[]) =>
    errors.every(({ errorCode }) => errorCode === 'DUPLICATE_VALUE');

export const addCampaignMember = async (
    access_token: string,
    { campaign_code }: { campaign_code: string },
    { firstname, lastname, email, civility }: CampaignMember,
    type = 'Email',
) => {
    const url = `${QUERY_BASE_URL}/sobjects/CampaignMember`;
    let origin_code = 'AU_WEBAPP';
    try {
        origin_code = await getOriginCodeByCampaignCode(access_token, campaign_code);
    } catch (error) {
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
            Type_de_participation__c: type === 'Tweet' ? 'Twitter' : 'Smartphone',
            Actions_effectuees__c: type,
            Status: 'A participé',
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
            Type_de_participation__c: type === 'Tweet' ? 'Twitter' : 'Smartphone',
            Actions_effectuees__c: type,
            Status: 'a participé',
            Tech_Salutation__c: salesForcecivility,
            Campaign: {
                Code__c: campaign_code,
            },
        }),
    });

    const status = response.status;
    const body = (await response.json()) as { message: string; errorCode: string }[];

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

export const register = async (
    access_token: string,
    { firstname, lastname, email, phone, civility, originCode }: CampaignMember,
) => {
    const origineCodeId = await getOriginCodeId(access_token, originCode as string);

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
            Origine__c: origineCodeId,
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
            Origine__c: origineCodeId,
        }),
    });

    const status = response.status;
    const body = (await response.json()) as { message: string; errorCode: string }[];

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

export const getContactByEmail = async (access_token: string, email: string) => {
    const url = `${QUERY_BASE_URL}/query?q=SELECT+Actions_urgentes_via_le_smartphone__c+from+contact+where+email='${encodeURIComponent(
        email,
    )}'`;

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
    const body = (await response.json()) as {
        records: { Actions_urgentes_via_le_smartphone__c: boolean }[];
    };

    console.log('getContactByEmail response', status, body);

    if (status >= 400) {
        throw new Error(
            `Error while quering contacts from SalesForce: ${body
                // @ts-ignore
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    const contacts = body.records || [];
    const registered = contacts.some((record) => !!record.Actions_urgentes_via_le_smartphone__c);

    return {
        status,
        body: {
            contacts,
            registered,
        },
    };
};

export const getOriginCodeByCampaignCode = async (access_token: string, campaign_code: string) => {
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

    const body = (await response.json()) as { records: [{ Code_origine__r: { Name: string } }] };
    if (status >= 400) {
        throw new Error(
            `Error while quering contacts from SalesForce: ${body
                // @ts-ignore
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    const originCode = body.records[0].Code_origine__r.Name;

    return originCode;
};

export const getOriginCodeId = async (access_token: string, code: string) => {
    const url = `${QUERY_BASE_URL}/query?q=SELECT+Id+FROM+Code__c+WHERE+Code__c='${code}'`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: JSON_TYPE,
            'Content-Type': JSON_TYPE,
        },
    });

    const status = response.status;
    const body = (await response.json()) as { records: [{ Id: string }?] };

    console.log('register response', status, body);

    if (status >= 400) {
        throw new Error(
            `Error while registering contact into SalesForce: ${body
                // @ts-ignore
                .map(({ message }) => message)
                .join(', ')}`,
        );
    }

    return body.records[0] && body.records[0].Id;
};
