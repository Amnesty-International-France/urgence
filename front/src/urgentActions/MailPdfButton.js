import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
import { withSessionData } from '../SessionDataContext';

export class MailPdfButton extends Component {
    sendMail = () => {
        const {
            object: subject,
            signature,
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
                signature,
                address,
                email,
            }),
            headers: {
                'content-type': 'application/json',
            },
        });
    };
    render() {
        return (
            <ToUrgentActionPageLink
                onClick={this.sendMail}
                pageName="thanks-letter"
                label="Envoyer"
            />
        );
    }
}

MailPdfButton.propTypes = {
    object: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired,
};

export default compose(withSessionData, withRouter)(MailPdfButton);
