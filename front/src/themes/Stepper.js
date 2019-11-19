import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';
import classNames from 'classnames';

import { black, darkGrey } from './colors';

const styles = {
    display: 'flex',
    justifyContent: 'center',
    '& .step': {
        height: '4px',
        width: '50px',
        margin: '0px 5px',
    },
    '& .done': {
        backgroundColor: black,
    },
    '& .todo': {
        backgroundColor: darkGrey,
    },
};

const steps = {
    story: 0,
    act: 1,
    message: 2,
    share: 3,
    register: 3,
};

const Stepper = ({ className, data, step, page }) => {
    const stepNumber = steps[step];
    if (stepNumber == null) {
        return null;
    }

    const story = get(data, 'UrgentAction.story');
    const current = page ? Number(page) + stepNumber + 1 : story.length + stepNumber;
    const total = story.length + 3;

    const stepStates = Array.from({ length: total }, (_, i) => (i < current ? 'done' : 'todo'));

    return (
        <div className={className}>
            {stepStates.map((stepState, i) => (
                <div key={i} className={classNames('step', stepState)} />
            ))}
        </div>
    );
};

Stepper.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object.isRequired,
    step: PropTypes.string,
    page: PropTypes.string,
};

export default glamorous(Stepper)(styles);
