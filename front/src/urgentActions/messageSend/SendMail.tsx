import get from 'lodash.get';
import { compose } from 'recompose';
import { useState } from 'react';

import { withSessionData } from '../../DataContext';
import MailTo from '../../themes/MailTo';
import { templateToBodyText } from '../messageView/templateToBodyText';

import { addCampaignMember, addResponseCount, recordMailto } from '../../services/api';

type OwnProps = {
    className?: string;
    messageTemplate?: {
        value: string;
    }[];
    recipient: {
        mail: string;
        copies_to?: string;
        cci?: string;
    };
    // @ts-expect-error TS(2749): 'paramsType' refers to a value, but is being used ... Remove this comment to see the full error message
    match?: paramsType;
    history: {
        push: (...args: any[]) => any;
    };
    analyticsCategory?: string;
    step: string;
    auId: string;
    label: string;
    afterMail?: (...args: any[]) => any;
    object: string;
    civility: string;
    firstname: string;
    lastname: string;
    email: string;
    registered: string;
    setRegistered: (...args: any[]) => any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof SendMail.defaultProps;

// @ts-expect-error TS(7022): 'SendMail' implicitly has type 'any' because it do... Remove this comment to see the full error message
export const SendMail = ({
    messageTemplate,
    recipient,
    analyticsCategory,
    step,
    match,
    afterMail,
    auId,
    label,
    object,
    civility,
    firstname,
    lastname,
    email,
    registered,
    setRegistered,
}: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAfterMail = (e: any, failed: boolean) => {
        setIsLoading(true);
        addResponseCount(auId);
        recordMailto(auId, failed ? 'failure' : 'success');

        let isRegistered = registered;
        return addCampaignMember(auId, { email, firstname, lastname, civility })
            .then((result) => {
                setIsLoading(false)
                if (result.errors && result.errors.length) {
                    // eslint-disable-next-line no-console
                    console.log(
                        'Failed adding campaign member',
                        result.errors.map((error: any) => `- ${error.message}`).join('\n'),
                    );
                }
                isRegistered = get(result, 'data.addCampaignMember.registered', false);
                setRegistered(isRegistered ? 'true' : 'false');
            })
            .catch(() => {setIsLoading(false)})
            .then(() => {
                afterMail({ failed, registered: isRegistered });
            });
    };

    const body = templateToBodyText(messageTemplate, civility, firstname, lastname);
    return (
        <MailTo
            label={label}
            recipient={recipient}
            subject={object}
            body={body}
            afterMail={handleAfterMail}
            analyticsCategory={analyticsCategory}
            match={match}
            step={step}
            disabled={isLoading}
        />
    );
};

export default compose(withSessionData)(SendMail);
