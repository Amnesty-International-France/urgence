const addCampaignMemberQuery = `
    mutation AddCampaignMember($id: ID!, $member: CampaignMemberInput!) {
        addCampaignMember(id: $id, member: $member) {
            email
            registered
        }
    }
`;

export const addCampaignMember = (urgentActionId, member) =>
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
    }).then(res => res.json());

const addCampaignMemberTwitterQuery = `
    mutation AddCampaignMemberTwitter($id: ID!) {
        addCampaignMemberTwitter(id: $id) {
            success
        }
    }
`;

export const addCampaignMemberTwitter = urgentActionId =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            operationName: 'AddCampaignMemberTwitter',
            query: addCampaignMemberTwitterQuery,
            variables: {
                id: urgentActionId,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(res => res.json());

const registerContactQuery = `
    mutation RegisterContact($member: CampaignMemberInput!) {
        registerContact(member: $member) {
            registered
        }
    }
`;

export const registerContact = member =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            operationName: 'RegisterContact',
            query: registerContactQuery,
            variables: {
                member,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(res => res.json());

const addResponseCountQuery = `
    mutation AddResponseCount($id: ID!) {
        addResponseCount(id: $id) {
            id
        }
    }
`;

export const addResponseCount = id =>
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
    }).then(res => res.json());
