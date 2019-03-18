import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { black, white, yellow } from './colors';

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
});

const stepStyle = {
    border: '1px solid',
    borderColor: black,
    borderTop: '0',
    borderBottom: '0',
};

const FilledStep = glamorous.div({
    ...style,
    ...stepStyle,
    backgroundColor: yellow,
});

const EmptyStep = glamorous.div({
    ...style,
    ...stepStyle,
    backgroundColor: white,
});

const Steps = ({ current, total }) => {
    return (
        <Container title={`Step ${current}/${total}`}>
            {[...Array(total)].map(
                (element, index) =>
                    index < current ? <FilledStep key={index} /> : <EmptyStep key={index} />,
            )}
        </Container>
    );
};

Steps.propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
};

export default Steps;
