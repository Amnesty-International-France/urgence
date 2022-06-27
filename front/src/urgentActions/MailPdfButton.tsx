import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
import { withSessionData } from '../DataContext';
import { paramsType } from '../propTypes';

export class MailPdfButton extends Component {
    sendMail = () => {
        const {
            auId,
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
        } = this.props;

        return fetch(generateUrl('letter', { id: auId }), {
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
    auId: PropTypes.string.isRequired,
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
    match: paramsType,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default compose(withSessionData)(MailPdfButton);
