/* eslint-disable no-console */
import styled from '@emotion/styled';
import classnames from 'classnames';
import MobileDetect from 'mobile-detect';
import { Component } from 'react';
import withRouter from '../withRouter';
import { styles } from './Link';

type Recipient = {
    mail?: string;
    copies_to?: string;
    cci?: string;
};

export const buildMailDest = (recipient: Recipient, subject: string, body: any) => {
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
    recipient: Recipient;
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

    render() {
        const {
            recipient,
            subject,
            body,
            label,
            disabled,
            afterMail,
            className,
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
                        window.open(dest, 'mailto');
                    }
                    setTimeout(() => afterMail(event, navigator.userAgent.indexOf('Win') !== -1 && window.document.hasFocus()), 500);
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
