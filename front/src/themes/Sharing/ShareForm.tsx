import React from 'react';
import styled from '@emotion/styled';

// @ts-expect-error TS(6142): Module './LinkFacebook' was resolved to '/home/gui... Remove this comment to see the full error message
import LinkFacebook from './LinkFacebook';
// @ts-expect-error TS(6142): Module './LinkTwitter' was resolved to '/home/guil... Remove this comment to see the full error message
import LinkTwitter from './LinkTwitter';
// @ts-expect-error TS(6142): Module './LinkWhatsapp' was resolved to '/home/gui... Remove this comment to see the full error message
import LinkWhatsapp from './LinkWhatsapp';
// @ts-expect-error TS(6142): Module './CopyToClipboard' was resolved to '/home/... Remove this comment to see the full error message
import CopyToClipboard from './CopyToClipboard';
import { black } from '../colors';

// @ts-expect-error TS(6142): Module '../../DataContext' was resolved to '/home/... Remove this comment to see the full error message
import { withSessionData } from '../../DataContext';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    '& .share-block': {
        textAlign: 'center',
        padding: '0.5em 0',
    },
    '& .share-text': {
        padding: '0.5em 0',
    },
    '& .share-links': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '0.5em 0',
        '& a': {
            margin: '0 0.5em',
        },
    },
};

type OwnProps = {
    slug?: string;
    step?: string;
    link: string;
    message: string;
    registered?: string;
    active_twitter?: boolean;
    twitter_message?: string;
    analyticsCategory?: string;
    className?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ShareForm.defaultProps;

// @ts-expect-error TS(7022): 'ShareForm' implicitly has type 'any' because it d... Remove this comment to see the full error message
export const ShareForm = ({
    className,
    slug,
    step,
    link,
    message,
    twitter_message,
    analyticsCategory,
}: Props) => {
    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={className}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="share-block">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="share-text">Partagez l&apos;action avec vos proches</div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <CopyToClipboard
                    slug={slug}
                    step={step}
                    url={link}
                    analyticsCategory={analyticsCategory}
                />
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="share-block">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>Ou utilisez vos réseaux sociaux favoris</div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="share-links">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <LinkFacebook
                        slug={slug}
                        step={step}
                        url={encodeURIComponent(link)}
                        analyticsCategory={analyticsCategory}
                    />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <LinkTwitter
                        slug={slug}
                        step={step}
                        text={`${twitter_message} - ${encodeURIComponent(link)}`}
                        analyticsCategory={analyticsCategory}
                    />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <LinkWhatsapp
                        slug={slug}
                        step={step}
                        text={`${message} - ${encodeURIComponent(link)}`}
                        analyticsCategory={analyticsCategory}
                    />
                </div>
            </div>
        </div>
    );
};

ShareForm.defaultProps = {
    registered: false,
    message: '',
    auId: '',
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(withSessionData(ShareForm))(styles);
