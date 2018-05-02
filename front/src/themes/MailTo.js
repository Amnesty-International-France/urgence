import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../themes/Button';

export const MailTo = ({ mail = '', subject, body, label, disabled }) => (
    <a
        href={`mailto:${mail}?subject=${subject}&body=${body}`}
        target="_blank"
        disabled={disabled}
    >
        <Button label={label} disabled={disabled} />
    </a>
);

MailTo.propTypes = {
    mail: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};
