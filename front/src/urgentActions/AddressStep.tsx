import React, { Component } from 'react';
import styled from '@emotion/styled';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import classnames from 'classnames';

// @ts-expect-error TS(6142): Module '../DataContext' was resolved to '/home/gui... Remove this comment to see the full error message
import { withSessionData } from '../DataContext';
// @ts-expect-error TS(6142): Module '../themes/ThemeContext' was resolved to '/... Remove this comment to see the full error message
import { withYellowLogo } from '../themes/ThemeContext';
// @ts-expect-error TS(6142): Module '../themes/Input' was resolved to '/home/gu... Remove this comment to see the full error message
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

type Props = {
    addressMain: string;
    addressMore: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
    setAddressMain: (...args: any[]) => any;
    setAddressMore: (...args: any[]) => any;
    setPostalCode: (...args: any[]) => any;
    setCity: (...args: any[]) => any;
    setCountry: (...args: any[]) => any;
    setEmail: (...args: any[]) => any;
    className?: string;
    action?: (...args: any[]) => any;
    analyticsCategory?: string;
    step?: string;
};

export class AddressStep extends Component<Props> {
    setAddressMain = (event: any) => this.props.setAddressMain(event.target.value);
    setAddressMore = (event: any) => this.props.setAddressMore(event.target.value);
    setPostalCode = (event: any) => this.props.setPostalCode(event.target.value);
    setCity = (event: any) => this.props.setCity(event.target.value);
    setCountry = (event: any) => this.props.setCountry(event.target.value);
    setEmail = (event: any) => this.props.setEmail(event.target.value);

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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={classnames('address', className)}>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p>
                        Aujourd’hui, votre combat est encore plus grand et impactant{' '}
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <strong className="importantText">en faisant le choix du courrier.</strong>
                    </p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className="importantText">Comment faire ?</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <ol className={classnames('importantText', 'stepList')}>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <li>
                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <span className="normalText">
                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <strong className="importantText">Recevez la lettre</strong> au
                                    format PDF directement dans votre boite e-mail.
                                </span>
                            </li>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <li>Imprimez la lettre.</li>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <li>Postez la lettre.</li>
                        </ol>
                    </span>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p>
                        Afin de personnaliser votre courrier, merci de renseigner votre adresse
                        postale.
                    </p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="cityZone">
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className="lastParagraph">
                        Pour recevoir le courrier finalisé,{' '}
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <strong className="importantText">
                            veuillez renseigner votre adresse e-mail.
                        </strong>
                    </p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="action">{action(this.isDisabled())}</div>
            </div>
        );
    }
}

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(compose(withYellowLogo, withSessionData)(AddressStep))(styles);
