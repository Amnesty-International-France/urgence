import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';

import ShareLink from './ShareLink';

// The X (ex-Twitter) logo is not available in free-brands-svg-icons 6.4.0
// (faXTwitter was introduced in 6.4.2), so we declare it locally with the
// official X path data to avoid bumping the whole FontAwesome dependency.
const faXTwitter: IconDefinition = {
    prefix: 'fab',
    iconName: 'x-twitter' as IconName,
    icon: [
        512,
        512,
        [],
        'e61b',
        'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
    ],
};

type OwnProps = {
    slug?: string;
    step?: string;
    text: string;
    action?: (...args: any[]) => any;
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LinkTwitter.defaultProps;

// @ts-expect-error TS(7022): 'LinkTwitter' implicitly has type 'any' because it... Remove this comment to see the full error message
export const LinkTwitter = ({ slug, step, text, action, analyticsCategory }: Props) => (
    <ShareLink
        customClass="twitter-share-button"
        slug={slug}
        step={step}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="_blank"
        title="Partage X"
        icon={faXTwitter}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="X"
        backgroundColor="#000000"
    />
);

LinkTwitter.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkTwitter;
