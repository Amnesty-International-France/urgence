import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import generateUrl from '../../services/generateUrl';
import { withSessionData } from '../../SessionDataContext';
import { routeMatch } from '../../propTypes';

export class RegisterButton extends Component {
    register = () => {
        const {
            civility,
            surname,
            name,
            phone,
            email,
            match: {
                params: { id },
            },
        } = this.props;

        return fetch(generateUrl('save-register', { id }), {
            method: 'POST',
            body: JSON.stringify({
                civility,
                surname,
                name,
                phone,
                email,
            }),
            headers: {
                'content-type': 'application/json',
            },
        });
    };
    render() {
        const { disabled, buttonText, analyticsCategory, step } = this.props;

        return (
            <ToUrgentActionPageLink
                onClick={this.register}
                pageName="thanks-end"
                label={buttonText}
                disabled={disabled}
                analyticsCategory={analyticsCategory}
                step={step}
                buttonName="Register"
            />
        );
    }
}

RegisterButton.propTypes = {
    civility: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    match: routeMatch,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default compose(
    withSessionData,
    withRouter,
)(RegisterButton);
