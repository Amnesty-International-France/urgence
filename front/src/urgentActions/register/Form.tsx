import React, { Fragment } from 'react';

// @ts-expect-error TS(6142): Module '../../themes/Input' was resolved to '/home... Remove this comment to see the full error message
import Input, { isCorrectEmail, isCorrectPhone } from '../../themes/Input';
// @ts-expect-error TS(6142): Module '../../themes/RadioButton' was resolved to ... Remove this comment to see the full error message
import RadioButton from '../../themes/RadioButton';
// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
import RichText from '../../themes/RichText';

type OwnProps = {
    analyticsCategory?: string;
    step?: string;
    civility?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneIndication?: string;
    phone?: string;
    setCivility: (...args: any[]) => any;
    setFirstname: (...args: any[]) => any;
    setLastname: (...args: any[]) => any;
    setEmail: (...args: any[]) => any;
    setPhone: (...args: any[]) => any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Form.defaultProps;

// @ts-expect-error TS(7022): 'Form' implicitly has type 'any' because it does n... Remove this comment to see the full error message
const Form = ({
    analyticsCategory,
    step,
    civility,
    firstname,
    lastname,
    email,
    phoneIndication,
    phone,
    setCivility,
    setFirstname,
    setLastname,
    setEmail,
    setPhone,
}: Props) => {
    const handleChangeCivility = (event: any) => {
        setCivility(event.target.value);
    };

    const handleChangeFirstname = (event: any) => {
        setFirstname(event.target.value);
    };

    const handleChangeLastname = (event: any) => {
        setLastname(event.target.value);
    };

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const handleChangePhone = (event: any) => {
        setPhone(event.target.value);
    };

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Fragment>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RadioButton
                value={civility}
                name="civility"
                onChange={handleChangeCivility}
                error={!civility}
                analyticsCategory={analyticsCategory}
                step={step}
                label="Civilité *"
                autoComplete="civility"
                choices={['M.', 'Mme.', 'Autre']}
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                className="firstname"
                value={firstname}
                onChange={handleChangeFirstname}
                error={!firstname}
                analyticsCategory={analyticsCategory}
                step={step}
                autoComplete="given-name"
                label="Votre prénom *"
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                className="lastname"
                value={lastname}
                onChange={handleChangeLastname}
                error={!lastname}
                analyticsCategory={analyticsCategory}
                step={step}
                autoComplete="family-name"
                label="Votre nom *"
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                className="email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
                error={!isCorrectEmail(email)}
                autoComplete="email"
                analyticsCategory={analyticsCategory}
                step={step}
                label="Votre adresse e-mail *"
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RichText className="phone-indication" html={phoneIndication} />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                className="phone"
                type="phone"
                value={phone}
                onChange={handleChangePhone}
                error={!isCorrectPhone(phone)}
                autoComplete="phone"
                analyticsCategory={analyticsCategory}
                step={step}
                label="Votre téléphone mobile *"
                helperText="(+33) 6 XX XX XX XX"
            />
        </Fragment>
    );
};

Form.defaultProps = {};

export default Form;
