import React from 'react';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

// @ts-expect-error TS(6142): Module './ShareLink' was resolved to '/home/guilla... Remove this comment to see the full error message
import ShareLink from './ShareLink';

type OwnProps = {
    slug?: string;
    step?: string;
    url: string;
    action?: (...args: any[]) => any;
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LinkFacebook.defaultProps;

// @ts-expect-error TS(7022): 'LinkFacebook' implicitly has type 'any' because i... Remove this comment to see the full error message
export const LinkFacebook = ({ slug, step, url, action, analyticsCategory }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ShareLink
        slug={slug}
        step={step}
        href={`fb-messenger://share/?link=${url}`}
        target="facebook"
        title="Partage Facebook Messenger"
        icon={faFacebookMessenger}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Messenger"
        backgroundColor="#017efe"
    />
);

LinkFacebook.defaultProps = {
    url: '',
    action: () => {},
};

export default LinkFacebook;
