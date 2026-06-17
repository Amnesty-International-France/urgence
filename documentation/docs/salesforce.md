---
title: Salesforce
slug: salesforce
date: 2023-03-15T13:56:53Z
draft: false
weight: 2
summary: "Point sur les interactions entre Actions Urgentes et le CRM Salesforce d'Amnesty"
---

Amnesty France dispose d'un CRM Salesforce centralisant sans doute les contacts (donateurs, signataires de pétitions ...) et les actions (pétitions, actions urgentes ...).

Actions Urgentes (A.U. pour la suite) interagit avec Salesforce pour trois choses :
- obtenir le code de référence d'une action,
- enregistrer la participation d'une personne à une action spécifique,
- enregistrer une personne dans le programme action urgente (une personne enregistrée dans le programme recevra une alerte dès qu'une nouvelle action est lancée).

## Mode d'interaction avec SalesForce

A.U. échange avec SalesForce via une [API REST](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm) (ou au moins web, le qualificatif de REST est contestable...).

Voici les variables d'environnements nécessaires à la configuration des échanges :

```javascript
// in config/index.cjs
const config = convict({
    //...
    salesforce: {
        baseUrl: {
            format: String,
            default: '',
            env: 'SF_BASE_URL',
        },
        version: {
            format: String,
            default: 'v45.0',
            env: 'SF_API_VERSION',
        },
        consumerKey: {
            format: String,
            default: '',
            env: 'SF_CONSUMER_KEY',
        },
        consumerSecret: {
            format: String,
            default: '',
            env: 'SF_CONSUMER_SECRET',
        },
    },
});
```

Les échanges nécessitent une authentification réalisée via un échange de token d'authentification, basée sur le flow OAuth 2.0 `client_credentials` (la méthode `password` / `username` / `securityToken` étant supprimée par Salesforce à partir du 1er septembre 2026).

```JavaScript
// in api/src/services/salesForceApi.ts
const { baseUrl, consumerKey, consumerSecret } = config.salesforce;

const AUTHENTICATE_URL = `${baseUrl}/oauth2/token`;
const params = `grant_type=client_credentials&client_id=${encodeURIComponent(consumerKey)}&client_secret=${encodeURIComponent(consumerSecret)}`;

const response = await fetch(AUTHENTICATE_URL, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
});
const body = await response.json();
const token = body.access_token;
```

## Références des actions

Lorsqu'une action est créée depuis l'administration de A.U., l'utilisateur renseigne une `campaign_code`. À la création en base de l'action, ce `campaign_code` permet d'obtenir un `originCode` sur Salesforce (voir `api/src/urgentActions/resolvers.ts` ligne 41) via l'appel suivant :

```JavaScript
// in api/src/services/salesForceApi.ts
export const getOriginCodeByCampaignCode = async (access_token: string, campaign_code: string) => {
    const url = `${QUERY_BASE_URL}/query?q=select+Code_origine__r.Name+from+Campaign+where+Name='${campaign_code}'`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    const status = response.status;

    const body = (await response.json()) as { records: [{ Code_origine__r: { Name: string } }] };

    const originCode = body.records[0].Code_origine__r.Name;

    return originCode;
};
```

Ces deux valeurs sont stockées en base de données.

Ensuite, lorsque l'on inscrit un utilisateur au programme A.U, on demande à SalesForce un `origineCodeId` à partir de `originCode`. Cette valeur est requise pour enregistrer un utilisateur (voir la suite).

```JavaScript
// in api/src/services/salesForceApi.ts
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

    return body.records[0] && body.records[0].Id;
};
```

> Questions à poser à Amnesty : A quoi correspondent ces trois codes `campaign_code`, `originCode` et `origineCodeId` ? Ces valeurs peuvent-elle changer ? Peut-on mettre un premier validateur sur le `campaign_code` lors de la création de l'action ?

## Les personnes

A.U. n'enregistre pas dans les participations aux actions dans sa base mais dans Salesforce.

```JavaScript
// in api/src/services/salesForceApi.ts
export const addCampaignMember = async (
    access_token: string,
    { campaign_code }: { campaign_code: string },
    { firstname, lastname, email, civility }: CampaignMember,
    type = 'Email',
) => {
    const url = `${QUERY_BASE_URL}/sobjects/CampaignMember`;
    // ?? pourquoi alors que c'est déja en base ?
    let origin_code = await getOriginCodeByCampaignCode(access_token, campaign_code);
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
};
```

Ensuite A.U. a besoin de savoir si l'email de la personne est déja présente dans SalesForce comme email de contact des personnes enregistrée dans le programme A.U.

```JavaScript
// in api/src/services/salesForceApi.ts
export const getContactByEmail = async (access_token: string, email: string) => {
    const url = `${QUERY_BASE_URL}/query?q=SELECT+Actions_urgentes_via_le_smartphone__c+from+contact+where+email='${encodeURIComponent(
        email,
    )}'`;

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
```

Et si ce n'est pas le cas, l'application va proposer à l'utilisateur de s'inscrire :

```JavaScript
// in api/src/services/salesForceApi.ts
export const register = async (
    access_token: string,
    { firstname, lastname, email, phone, civility, originCode }: CampaignMember,
) => {
    const origineCodeId = await getOriginCodeId(access_token, originCode as string);

    const url = `${QUERY_BASE_URL}/sobjects/Contact`;

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
};
```
