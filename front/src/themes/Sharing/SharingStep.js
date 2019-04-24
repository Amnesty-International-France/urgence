import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import glamorous from 'glamorous';

import { black, green, orange } from '../colors';

const styles = {
    textDecoration: 'none',
    color: black,
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: 16,
    textTransform: 'none',
    '& .icon': {
        marginRight: 10,
    },
};

export const SharingStep = ({ className, text, done }) => (
    <span
        className={classnames(className, 'twitter-share-button')}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="facebook"
        title="Partage facebook"
    >
        <FontAwesomeIcon
            icon={done ? faCheckCircle : faCircle}
            color={done ? green : orange}
            className="icon"
        />
        {text}
    </span>
);

SharingStep.propTypes = {
    text: PropTypes.string.isRequired,
    done: PropTypes.bool,
};

SharingStep.defaultProps = {
    text: '',
    done: false,
};

export default glamorous(SharingStep)(styles);
