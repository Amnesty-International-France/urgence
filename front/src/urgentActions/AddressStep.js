import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { withSessionData } from '../DataContext';
import { withYellowLogo } from '../themes/ThemeContext';
import Input from '../themes/Input';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '0.8em',
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '100px 20px 20px 20px',
    justifyContent: 'space-between',
    '& textarea': {
        width: '100%',
        fontSize: 17,
        fontFamily: 'Amnesty Trade Gothic',
        margin: '2em 0',
        padding: '15px',
    },
    '& .action': {
        display: 'flex',
        margin: '1em 0',
    },
    '@media (min-width: 350px)': {
        fontSize: '18px',
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& p': {
        marginBottom: 20,
    },
    '& .lastParagraph': {
        marginTop: 20,
        marginBottom: 0,
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
        marginBottom: 20,
        paddingLeft: 35,
        borderLeft: 'solid black 2px',
    },
    '& .cityZone': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '& .postalCode': {
            flex: '4',
            minWidth: '115px',
            marginRight: '8px',
        },
    },
    '& .oneTiers': {
        width: '33%',
    },
    '& .twoTiers': {
        width: '62%',
    },
};

export class AddressStep extends Component {
    setAddressMain = event => this.props.setAddressMain(event.target.value);
    setAddressMore = event => this.props.setAddressMore(event.target.value);
    setPostalCode = event => this.props.setPostalCode(event.target.value);
    setCity = event => this.props.setCity(event.target.value);
    setCountry = event => this.props.setCountry(event.target.value);
    setEmail = event => this.props.setEmail(event.target.value);

    isDisabled = () => {
        const { addressMain, postalCode, city, country, email } = this.props;
        return !addressMain || !postalCode || !city || !country || !email;
    };

    render() {
        const {
            action,
            className,
            addressMain,
            addressMore,
            postalCode,
            city,
            country,
            email,
            analyticsCategory,
            step,
        } = this.props;

        return (
            <div className={classnames('address', className)}>
                <div>
                    <p>
                        Aujourd’hui, votre combat est encore plus grand et impactant{' '}
                        <strong className="importantText">en faisant le choix du courrier.</strong>
                    </p>
                    <p className="importantText">Comment faire ?</p>
                    <span>
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
                    </span>
                    <p>
                        Afin de personnaliser votre courrier, merci de renseigner votre adresse
                        postale.
                    </p>
                    <Input
                        className="addressMain"
                        value={addressMain}
                        onChange={this.setAddressMain}
                        error={!addressMain}
                        autoComplete="address-line1"
                        analyticsCategory={analyticsCategory}
                        step={step}
                        label="Adresse"
                    />
                    <Input
                        className="addressMore"
                        value={addressMore}
                        onChange={this.setAddressMore}
                        noValidate
                        autoComplete="address-line2"
                        analyticsCategory={analyticsCategory}
                        step={step}
                        label="Complément d'adresse"
                    />
                    <div className="cityZone">
                        <Input
                            className={classnames('oneTiers', 'postalCode')}
                            value={postalCode}
                            onChange={this.setPostalCode}
                            error={!postalCode}
                            autoComplete="postal-code"
                            analyticsCategory={analyticsCategory}
                            step={step}
                            label="Code postal"
                        />
                        <Input
                            className={classnames('twoTiers', 'city')}
                            value={city}
                            onChange={this.setCity}
                            error={!city}
                            autoComplete="address-level2"
                            analyticsCategory={analyticsCategory}
                            step={step}
                            label="Ville"
                        />
                    </div>
                    <Input
                        className={classnames('twoTiers', 'country')}
                        value={country}
                        onChange={this.setCountry}
                        error={!country}
                        autoComplete="country"
                        analyticsCategory={analyticsCategory}
                        step={step}
                        label="Pays"
                    />
                    <p className="lastParagraph">
                        Pour recevoir le courrier finalisé,{' '}
                        <strong className="importantText">
                            veuillez renseigner votre adresse e-mail.
                        </strong>
                    </p>
                    <Input
                        className="email"
                        type="email"
                        value={email}
                        onChange={this.setEmail}
                        error={!email}
                        autoComplete="email"
                        analyticsCategory={analyticsCategory}
                        step={step}
                        label="E-mail"
                    />
                </div>
                <div className="action">{action(this.isDisabled())}</div>
            </div>
        );
    }
}

AddressStep.propTypes = {
    addressMain: PropTypes.string.isRequired,
    addressMore: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    setAddressMain: PropTypes.func.isRequired,
    setAddressMore: PropTypes.func.isRequired,
    setPostalCode: PropTypes.func.isRequired,
    setCity: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.func,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default glamorous(compose(withYellowLogo, withSessionData)(AddressStep))(styles);
