import { faTelegram } from '@fortawesome/free-brands-svg-icons';

import ShareLink from './ShareLink';

type OwnProps = {
    slug?: string;
    step?: string;
    url: string;
    action?: (...args: any[]) => any;
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LinkTelegram.defaultProps;

// @ts-expect-error TS(7022): 'LinkTelegram' implicitly has type 'any' because i... Remove this comment to see the full error message
export const LinkTelegram = ({ slug, step, url, action, analyticsCategory }: Props) => (
    <ShareLink
        slug={slug}
        step={step}
        href={url}
        target="telegram"
        title="Join telegram"
        icon={faTelegram}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Telegram"
        backgroundColor="#0088cc"
    />
);

LinkTelegram.defaultProps = {
    url: '',
    action: () => {},
};

export default LinkTelegram;
