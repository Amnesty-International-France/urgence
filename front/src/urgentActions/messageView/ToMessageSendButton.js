import React from 'react';
import PropTypes from 'prop-types';

import { withSessionData } from '../../DataContext';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';

const ToMessageSendButton = ({ object, ...rest }) => {
    const disabled = object == null || object === '';
    return <ToUrgentActionPageLink {...rest} disabled={disabled} />;
};

ToMessageSendButton.propTypes = {
    object: PropTypes.string.isRequired,
};

export default withSessionData(ToMessageSendButton);
