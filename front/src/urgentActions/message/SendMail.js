import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MailTo from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';
import generateUrl from '../../services/generateUrl';
import { routeMatch } from '../../propTypes';
import { SessionDataConsumer } from '../../SessionDataContext';

export const renderSendMail = ({ messageTemplate, recipient, afterMail }) => ({
    /* eslint-disable react/prop-types */
    object,
    signature,
    /* eslint-enable react/prop-types */
}) => (
    <MailTo
        disabled={!object || !signature}
        label="J'envoie"
        recipient={recipient}
        subject={object}
        body={templateToBodyText(messageTemplate, signature)}
        afterMail={afterMail}
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
        const { messageTemplate, recipient } = this.props;

        return (
            <SessionDataConsumer>
                {renderSendMail({ messageTemplate, recipient, afterMail: this.afterMail })}
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
};

export default withRouter(SendMail);
