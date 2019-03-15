import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
import { withSessionData } from '../SessionDataContext';
import { routeMatch } from '../propTypes';

export class MailPdfButton extends Component {
    sendMail = () => {
        const {
            object: subject,
            civility,
            surname,
            name,
            address,
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
                surname,
                name,
                address,
                email,
            }),
            headers: {
                'content-type': 'application/json',
            },
        });
    };
    render() {
        const { disabled } = this.props;

        return (
            <ToUrgentActionPageLink
                onClick={this.sendMail}
                pageName="thanks-letter"
                label="Envoyer"
                disabled={disabled}
            />
        );
    }
}

MailPdfButton.propTypes = {
    object: PropTypes.string.isRequired,
    civility: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    match: routeMatch,
    disabled: PropTypes.bool,
};

export default compose(withSessionData, withRouter)(MailPdfButton);
