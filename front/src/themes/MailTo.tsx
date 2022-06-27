/* eslint-disable no-console */
import styled from '@emotion/styled';
import classnames from 'classnames';
import MobileDetect from 'mobile-detect';
import { Component } from 'react';
import trackEvent from '../analytics/trackEvent';
import withRouter from '../withRouter';
import { styles } from './Link';

export const buildMailDest = (recipient: any, subject: any, body: any) => {
    const mail = recipient.mail || 'example@mail.com';
    return `mailto:${encodeURIComponent(mail)}?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}`
        .concat(recipient.copies_to ? `&cc=${encodeURIComponent(recipient.copies_to)}` : '')
        .concat(recipient.cci ? `&bcc=${encodeURIComponent(recipient.cci)}` : '');
};

type Props = {
    className: string;
    afterMail: (...args: any[]) => any;
    subject: string;
    body: string;
    label: string;
    disabled?: boolean;
    recipient: {
        mail: string;
        copies_to?: string;
        cci?: string;
    };
    analyticsCategory?: string;
    step?: string;
    params?: any;
};

export class MailTo extends Component<Props> {
    md: any;

    constructor(props: Props) {
        super(props);
        this.md = new MobileDetect(navigator.userAgent);
    }

    componentDidMount() {
        const {
            label,
            disabled,
            analyticsCategory,
            step,
            params: { slug },
        } = this.props;
        trackEvent(analyticsCategory, 'Display', 'button', 'SendMail', slug, step, {
            disabled: disabled ? 'disabled' : 'active',
            label,
        });
    }

    openMailer = (dest: any) => {
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
            params: { slug },
        } = this.props;

        const dest = buildMailDest(recipient, subject, body);
        const isIphone = this.md.is('iPhone');
        const options = {};
        if (isIphone) {
            (options as any).href = dest;
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
                // @ts-expect-error TS(2322): Type '{ children: string; className: string; onCli... Remove this comment to see the full error message
                disabled={disabled}
                {...options}
            >
                {label}
            </a>
        );
    }
}

// @ts-expect-error TS(2769): No overload matches this call.
export default withRouter(styled(MailTo)(styles));
