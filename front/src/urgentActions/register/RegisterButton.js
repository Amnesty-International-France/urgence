import React from 'react';
import PropTypes from 'prop-types';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import { withSessionData } from '../../DataContext';

export const RegisterButton = ({
    disabled,
    buttonText,
    analyticsCategory,
    step,
    setRegistered,
}) => {
    const register = () => {
        setRegistered();
    };

    return (
        <ToUrgentActionPageLink
            onClick={register}
            pageName="thanks-end"
            label={buttonText}
            disabled={disabled}
            analyticsCategory={analyticsCategory}
            step={step}
            buttonName="Register"
        />
    );
};

RegisterButton.propTypes = {
    auId: PropTypes.string.isRequired,
    civility: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    setRegistered: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default withSessionData(RegisterButton);
