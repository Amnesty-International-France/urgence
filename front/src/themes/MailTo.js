import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../themes/Button';

export const MailTo = ({
    recipient = {},
    subject,
    body,
    label,
    disabled,
    afterMail,
}) => (
    <a
        href={`mailto:${encodeURIComponent(
            recipient.mail,
        )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            body,
        )}`
            .concat(
                recipient.copies_to
                    ? `&cc=${encodeURIComponent(recipient.copies_to)}`
                    : '',
            )
            .concat(
                recipient.cci
                    ? `&bcc=${encodeURIComponent(recipient.cci)}`
                    : '',
            )}
        target="_blank"
        disabled={disabled}
    >
        <Button label={label} disabled={disabled} onClick={afterMail} />
    </a>
);

MailTo.propTypes = {
    mail: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
};
