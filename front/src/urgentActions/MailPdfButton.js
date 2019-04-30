import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
import { withSessionData } from '../DataContext';
import { routeMatch } from '../propTypes';

export class MailPdfButton extends Component {
    sendMail = () => {
        const {
            object: subject,
            civility,
            firstname,
            lastname,
            addressMain,
            addressMore,
            postalCode,
            city,
            country,
            email,
            match: {
                params: { id },
            },
        } = this.props;

        return fetch(generateUrl('letter', { id }), {
            method: 'POST',
            body: JSON.stringify({
                subject,
                civility,
                firstname,
                lastname,
                addressMain,
                addressMore,
                postalCode,
                city,
                country,
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
                onClick={this.sendMail}
                pageName="thanks-end"
                label={buttonText}
                disabled={disabled}
                analyticsCategory={analyticsCategory}
                step={step}
                buttonName="SendLetterManually"
            />
        );
    }
}

MailPdfButton.propTypes = {
    object: PropTypes.string.isRequired,
    civility: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    addressMain: PropTypes.string.isRequired,
    addressMore: PropTypes.string,
    postalCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    match: routeMatch,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default compose(
    withSessionData,
    withRouter,
)(MailPdfButton);
