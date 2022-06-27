import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash.get';

import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import { withSessionData } from '../../DataContext';
import { registerContact } from '../../services/api';

type OwnProps = {
    auId: string;
    formValues?: any;
    setRegistered: (...args: any[]) => any;
    disabled?: boolean;
    buttonText: string;
    analyticsCategory?: string;
    step?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof RegisterButton.defaultProps;

// @ts-expect-error TS(7022): 'RegisterButton' implicitly has type 'any' because... Remove this comment to see the full error message
export const RegisterButton = ({
    disabled,
    buttonText,
    analyticsCategory,
    step,
    setRegistered,
    formValues,
    auId,
}: Props) => {
    const { firstname, lastname, phone, email, civility } = formValues;
    const register = () => {
        return registerContact(auId, { email, phone, firstname, lastname, civility }).then(
            (result) => {
                if (result.errors && result.errors.length) {
                    // eslint-disable-next-line no-console
                    console.log(
                        'Failed registering campaign member',
                        result.errors.map((error: any) => `- ${error.message}`).join('\n'),
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

RegisterButton.defaultProps = {
    formValues: {},
};

export default withSessionData(RegisterButton);
