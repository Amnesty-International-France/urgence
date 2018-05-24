import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { SessionDataConsumer } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';

export class EmailStep extends Component {
    setEmail = event => this.props.setEmail(event.target.value);

    render() {
        const { action, className, email } = this.props;
        return (
            <div className={className}>
                <div>
                    <p>Nous y sommes presque !</p>
                    <p>
                        Indiquez-nous votre email pour vous faire parvenir votre lettre à envoyer
                        par courrier.
                    </p>
                    <textarea rows="3" value={email} onChange={this.setEmail} />
                </div>
                <div className="action">{action}</div>
            </div>
        );
    }
}

EmailStep.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.node,
};

export const EmailStepWithSessionData = ({ action, className }) => (
    <SessionDataConsumer>
        {({ address, setEmail }) => (
            <EmailStep
                action={action}
                className={className}
                address={address}
                setEmail={setEmail}
            />
        )}
    </SessionDataConsumer>
);

EmailStepWithSessionData.propTypes = {
    setEmail: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.node,
};

export default glamorous(withBlackLogo(EmailStepWithSessionData))({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    padding: '105px 2rem 53px',
    justifyContent: 'space-between',
    '& textarea': {
        width: '100%',
        fontSize: 14,
        fontFamily: 'Amnesty Trade Gothic',
        margin: '2em 0',
        padding: '0 15px',
    },
    '& .action': {
        marginTop: '53px',
    },
});
