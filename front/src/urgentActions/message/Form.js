import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Input from '../../themes/Input';
import RichText from '../../themes/RichText';

const Form = ({ objectIndication, object, analyticsCategory, step, setObject }) => {
    const handleChangeObject = event => {
        setObject(event.target.value);
    };

    return (
        <Fragment>
            <Input
                className="object"
                value={object}
                onChange={handleChangeObject}
                error={!object}
                analyticsCategory={analyticsCategory}
                step={step}
                label="Objet de l'e-mail *"
            />
            <RichText className="objectIndication" html={objectIndication} />
        </Fragment>
    );
};

Form.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string,
    object: PropTypes.string,
    setObject: PropTypes.func.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default Form;
