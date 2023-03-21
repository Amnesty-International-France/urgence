import { Fragment } from 'react';

import Input, { isCorrectEmail } from '../../themes/Input';
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
        </Fragment>
    );
};

export default Form;
