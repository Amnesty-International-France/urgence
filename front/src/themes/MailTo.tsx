/* eslint-disable no-console */
import styled from '@emotion/styled';
import classnames from 'classnames';
import MobileDetect from 'mobile-detect';
import { Component } from 'react';
import withRouter from '../withRouter';
import { styles } from './Link';
import { Wait } from '../icons';

const waitStyles = {
    display: 'block',
    backgroundColor: '#b7b7b7',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    padding: '0 1em',
    lineHeight: '42px',
    minWidth: '42px',
    color: '#f2f2f2',
    textTransform: 'uppercase',
    fontFamily: 'Amnesty Trade Gothic Condensed',

    '@media (max-width: 1024px)': {
        width: '100%',
        textAlign: 'center',
    },
};
const WaitWithoutStyle = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Wait />
        </div>
    );
};
// @ts-expect-error TS(2769): No overload matches this call.
const WaitWithStyle = styled(WaitWithoutStyle)(waitStyles);

type Recipient = {
    mail?: string;
    copies_to?: string;
    cci?: string;
};

export const buildMailDest = (recipient: Recipient, subject: string, body: any) => {
    const mail = recipient.mail || 'example@mail.com';
    // Outlook (Windows) misparses an empty `subject=` and absorbs the following
    // `&body=` into the subject, and expects CRLF line breaks in the body. We
    // therefore only emit params that have a value, and normalise newlines.
    const params: string[] = [];
    if (subject) {
        params.push(`subject=${encodeURIComponent(subject)}`);
    }
    if (body) {
        params.push(`body=${encodeURIComponent(String(body).replace(/\r?\n/g, '\r\n'))}`);
    }
    if (recipient.copies_to) {
        params.push(`cc=${encodeURIComponent(recipient.copies_to)}`);
    }
    if (recipient.cci) {
        params.push(`bcc=${encodeURIComponent(recipient.cci)}`);
    }
    return `mailto:${encodeURIComponent(mail)}${params.length ? `?${params.join('&')}` : ''}`;
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

    openMailer = (dest: any) => {
        window.open(dest, 'mailto');
        window.focus();
        if (window.opener) {
            setTimeout(function () {
                if (!window.document.hasFocus()) {
                    window.close();
                }
            }, 500);
        }
    };

    render() {
        const { recipient, subject, body, label, disabled, afterMail, className } = this.props;

        const dest = buildMailDest(recipient, subject, body);
        const isIphone = this.md.is('iPhone');
        const options = {};
        if (isIphone) {
            (options as any).href = dest;
        }

        if (disabled) {
            return <WaitWithStyle />;
        }
        return (
            <a
                className={classnames(className, { disabled })}
                onClick={(event) => {
                    if (!isIphone) {
                        this.openMailer(dest);
                    }
                    setTimeout(
                        () =>
                            afterMail(
                                event,
                                navigator.userAgent.indexOf('Win') !== -1 &&
                                    window.document.hasFocus(),
                            ),
                        500,
                    );
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
