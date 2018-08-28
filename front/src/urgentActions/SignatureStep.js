import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { withSessionData } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';
import Input from '../themes/Input';

const styles = {
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
    '& .action': {
        marginTop: '53px',
    },
    '& p': {
        fontFamily: 'Amnesty Trade Gothic',
        fontWeight: 'bold',
        fontSize: 18,
    },
};

export class SignatureStep extends Component {
    setSignature = event => this.props.setSignature(event.target.value);

    render() {
        const { action, className, signature } = this.props;

        return (
            <div className={classnames('signature', className)}>
                <div>
                    <p>
                        Parce que les actions uniques sont un message personnel, nous vous invitons
                        à renseigner vos nom et prénom.
                    </p>
                    <Input value={signature} onChange={this.setSignature} />
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

export default glamorous(
    compose(
        withBlackLogo,
        withSessionData,
    )(SignatureStep),
)(styles);
