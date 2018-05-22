import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { MailTo } from '../../themes/MailTo';
import { templateToBodyText } from './templateToBodyText';
import generateUrl from '../../services/generateUrl';
import { routeMatch } from '../../propTypes';

export class SendMail extends Component {
    afterMail = () => {
        const {
            history,
            match: { params },
        } = this.props;

        history.push(generateUrl('thanks', params));
    };

    render() {
        const { messageTemplate, recipient, object, signature } = this.props;

        return (
            <MailTo
                disabled={!object || !signature}
                label="Envoyer"
                recipient={recipient}
                subject={object}
                body={templateToBodyText(messageTemplate, signature)}
                afterMail={this.afterMail}
            />
        );
    }
}

SendMail.propTypes = {
    className: PropTypes.string,
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
    object: PropTypes.string,
    signature: PropTypes.string,
    match: routeMatch,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(SendMail);
