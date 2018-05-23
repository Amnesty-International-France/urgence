import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { SessionDataConsumer } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';

export const renderSignatureStep = ({ action, className }) => ({ signature, changeSignature }) => (
    <div className={className}>
        <p>
            Parce que les actions uniques sont un message personnel, nous vous invitons à renseigner
            vos noms et prénoms.
        </p>
        <textarea rows="5" value={signature} onChange={changeSignature} />
        <div className="action">{action}</div>
    </div>
);

export const SignatureStep = ({ action, className }) => (
    <SessionDataConsumer>{renderSignatureStep({ action, className })}</SessionDataConsumer>
);

SignatureStep.propTypes = {
    className: PropTypes.string,
    action: PropTypes.node,
};

export default glamorous(withBlackLogo(SignatureStep))({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100vh',
    padding: '105px 2rem 53px',
    justifyContent: 'space-between',
    '& textarea': {
        width: '100%',
        fontSize: 24,
    },
    '& .action': {
        marginTop: '53px',
    },
});
