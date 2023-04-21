import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

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
