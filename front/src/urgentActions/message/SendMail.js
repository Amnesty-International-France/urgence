import React from 'react';
import PropTypes from 'prop-types';

import { MailTo } from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';

export const SendMail = ({ messageTemplate, recipient, object, signature, afterMail }) => (
    <MailTo
        disabled={!object || !signature}
        label="Envoyer"
        recipient={recipient}
        subject={object}
        body={templateToBodyText(messageTemplate, signature)}
        afterMail={afterMail}
    />
);

SendMail.propTypes = {
    className: PropTypes.string,
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
    object: PropTypes.string,
    signature: PropTypes.string,
    afterMail: PropTypes.func,
};

export default SendMail;
