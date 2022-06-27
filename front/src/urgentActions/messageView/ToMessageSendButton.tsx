import React from 'react';

import { withSessionData } from '../../DataContext';
import ToUrgentActionPageLink from '../ToUrgentActionPageLink';

type Props = {
    object: string;
    objectExample?: string;
    setObject: (...args: any[]) => any;
};

const ToMessageSendButton = ({ object, objectExample, setObject, ...rest }: Props) => {
    const handleOnClikToMessangeSend = () => {
        if (!object) setObject(objectExample);
    };

    return <ToUrgentActionPageLink onClick={handleOnClikToMessangeSend} {...rest} />;
};

export default withSessionData(ToMessageSendButton);
