import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { withSessionData } from '../SessionDataContext';
import { withYellowLogo } from '../themes/ThemeContext';
import TextArea from '../themes/TextArea';
const styles = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    padding: '105px 2rem 53px',
    justifyContent: 'space-between',
    '& textarea': {
        width: '100%',
        fontSize: 17,
        fontFamily: 'Amnesty Trade Gothic',
        margin: '2em 0',
        padding: '15px',
    },
    '& .action': {
        marginTop: '53px',
    },
};

export class AddressStep extends Component {
    setAddress = event => this.props.setAddress(event.target.value);

    render() {
        const { action, className, address } = this.props;
        return (
            <div className={classnames('address', className)}>
                <div>
                    <p>
                        Pour être plus efficace, vous devez être identifié personnellement dans la
                        lettre que vous envoyez.
                    </p>
                    <p>Pouvez vous renseigner votre adresse ?</p>
                    <TextArea
                        rows="6"
                        value={address}
                        onChange={this.setAddress}
                        placeholder="Votre adresse postale"
                    />
                </div>
                <div className="action">{action(!address)}</div>
            </div>
        );
    }
}

AddressStep.propTypes = {
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.func,
};

export default glamorous(
    compose(
        withYellowLogo,
        withSessionData,
    )(AddressStep),
)(styles);
