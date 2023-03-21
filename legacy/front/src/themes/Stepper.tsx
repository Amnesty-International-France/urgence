import React from 'react';
import styled from '@emotion/styled';
import get from 'lodash.get';
import classNames from 'classnames';

import { black, darkGrey } from 'amnesty-components';

const styles = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0px 15px',
    '& .step': {
        height: '4px',
        maxWidth: '60px',
        margin: '0px 3px',
        transition: 'background-color 0.25s ease',
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
    'message-view': 2,
    'message-send': 3,
};

type Props = {
    className?: string;
    data: any;
    step?: string;
    page?: string;
};

const Stepper = ({ className, data, step, page }: Props) => {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    const stepNumber = steps[step];
    if (stepNumber == null) {
        return null;
    }

    const story = get(data, 'UrgentAction.story');
    const current = page ? Number(page) + stepNumber + 1 : story.length + stepNumber;
    const total = story.length + 3;

    const stepStates = Array.from({ length: total }, (_, i) => (i < current ? 'done' : 'todo'));
    const stepStyle = { width: `calc(${100 / total}% - 6px)` };

    return (
        <div className={className}>
            {stepStates.map((stepState, i) => (
                <div key={i} className={classNames('step', stepState)} style={stepStyle} />
            ))}
        </div>
    );
};

export default styled(Stepper)(styles);
