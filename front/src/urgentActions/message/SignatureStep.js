import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import CarouselSlide from '../../themes/CarouselSlide';

export const SignatureStep = ({
    signature,
    changeSignature,
    action,
    className,
}) => (
    <CarouselSlide className={className}>
        <p>
            Parce que les actions uniques sont un message personnel, nous vous
            invitons à renseigner vos noms et prénoms.
        </p>
        <textarea rows="5" value={signature} onChange={changeSignature} />
        {action}
    </CarouselSlide>
);

SignatureStep.propTypes = {
    className: PropTypes.string,
    signature: PropTypes.string.isRequired,
    changeSignature: PropTypes.func.isRequired,
    action: PropTypes.node,
};

export default glamorous(SignatureStep)({
    '& textarea': {
        width: '80%',
        fontSize: 24,
        margin: '2rem 3rem',
    },
});
