import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';

import { black, white } from './colors';

const style = {
    height: '100%',
    width: '100%',
};

const Container = glamorous.div({
    ...style,
    display: 'inline-flex',
    '& :first-child': {
        borderLeft: '0px',
    },
    '& :last-child': {
        borderRight: '0px',
    },
    position: 'fixed',
    bottom: 0,
    height: '10px',
});

const stepStyle = {
    border: '0.5px solid',
    borderColor: black,
    borderTop: '0',
    borderBottom: '0',
    backgroundColor: white,
    transition: 'all ease-in 0.2s',
};

const FilledStep = glamorous.div({
    ...style,
    ...stepStyle,
    backgroundColor: black,
});

const steps = {
    story: 0,
    act: 1,
    message: 2,
    share: 3,
    register: 3,
};

const Steps = ({ data, step, page }) => {
    const stepNumber = steps[step];
    if (stepNumber == null) {
        return null;
    }

    const story = get(data, 'UrgentAction.story');
    const current = page ? Number(page) + stepNumber + 1 : story.length + stepNumber;
    const total = story.length + 3;

    return (
        <Container title={`Step ${current}/${total}`}>
            {[...Array(total)].map((_, index) => (
                <FilledStep
                    key={index}
                    style={{ backgroundColor: index < current ? black : white }}
                />
            ))}
        </Container>
    );
};

Steps.propTypes = {
    data: PropTypes.object.isRequired,
    step: PropTypes.string.isRequired,
    page: PropTypes.string,
};

export default Steps;
