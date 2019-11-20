import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input, { isCorrectEmail } from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';

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
}) => {
    const handleChangeCivility = event => {
        setCivility(event.target.value);
    };

    const handleChangeFirstname = event => {
        setFirstname(event.target.value);
    };

    const handleChangeLastname = event => {
        setLastname(event.target.value);
    };

    const handleChangeEmail = event => {
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

Form.propTypes = {
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
};

export default Form;
