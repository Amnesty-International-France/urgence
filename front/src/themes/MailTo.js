import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';
import GoogleAnalytics from 'react-ga';

import { styles } from './Link';

export const MailTo = ({
    recipient = {},
    subject,
    body,
    label,
    disabled,
    afterMail,
    className,
    analyticsCategory,
}) => (
    <a
        className={classnames(className, { disabled })}
        onClick={event => {
            afterMail(event);

            if (analyticsCategory) {
                GoogleAnalytics.event({
                    category: analyticsCategory,
                    action: `Click on ${disabled ? 'disabled' : 'active'} button: MailTo`,
                    label: `User clicked on ${
                        disabled ? 'disabled' : 'active'
                    } button: MailTo (label: ${label})`,
                });
            }
        }}
        href={`mailto:${encodeURIComponent(recipient.mail)}?subject=${encodeURIComponent(
            subject,
        )}&body=${encodeURIComponent(body)}`
            .concat(recipient.copies_to ? `&cc=${encodeURIComponent(recipient.copies_to)}` : '')
            .concat(recipient.cci ? `&bcc=${encodeURIComponent(recipient.cci)}` : '')}
        target="_blank"
        disabled={disabled}
    >
        {label}
    </a>
);

MailTo.propTypes = {
    className: PropTypes.string.isRequired,
    afterMail: PropTypes.func.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
    analyticsCategory: PropTypes.string,
};

export default glamorous(MailTo)(styles);
