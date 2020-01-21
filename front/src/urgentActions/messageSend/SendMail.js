import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import get from 'lodash.get';

import MailTo from '../../themes/MailTo';
import { templateToBodyText } from '../messageView/templateToBodyText';
import { isCorrectEmail } from '../../themes/Input';
import { routeMatch } from '../../propTypes';
import { withSessionData } from '../../DataContext';

import { addCampaignMember } from '../../services/api';

export const SendMail = ({
    messageTemplate,
    recipient,
    analyticsCategory,
    step,
    match,
    afterMail,
    auId,
    label,
    object,
    civility,
    firstname,
    lastname,
    email,
    registered,
    setRegistered,
}) => {
    const handleAfterMail = () => {
        let isRegistered = registered;
        return addCampaignMember(auId, { email, firstname, lastname })
            .then(result => {
                if (result.errors && result.errors.length) {
                    // eslint-disable-next-line no-console
                    console.log(
                        'Failed adding campaign member',
                        result.errors.map(error => `- ${error.message}`).join('\n'),
                    );
                }
                isRegistered = get(result, 'data.addCampaignMember.registered', false);
                setRegistered(isRegistered ? 'true' : 'false');
            })
            .catch(() => {})
            .then(() => {
                afterMail({ registered: isRegistered });
            });
    };

    const body = templateToBodyText(messageTemplate, civility, firstname, lastname);

    return (
        <MailTo
            disabled={!isCorrectEmail(email) || !object || !civility || !firstname || !lastname}
            label={label}
            recipient={recipient}
            subject={object}
            body={body}
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
    label: PropTypes.string.isRequired,
    afterMail: PropTypes.func,
    object: PropTypes.string.isRequired,
    civility: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    registered: PropTypes.string.isRequired,
    setRegistered: PropTypes.func.isRequired,
};

SendMail.defaultProps = {
    onMailSent: () => {},
};

export default compose(withSessionData, withRouter)(SendMail);
