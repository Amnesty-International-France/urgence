import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash.get';

// @ts-expect-error TS(6142): Module '../../themes/MailTo' was resolved to '/hom... Remove this comment to see the full error message
import MailTo from '../../themes/MailTo';
import { templateToBodyText } from '../messageView/templateToBodyText';
// @ts-expect-error TS(6142): Module '../../themes/Input' was resolved to '/home... Remove this comment to see the full error message
import { isCorrectEmail } from '../../themes/Input';
import { paramsType } from '../../propTypes';
// @ts-expect-error TS(6142): Module '../../DataContext' was resolved to '/home/... Remove this comment to see the full error message
import { withSessionData } from '../../DataContext';

import { addCampaignMember, addResponseCount } from '../../services/api';

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
    const handleAfterMail = () => {
        addResponseCount(auId);

        let isRegistered = registered;
        return addCampaignMember(auId, { email, firstname, lastname, civility })
            .then((result) => {
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
            .catch(() => {})
            .then(() => {
                afterMail({ registered: isRegistered });
            });
    };

    const body = templateToBodyText(messageTemplate, civility, firstname, lastname);

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MailTo
            disabled={!isCorrectEmail(email) || !object || !civility || !firstname || !lastname}
            label={label}
            recipient={recipient}
            subject={object}
            body={body}
            afterMail={handleAfterMail}
            analyticsCategory={analyticsCategory}
            match={match}
            step={step}
        />
    );
};

SendMail.defaultProps = {
    onMailSent: () => {},
};

export default compose(withSessionData)(SendMail);
