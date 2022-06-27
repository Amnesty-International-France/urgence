import React from 'react';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import ShareLink from './ShareLink';

type OwnProps = {
    slug?: string;
    step?: string;
    text: string;
    action?: (...args: any[]) => any;
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LinkWhatsapp.defaultProps;

// @ts-expect-error TS(7022): 'LinkWhatsapp' implicitly has type 'any' because i... Remove this comment to see the full error message
export const LinkWhatsapp = ({ slug, step, text, action, analyticsCategory }: Props) => (
    <ShareLink
        slug={slug}
        step={step}
        href={`whatsapp://send?text=${text}`}
        target="whatsapp"
        title="Partage Whatsapp"
        icon={faWhatsapp}
        action={action}
        analyticsCategory={analyticsCategory}
        buttonName="Whatsapp"
        backgroundColor="#81e878"
    />
);

LinkWhatsapp.defaultProps = {
    text: '',
    action: () => {},
};

export default LinkWhatsapp;
