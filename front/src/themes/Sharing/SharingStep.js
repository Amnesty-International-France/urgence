import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { black, green, grey, white } from '../colors';

const styles = {
    textDecoration: 'none',
    color: black,
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'none',
    lineHeight: '50px',
    display: 'flex',
    height: '50px',
    marginTop: 30,
    marginLeft: -18,
    position: 'relative',
    '& .icon': {
        marginRight: 10,
        height: '50px',
        zIndex: 2,
    },
    '& .text': {
        lineHeight: '50px',
    },
    '& .greenText': {
        color: green,
    },
    '& .number': {
        marginLeft: 13,
        position: 'absolute',
        zIndex: 3,
    },
    '& .mask': {
        marginTop: 15,
        height: 20,
        width: 10,
        marginLeft: 13,
        position: 'absolute',
        backgroundColor: white,
        zIndex: 1,
    },
    '& .top': {
        marginTop: -30,
        height: 65,
    },
};

export const SharingStep = ({ className, text, number, done }) => (
    <div className={className}>
        <FontAwesomeIcon
            icon={done ? faCheckCircle : faCircle}
            color={done ? green : grey}
            className="icon"
            size="2x"
        />
        {done && <span className={classnames('mask', { top: number === 1 })}>&nbsp;</span>}
        {!done && <span className="number">{number}</span>}
        <span className={classnames('text', { greenText: done })}>{text}</span>
    </div>
);

SharingStep.propTypes = {
    text: PropTypes.string.isRequired,
    number: PropTypes.number,
    done: PropTypes.bool,
    className: PropTypes.string,
};

SharingStep.defaultProps = {
    text: '',
    done: false,
    number: 1,
};

export default glamorous(SharingStep)(styles);
