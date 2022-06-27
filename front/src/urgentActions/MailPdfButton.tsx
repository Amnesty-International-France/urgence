import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';

import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
// @ts-expect-error TS(6142): Module '../DataContext' was resolved to '/home/gui... Remove this comment to see the full error message
import { withSessionData } from '../DataContext';
import { paramsType } from '../propTypes';

type Props = {
    auId: string;
    object: string;
    civility: string;
    firstname: string;
    lastname: string;
    addressMain: string;
    addressMore?: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
    // @ts-expect-error TS(2749): 'paramsType' refers to a value, but is being used ... Remove this comment to see the full error message
    match?: paramsType;
    disabled?: boolean;
    buttonText: string;
    analyticsCategory?: string;
    step?: string;
};

export class MailPdfButton extends Component<Props> {
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

export default compose(withSessionData)(MailPdfButton);
