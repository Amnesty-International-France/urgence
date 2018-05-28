import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import RichText from '../themes/RichText';
import { withSessionData } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';

const styles = {
    backgroundColor: 'white',
    height: '100%',
    fontSize: 24,
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 1024px)': {
        padding: '30vh 30vw',
        '& .action': {
            alignSelf: 'flex-end',
        },
    },
    '& p': {
        fontFamily: 'Amnesty Trade Gothic',
        fontWeight: 'bold',
        fontSize: 18,
    },
    '& .rich-text': {
        fontFamily: 'Amnesty Trade Gothic',
        fontSize: '1rem',
        fontStyle: 'italic',
        color: '#C1C1C1',
        flex: 1,
    },
    '& input': {
        margin: '2em 0',
        width: '100%',
        fontSize: 14,
        lineHeight: '40px',
        height: 40,
        padding: '0 15px',
    },
    padding: '105px 2rem 53px',
};

export class ObjectStep extends Component {
    setObject = event => this.props.setObject(event.target.value);
    render() {
        const { objectIndication, className, action, object } = this.props;
        return (
            <div className={classnames('object', className)}>
                <p>
                    Parce que les messages uniques ont plus d&#39;impact, nous vous invitons à
                    personnaliser son sujet.
                </p>
                <input
                    value={object}
                    onChange={this.setObject}
                    placeholder="Objet de votre message"
                />
                <RichText html={objectIndication} />
                <div className="action">{action(!object)}</div>
            </div>
        );
    }
}

ObjectStep.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    object: PropTypes.string,
    setObject: PropTypes.func.isRequired,
};

export default glamorous(compose(withBlackLogo, withSessionData)(ObjectStep))(styles);
