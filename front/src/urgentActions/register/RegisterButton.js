import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';
import { withSessionData } from '../../DataContext';
import { routeMatch } from '../../propTypes';

const query = `
    mutation createActivist($civility: String!, $firstname: String!, $lastname: String!, $email: String!, $phone: String!) {
        data: createActivist(civility: $civility, firstname: $firstname, lastname: $lastname, email: $email, phone: $phone) {
            id
            civility
            firstname
            lastname
            email
            phone
        }
    }
`;

export class RegisterButton extends Component {
    register = () => {
        const {
            civility,
            firstname,
            lastname,
            phone,
            email,
            setRegistered,
            match: {
                params: { id },
            },
        } = this.props;

        setRegistered('true');

        return fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                operationName: 'createActivist',
                query,
                variables: {
                    query,
                    au: id,
                    civility,
                    firstname,
                    lastname,
                    phone,
                    email,
                },
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
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    setRegistered: PropTypes.func.isRequired,
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
