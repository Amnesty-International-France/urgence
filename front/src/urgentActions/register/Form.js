import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from '../../themes/Input';

const Form = ({
    analyticsCategory,
    step,
    email,
    phone,
    surname,
    name,
    setEmail,
    setPhone,
    setSurname,
    setName,
}) => {
    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const handleChangePhone = event => {
        setPhone(event.target.value);
    };

    const handleChangeSurname = event => {
        setSurname(event.target.value);
    };

    const handleChangeName = event => {
        setName(event.target.value);
    };

    return (
        <Fragment>
            <Input
                className="email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
                error={!email}
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
            <Input
                className="surname"
                value={surname}
                onChange={handleChangeSurname}
                error={!surname}
                analyticsCategory={analyticsCategory}
                step={step}
                autoComplete="given-name"
                label="Votre prénom *"
            />
            <Input
                className="name"
                value={name}
                onChange={handleChangeName}
                error={!name}
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
    surname: PropTypes.string,
    name: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    setSurname: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default Form;
