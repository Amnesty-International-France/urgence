import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sessionData from '../../sessionData';
import { MailTo } from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';

export class SendMail extends Component {
    state = {
        object: sessionData.getMailObject(),
        signature: sessionData.getSignature(),
    };

    render() {
        const { messageTemplate, recipient } = this.props;
        const { object, signature } = this.state;

        return (
            <MailTo
                disabled={!object || !signature}
                label="Send mail"
                recipient={recipient}
                subject={object}
                body={templateToBodyText(messageTemplate, signature)}
            />
        );
    }
}

SendMail.propTypes = {
    className: PropTypes.string,
    messageTemplate: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string.isRequired }),
    ),
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
};

export default SendMail;
