import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from '../../themes/Input';
import RichText from '../../themes/RichText';

const Form = ({ objectIndication, objectExample, object, analyticsCategory, step, setObject }) => {
    const handleChangeObject = (event) => {
        setObject(event.target.value);
    };

    return (
        <Fragment>
            <RichText className="object-indication" html={objectIndication} />
            <Input
                className="object"
                value={object}
                onChange={handleChangeObject}
                error={!object}
                analyticsCategory={analyticsCategory}
                step={step}
                placeholder={objectExample}
            />
        </Fragment>
    );
};

Form.propTypes = {
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    objectIndication: PropTypes.string,
    objectExample: PropTypes.string,
    object: PropTypes.string,
    setObject: PropTypes.func.isRequired,
};

export default Form;
