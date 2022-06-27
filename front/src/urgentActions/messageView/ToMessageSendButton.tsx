import React from 'react';
import PropTypes from 'prop-types';

import { withSessionData } from '../../DataContext';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';

const ToMessageSendButton = ({ object, objectExample, setObject, ...rest }) => {
    const handleOnClikToMessangeSend = () => {
        if (!object) setObject(objectExample);
    };

    return <ToUrgentActionPageLink onClick={handleOnClikToMessangeSend} {...rest} />;
};

ToMessageSendButton.propTypes = {
    object: PropTypes.string.isRequired,
    objectExample: PropTypes.string,
    setObject: PropTypes.func.isRequired,
};

export default withSessionData(ToMessageSendButton);
