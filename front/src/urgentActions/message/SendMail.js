import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import MailTo from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';
import { isCorrectEmail } from '../../themes/Input';
import { routeMatch } from '../../propTypes';
import { withSessionData } from '../../DataContext';

const query = `
    mutation AddCampaignMember($id: ID!, $member: CampaignMemberInput!) {
        addCampaignMember(id: $id, member: $member) {
            email
        }
    }
`;

const addCampaignMember = (urgentActionId, member) =>
    fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query,
            variables: {
                id: urgentActionId,
                member,
            },
        }),
        headers: {
            'content-type': 'application/json',
        },
    });

export const SendMail = ({
    messageTemplate,
    recipient,
    analyticsCategory,
    step,
    match,
    afterMail,
    auId,
    email,
    object,
    civility,
    firstname,
    lastname,
    registered,
}) => {
    const handleAfterMail = () => {
        addCampaignMember(auId, { email, firstname, lastname });
        afterMail({ registered: registered === 'true' });
    };

    return (
        <MailTo
            disabled={!isCorrectEmail(email) || !object || !civility || !firstname || !lastname}
            label="J'envoie"
            recipient={recipient}
            subject={object}
            body={templateToBodyText(messageTemplate, civility, firstname, lastname)}
            afterMail={handleAfterMail}
            analyticsCategory={analyticsCategory}
            match={match}
            step={step}
        />
    );
};

SendMail.propTypes = {
    className: PropTypes.string,
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
    match: routeMatch,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string.isRequired,
    auId: PropTypes.string.isRequired,
    afterMail: PropTypes.func,
    email: PropTypes.string.isRequired,
    object: PropTypes.string.isRequired,
    civility: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    registered: PropTypes.string.isRequired,
};

SendMail.defaultProps = {
    onMailSent: () => {},
};

export default compose(
    withSessionData,
    withRouter,
)(SendMail);
