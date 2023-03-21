import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import ShareLink from './ShareLink';

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
        target="twitter"
        title="Partage Twitter"
        icon={faTwitter}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Tweeter"
        backgroundColor="#4caaea"
    />
);

LinkTwitter.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkTwitter;
