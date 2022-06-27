import React, { Fragment } from 'react';

// @ts-expect-error TS(6142): Module '../../themes/Input' was resolved to '/home... Remove this comment to see the full error message
import Input, { isCorrectEmail } from '../../themes/Input';
// @ts-expect-error TS(6142): Module '../../themes/RadioButton' was resolved to ... Remove this comment to see the full error message
import RadioButton from '../../themes/RadioButton';

type Props = {
    analyticsCategory?: string;
    step?: string;
    civility?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    setCivility: (...args: any[]) => any;
    setFirstname: (...args: any[]) => any;
    setLastname: (...args: any[]) => any;
    setEmail: (...args: any[]) => any;
};

export const Form = ({
    email,
    civility,
    firstname,
    lastname,
    analyticsCategory,
    step,
    setEmail,
    setCivility,
    setFirstname,
    setLastname,
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
        </Fragment>
    );
};

export default Form;
