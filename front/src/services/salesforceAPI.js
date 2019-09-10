const addCampaignMemberQuery = `
    mutation AddCampaignMember($id: ID!, $member: CampaignMemberInput!) {
        addCampaignMember(id: $id, member: $member) {
            email
        }
    }
`;

export const addCampaignMember = (urgentActionId, member) =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            addCampaignMemberQuery,
            variables: {
                id: urgentActionId,
                member,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
