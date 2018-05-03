import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { MailTo } from '../../themes/MailTo';
import CarouselSlide from '../../themes/CarouselSlide';
import sessionData from '../../sessionData';
import { templateToBodyText } from './templateToBodyText';

export class SignatureStep extends Component {
    state = {
        signature: sessionData.getSignature() || '',
    };

    changeSignature = e => {
        const signature = e.target.value;
        this.setState({ signature });
        sessionData.setSignature(signature);
    };

    render() {
        const { messageTemplate, recipient, className } = this.props;
        const { signature } = this.state;

        return (
            <CarouselSlide className={className}>
                <p>
                    Parce que les actions uniques sont un message personnel,
                    nous vous invitons à renseigner vos noms et prénoms.
                </p>
                <textarea
                    rows="5"
                    value={signature}
                    onChange={this.changeSignature}
                />
                <MailTo
                    label="Send mail"
                    recipient={recipient}
                    body={templateToBodyText(messageTemplate)}
                    signature={signature}
                />
            </CarouselSlide>
        );
    }
}

SignatureStep.propTypes = {
    className: PropTypes.string,
    messageTemplate: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string.isRequired }),
    ),
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
};

export default glamorous(SignatureStep)({
    '& textarea': {
        width: '80%',
        fontSize: 24,
        margin: '2rem 3rem',
    },
});
