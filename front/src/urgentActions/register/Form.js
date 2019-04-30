import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input, { isCorrectEmail } from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';

const Form = ({
    analyticsCategory,
    step,
    email,
    phone,
    civility,
    firstname,
    lastname,
    setEmail,
    setPhone,
    setCivility,
    setFirstname,
    setLastname,
}) => {
    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const handleChangePhone = event => {
        setPhone(event.target.value);
    };

    const handleChangeCivility = event => {
        setCivility(event.target.value);
    };

    const handleChangeFirstname = event => {
        setFirstname(event.target.value);
    };

    const handleChangeLastname = event => {
        setLastname(event.target.value);
    };

    return (
        <Fragment>
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
            <Input
                className="phone"
                type="phone"
                value={phone}
                onChange={handleChangePhone}
                error={!phone}
                autoComplete="phone"
                analyticsCategory={analyticsCategory}
                step={step}
                label="Votre téléphone mobile *"
                inputProps={{ autoFocus: true }}
            />
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
        </Fragment>
    );
};

Form.propTypes = {
    className: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default Form;
