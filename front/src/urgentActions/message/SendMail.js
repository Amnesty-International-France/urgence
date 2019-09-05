import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MailTo from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';
import generateUrl from '../../services/generateUrl';
import { isCorrectEmail } from '../../themes/Input';
import { routeMatch } from '../../propTypes';
import { DataConsumer } from '../../DataContext';

export const renderSendMail = ({
    messageTemplate,
    recipient,
    afterMail,
    analyticsCategory,
    match,
    step,
}) => ({
    /* eslint-disable react/prop-types */
    email,
    object,
    civility,
    firstname,
    lastname,
    /* eslint-enable react/prop-types */
}) => (
    <MailTo
        disabled={!isCorrectEmail(email) || !object || !civility || !firstname || !lastname}
        label="J'envoie"
        recipient={recipient}
        subject={object}
        body={templateToBodyText(messageTemplate, civility, firstname, lastname)}
        afterMail={() => afterMail({ email, firstname, lastname })}
        analyticsCategory={analyticsCategory}
        match={match}
        step={step}
    />
);

const query = `
    mutation AddCampaignMember($id: ID!, $member: CampaignMember!) {
        addCampaignMember(id: $id, member: $member) {
            valid
        }
    }
`;

export class SendMail extends Component {
    afterMail = member => {
        const {
            history,
            match: { params },
            urgentActionId,
        } = this.props;

        history.push(generateUrl('thanks', params));

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
    };
    render() {
        const { messageTemplate, recipient, analyticsCategory, step, match } = this.props;

        return (
            <DataConsumer>
                {renderSendMail({
                    messageTemplate,
                    recipient,
                    afterMail: this.afterMail,
                    analyticsCategory,
                    match,
                    step,
                })}
            </DataConsumer>
        );
    }
}

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
    step: PropTypes.string,
    urgentActionId: PropTypes.string,
};

export default withRouter(SendMail);
