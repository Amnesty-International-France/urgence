import React, { Fragment } from 'react';

import Input, { isCorrectEmail, isCorrectPhone } from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';
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
        <Fragment>
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
            <RichText className="phone-indication" html={phoneIndication} />
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
