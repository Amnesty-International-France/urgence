import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { withSessionData } from '../SessionDataContext';
import { withYellowLogo } from '../themes/ThemeContext';
import Input from '../themes/Input';

export class EmailStep extends Component {
    setEmail = event => this.props.setEmail(event.target.value);

    render() {
        const { action, className, email } = this.props;
        return (
            <div className={classnames(className, 'email-step')}>
                <div>
                    <p>Nous y sommes presque !</p>
                    <p>
                        Indiquez-nous votre email pour vous faire parvenir votre lettre à envoyer
                        par courrier.
                    </p>
                    <Input
                        type="email"
                        value={email}
                        onChange={this.setEmail}
                        placeholder="Votre adresse email"
                    />
                </div>
                <div className="action">{action(!email)}</div>
            </div>
        );
    }
}

EmailStep.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    className: PropTypes.string,
    action: PropTypes.func,
};

export default glamorous(
    compose(
        withYellowLogo,
        withSessionData,
    )(EmailStep),
)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    padding: '105px 2rem 53px',
    justifyContent: 'space-between',
    '& .action': {
        marginTop: '53px',
    },
});
