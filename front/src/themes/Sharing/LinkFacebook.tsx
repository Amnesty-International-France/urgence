import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import MobileDetect from 'mobile-detect';

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

const isOnMobile = () => {
    const md = new MobileDetect(global.navigator.userAgent);
    return !!md.mobile();
};

// @ts-expect-error TS(7022): 'LinkFacebook' implicitly has type 'any' because i... Remove this comment to see the full error message
export const LinkFacebook = ({ slug, step, url, action, analyticsCategory }: Props) => {
    const onMobile = isOnMobile();

    // On mobile, use the Messenger deep link so the native app opens directly.
    // On desktop the fb-messenger:// scheme has no handler and the page hangs, so we
    // fall back to the standard Facebook share dialog, which works in any browser.
    const href = onMobile
        ? `fb-messenger://share/?link=${url}`
        : `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    return (
        <ShareLink
            slug={slug}
            step={step}
            href={href}
            target={onMobile ? 'facebook' : '_blank'}
            title="Partage Facebook Messenger"
            icon={faFacebookMessenger}
            action={action}
            analyticsCategory={analyticsCategory}
            buttonName="Messenger"
            backgroundColor="#017efe"
        />
    );
};

LinkFacebook.defaultProps = {
    url: '',
    action: () => {},
};

export default LinkFacebook;
