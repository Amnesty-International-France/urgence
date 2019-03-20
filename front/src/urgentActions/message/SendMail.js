import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MailTo from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';
import generateUrl from '../../services/generateUrl';
import { routeMatch } from '../../propTypes';
import { SessionDataConsumer } from '../../SessionDataContext';

export const renderSendMail = ({
    messageTemplate,
    recipient,
    afterMail,
    analyticsCategory,
    step,
}) => ({
    /* eslint-disable react/prop-types */
    object,
    civility,
    surname,
    name,
    /* eslint-enable react/prop-types */
}) => (
    <MailTo
        disabled={!object || !civility || !surname || !name}
        label="J'envoie"
        recipient={recipient}
        subject={object}
        body={templateToBodyText(messageTemplate, civility, surname, name)}
        afterMail={afterMail}
        analyticsCategory={analyticsCategory}
        step={step}
    />
);

export class SendMail extends Component {
    afterMail = () => {
        const {
            history,
            match: { params },
        } = this.props;

        history.push(generateUrl('thanks', params));
    };
    render() {
        const { messageTemplate, recipient, analyticsCategory, step } = this.props;

        return (
            <SessionDataConsumer>
                {renderSendMail({
                    messageTemplate,
                    recipient,
                    afterMail: this.afterMail,
                    analyticsCategory,
                    step,
                })}
            </SessionDataConsumer>
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
};

export default withRouter(SendMail);
