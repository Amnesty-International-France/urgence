---
title: Salesforce
slug: salesforce
date: 2023-03-15T13:56:53Z
draft: false
weight: 2
summary: "Point sur les interactions entre Actions Urgentes et le CRM Salesforce d'Amnesty"
---

Amnesty France dispose d'un CRM Saleforce centralisant sans doute les contacts (donateurs, signataires de pétitions ...) et les actions (pétitions, actions urgentes ...).

Actions Urgentes (A.U. pour la suite) interagi Saleforce pour trois choses :
- obtenir le code de référence d'une action,
- enregistrer la participation d'une personne à une action spécifique,
- enregistrer une personne dans le programme action urgente (une personne enregistrée dans le programme recevra une alerte dès qu'une nouvelle action est lancée).

## Mode d'interaction avec Saleforce

A.U. échange avec Saleforce via une [API REST](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm) (ou au moins web, le qualificatif de REST est contestable...).

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
        username: {
            format: String,
            default: '',
            env: 'SF_USERNAME',
        },
        password: {
            format: String,
            default: '',
            env: 'SF_PASSWORD',
        },
        securityToken: {
            format: String,
            default: '',
            env: 'SF_SECURITY_TOKEN',
        },
    },
});
```

Les échanges nécessite une authentifications réalisée via un échange de token d'authentification.

```JavaScript
// in api/src/services/salesForceApi.ts
const {
    baseUrl,
    consumerKey,
    consumerSecret,
    username,
    password,
    securityToken
} = config.salesforce;

const AUTHENTICATE_URL = `${baseUrl}/oauth2/token?grant_type=password&client_id=${consumerKey}&client_secret=${consumerSecret}&username=${username}&password=${password}${securityToken}`;

const response = await fetch(AUTHENTICATE_URL, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
    },
});
const body = await response.json();
const token = body.access_token:
```

## Références des actions
