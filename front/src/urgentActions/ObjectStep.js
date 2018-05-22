import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import { SessionDataConsumer } from '../SessionDataContext';

const styles = {
    height: '100vh',
    overflow: 'auto',
    fontSize: 24,
    '& > *': {
        flex: '1 0 0',
    },
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
    },
    '& input': {
        margin: '2em 0',
        width: '100%',
        fontSize: 14,
        lineHeight: '40px',
        padding: '0 15px',
    },
    padding: '2rem 2rem',
};

export const ObjectStep = ({ objectIndication, className, action }) => (
    <SessionDataConsumer>
        {({ object, changeObject }) => (
            <div className={className}>
                <p>
                    Parce que les messages uniques ont plus d&#39;impact, nous vous invitons à
                    personnaliser son sujet.
                </p>
                <input
                    value={object}
                    onChange={changeObject}
                    placeholder="Objet de votre message"
                />
                <RichText html={objectIndication} />
                {action}
            </div>
        )}
    </SessionDataConsumer>
);

ObjectStep.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string.isRequired,
    object: PropTypes.string.isRequired,
    action: PropTypes.node.isRequired,
};

export default glamorous(ObjectStep)(styles);
