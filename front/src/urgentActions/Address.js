import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { SessionDataConsumer } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';

export class Address extends Component {
    setAddress = event => this.props.setAddress(event.target.value);

    render() {
        const { action, className, address } = this.props;
        return (
            <div className={className}>
                <div>
                    <p>
                        Pour être plus efficace, vous devez être identifié personnellement dans la
                        lettre que vous envoyez.
                    </p>
                    <p>Pouvez vous renseigner votre adresse ?</p>
                    <textarea rows="3" value={address} onChange={this.setAddress} />
                </div>
                <div className="action">{action}</div>
            </div>
        );
    }
}

Address.propTypes = {
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.node,
};

export const AddressWithSessionData = ({ action, className }) => (
    <SessionDataConsumer>
        {({ address, setAddress }) => (
            <Address
                action={action}
                className={className}
                address={address}
                setAddress={setAddress}
            />
        )}
    </SessionDataConsumer>
);

AddressWithSessionData.propTypes = {
    setAddress: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.node,
};

export default glamorous(withBlackLogo(AddressWithSessionData))({
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
