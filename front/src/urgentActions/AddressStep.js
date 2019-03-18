import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { withSessionData } from '../SessionDataContext';
import { withYellowLogo } from '../themes/ThemeContext';
import TextArea from '../themes/TextArea';
const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '16px',
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
    '& p': {
        margin: '20px 0px',
    },
    '& li': {
        margin: '16px 0px',
    },
    '& .importantText': {
        fontWeight: 'bold',
    },
    '& .normalText': {
        fontWeight: 'normal',
    },
    '& .stepList': {
        fontSize: '14px',
        marginLeft: 20,
        paddingLeft: 35,
        borderLeft: 'solid black 2px',
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
                        Aujourd’hui, votre combat est encore plus grand et impactant{' '}
                        <strong className="importantText">en faisant le choix du courrier.</strong>
                    </p>
                    <p className="importantText">Comment faire ?</p>
                    <p>
                        <ol className={classnames('importantText', 'stepList')}>
                            <li>
                                <span className="normalText">
                                    <strong className="importantText">Recevez la lettre</strong> au
                                    format PDF directement dans votre boite e-mail.
                                </span>
                            </li>
                            <li>Imprimez la lettre.</li>
                            <li>Postez la lettre.</li>
                        </ol>
                    </p>
                    <p>
                        Afin de personnaliser votre courrier, merci de renseigner votre adresse
                        postale.
                    </p>
                    <TextArea
                        rows="6"
                        value={address}
                        onChange={this.setAddress}
                        placeholder="Votre adresse postale"
                    />
                    <p>
                        Pour recevoir le courrier finalisé,{' '}
                        <strong className="importantText">
                            veuillez renseigner votre adresse e-mail.
                        </strong>
                    </p>
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

export default glamorous(compose(withYellowLogo, withSessionData)(AddressStep))(styles);
