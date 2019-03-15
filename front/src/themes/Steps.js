import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { white, yellow } from './colors';

const Container = glamorous.div({
    display: 'inline-flex',
    height: '12px',
    width: '100%',
});

const FilledStep = glamorous.div({
    height: '12px',
    width: '100%',
    backgroundColor: yellow,
});

const EmptyStep = glamorous.div({
    height: '12px',
    width: '100%',
    backgroundColor: white,
});

const Steps = ({ current, total }) => {
    return (
        <Container>
            {[...Array(total)].map((element, index) =>
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
