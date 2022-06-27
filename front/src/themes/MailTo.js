/* eslint-disable no-console */
import React, { Component } from 'react';
import MobileDetect from 'mobile-detect';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { paramsType } from '../propTypes';
import trackEvent from '../analytics/trackEvent';

import { styles } from './Link';

export const buildMailDest = (recipient, subject, body) => {
    const mail = recipient.mail || 'example@mail.com';
    return `mailto:${encodeURIComponent(mail)}?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}`
        .concat(recipient.copies_to ? `&cc=${encodeURIComponent(recipient.copies_to)}` : '')
        .concat(recipient.cci ? `&bcc=${encodeURIComponent(recipient.cci)}` : '');
};

export class MailTo extends Component {
    constructor(props) {
        super(props);
        this.md = new MobileDetect(navigator.userAgent);
    }

    componentDidMount() {
        const {
            label,
            disabled,
            analyticsCategory,
            step,
            match: {
                params: { slug },
            },
        } = this.props;
        trackEvent(analyticsCategory, 'Display', 'button', 'SendMail', slug, step, {
            disabled: disabled ? 'disabled' : 'active',
            label,
        });
    }

    openMailer = (dest) => {
        console.log('window', window);
        console.log('dest', dest);
        console.log(`window.open("${dest}", 'mailto')`);

        window.open(dest, 'mailto');
        window.focus();
        setTimeout(function () {
            if (!window.document.hasFocus()) {
                window.close();
            }
        }, 500);
    };

    render() {
        const {
            recipient = {},
            subject,
            body,
            label,
            disabled,
            afterMail,
            className,
            analyticsCategory,
            step,
            match: {
                params: { slug },
            },
        } = this.props;

        const dest = buildMailDest(recipient, subject, body);
        const isIphone = this.md.is('iPhone');
        const options = {};
        if (isIphone) {
            options.href = dest;
        }
        return (
            <a
                className={classnames(className, { disabled })}
                onClick={(event) => {
                    if (!isIphone) {
                        this.openMailer(dest);
                    }
                    setTimeout(() => afterMail(event), 500);
                    trackEvent(analyticsCategory, 'Click', 'button', 'SendMail', slug, step, {
                        disabled: disabled ? 'disabled' : 'active',
                        label,
                    });
                }}
                target={isIphone ? 'mailto' : '_self'}
                rel="noopener noreferrer"
                disabled={disabled}
                {...options}
            >
                {label}
            </a>
        );
    }
}

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
    match: paramsType,
};

export default styled(MailTo)(styles);
