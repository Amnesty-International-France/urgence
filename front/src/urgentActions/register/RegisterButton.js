import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import { withSessionData } from '../../DataContext';
import { registerContact } from '../../services/api';

export const RegisterButton = ({
    disabled,
    buttonText,
    analyticsCategory,
    step,
    setRegistered,
    formValues,
    auId,
}) => {
    const { firstname, lastname, phone, email, civility } = formValues;
    const register = () => {
        return registerContact(auId, { email, phone, firstname, lastname, civility }).then(
            (result) => {
                if (result.errors && result.errors.length) {
                    // eslint-disable-next-line no-console
                    console.log(
                        'Failed registering campaign member',
                        result.errors.map((error) => `- ${error.message}`).join('\n'),
                    );
                }
                const isRegistered = get(result, 'data.registerContact.registered', false);
                setRegistered(isRegistered ? 'true' : 'false');
            },
        );
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
    formValues: PropTypes.object,
    setRegistered: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

RegisterButton.defaultProps = {
    formValues: {},
};

export default withSessionData(RegisterButton);
