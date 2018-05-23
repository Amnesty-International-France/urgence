import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import { SessionDataConsumer } from '../SessionDataContext';
import { withBlackLogo } from '../themes/ThemeContext';

const styles = {
    backgroundColor: 'white',
    height: '100vh',
    overflow: 'auto',
    fontSize: 24,
    display: 'flex',
    flexDirection: 'column',
    '& p': {
        fontFamily: 'Amnesty Trade Gothic',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: '1.5em',
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

export const renderObjectStep = ({ objectIndication, className, action }) => ({
    object,
    changeObject,
}) => (
    <div className={className}>
        <p>
            Parce que les messages uniques ont plus d&#39;impact, nous vous invitons à personnaliser
            son sujet.
        </p>
        <input value={object} onChange={changeObject} placeholder="Objet de votre message" />
        <RichText html={objectIndication} />
        <div className="action">{action(!object)}</div>
    </div>
);

export const ObjectStep = props => (
    <SessionDataConsumer>{renderObjectStep(props)}</SessionDataConsumer>
);

ObjectStep.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string.isRequired,
    action: PropTypes.node.isRequired,
};

export default glamorous(withBlackLogo(ObjectStep))(styles);
