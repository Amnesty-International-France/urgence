import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { routeMatch } from '../propTypes';
import { withRouter } from 'react-router';
import { trackEvent } from '../analytics/withTracker';

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
    step,
    match,
}) => (
    <a
        className={classnames(className, { disabled })}
        onClick={event => {
            afterMail(event);
            trackEvent(analyticsCategory, 'Click', 'button', 'SendMail', match.params.id, step, {
                disabled: disabled ? 'disabled' : 'active',
                label,
            });
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
    step: PropTypes.string,
    match: routeMatch,
};

export default glamorous(withRouter(MailTo))(styles);
