const addCampaignMemberQuery = `
    mutation AddCampaignMember($id: ID!, $member: CampaignMemberInput!) {
        addCampaignMember(id: $id, member: $member) {
            email
            registered
        }
    }
`;

export const addCampaignMember = (urgentActionId: any, member: any) =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            operationName: 'AddCampaignMember',
            query: addCampaignMemberQuery,
            variables: {
                id: urgentActionId,
                member,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((res) => res.json());

const addCampaignMemberTwitterQuery = `
    mutation AddCampaignMemberTwitter($id: ID!, $member: CampaignMemberTwitterInput!) {
        addCampaignMemberTwitter(id: $id, member: $member) {
            firstname
            lastname
        }
    }
`;

export const addCampaignMemberTwitter = (urgentActionId: any, member: any) =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            operationName: 'AddCampaignMemberTwitter',
            query: addCampaignMemberTwitterQuery,
            variables: {
                id: urgentActionId,
                member,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((res) => res.json());

const registerContactQuery = `
    mutation RegisterContact($id: ID, $member: CampaignMemberInput!) {
        registerContact(id: $id, member: $member) {
            registered
        }
    }
`;

export const registerContact = (id: any, member: any) =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            operationName: 'RegisterContact',
            query: registerContactQuery,
            variables: {
                id,
                member,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((res) => res.json());

const addResponseCountQuery = `
    mutation AddResponseCount($id: ID!) {
        addResponseCount(id: $id) {
            id
        }
    }
`;

export const addResponseCount = (id: any) =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            operationName: 'AddResponseCount',
            query: addResponseCountQuery,
            variables: {
                id,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((res) => res.json());
