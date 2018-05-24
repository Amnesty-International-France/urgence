import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { SessionDataConsumer } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';

export class SignatureStep extends Component {
    setSignature = event => this.props.setSignature(event.target.value);

    render() {
        const { action, className, signature } = this.props;
        return (
            <div className={className}>
                <div>
                    <p>
                        Parce que les actions uniques sont un message personnel, nous vous invitons
                        à renseigner vos nom et prénom.
                    </p>
                    <textarea rows="3" value={signature} onChange={this.setSignature} />
                </div>
                <div className="action">{action}</div>
            </div>
        );
    }
}

SignatureStep.propTypes = {
    signature: PropTypes.string.isRequired,
    setSignature: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.node,
};

export const SignatureStepWithSessionData = ({ action, className }) => (
    <SessionDataConsumer>
        {({ signature, setSignature }) => (
            <SignatureStep
                action={action}
                className={className}
                signature={signature}
                setSignature={setSignature}
            />
        )}
    </SessionDataConsumer>
);

SignatureStepWithSessionData.propTypes = {
    setSignature: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.node,
};

export default glamorous(withBlackLogo(SignatureStepWithSessionData))({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    padding: '105px 2rem 53px',
    justifyContent: 'space-between',
    '@media (min-width: 1024px)': {
        padding: '30vh 30vw',
        '& .action': {
            alignSelf: 'flex-end',
        },
    },
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
    '& p': {
        fontFamily: 'Amnesty Trade Gothic',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
