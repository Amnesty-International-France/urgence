import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { routeMatch } from '../propTypes';
import trackEvent from '../analytics/trackEvent';

import { styles } from './Link';

export const buildMailDest = (recipient, subject, body) => {
    return `mailto:${encodeURIComponent(recipient.mail)}?subject=${encodeURIComponent(
        subject,
    )}&body=${encodeURIComponent(body)}`
        .concat(recipient.copies_to ? `&cc=${encodeURIComponent(recipient.copies_to)}` : '')
        .concat(recipient.cci ? `&bcc=${encodeURIComponent(recipient.cci)}` : '');
};

export class MailTo extends Component {
    constructor(props) {
        super(props);
        this.contentMail = React.createRef();
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

    openMailer = (recipient, subject, body) => {
        const dest = buildMailDest(recipient, subject, body);
        ReactDOM.render(<iframe src={dest} />, this.contentMail.current);
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
        return (
            <a
                className={classnames(className, { disabled })}
                onClick={event => {
                    this.openMailer(recipient, subject, body);
                    setTimeout(() => afterMail(event), 500);
                    trackEvent(analyticsCategory, 'Click', 'button', 'SendMail', slug, step, {
                        disabled: disabled ? 'disabled' : 'active',
                        label,
                    });
                }}
                rel="noopener noreferrer"
                disabled={disabled}
            >
                {label}
                <div ref={this.contentMail} className="masked" />
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
    match: routeMatch,
};

export default glamorous(MailTo)(styles);
