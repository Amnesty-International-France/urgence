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

    // @ts-expect-error TS(2769): No overload matches this call.
    return <ToUrgentActionPageLink onClick={handleOnClikToMessangeSend} {...rest} />;
};

export default withSessionData(ToMessageSendButton);
