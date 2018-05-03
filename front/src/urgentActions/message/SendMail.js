import React from 'react';
import PropTypes from 'prop-types';

import { MailTo } from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';

export const SendMail = ({ messageTemplate, recipient, object, signature }) => (
    <MailTo
        disabled={!object || !signature}
        label="Send mail"
        recipient={recipient}
        subject={object}
        body={templateToBodyText(messageTemplate, signature)}
    />
);

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
    object: PropTypes.string,
    signature: PropTypes.string,
};

export default SendMail;
