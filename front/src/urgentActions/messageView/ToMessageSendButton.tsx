import React from 'react';

// @ts-expect-error TS(6142): Module '../../DataContext' was resolved to '/home/... Remove this comment to see the full error message
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

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <ToUrgentActionPageLink onClick={handleOnClikToMessangeSend} {...rest} />;
};

export default withSessionData(ToMessageSendButton);
