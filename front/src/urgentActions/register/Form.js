import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input, { isCorrectEmail, isCorrectPhone } from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';
import RichText from '../../themes/RichText';

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
}) => {
    const handleChangeCivility = (event) => {
        setCivility(event.target.value);
    };

    const handleChangeFirstname = (event) => {
        setFirstname(event.target.value);
    };

    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePhone = (event) => {
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

Form.propTypes = {
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    phoneIndication: PropTypes.string,
    phone: PropTypes.string,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
};

Form.defaultProps = {};

export default Form;
