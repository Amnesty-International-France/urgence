import React from 'react';
import styled from '@emotion/styled';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash.get';

// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
import RichText from '../../themes/RichText';
// @ts-expect-error TS(6142): Module '../../themes/LongText' was resolved to '/h... Remove this comment to see the full error message
import LongText from '../../themes/LongText';
// @ts-expect-error TS(6142): Module '../../themes/Sharing/ShareForm' was resolv... Remove this comment to see the full error message
import ShareForm from '../../themes/Sharing/ShareForm';

import generateUrl from '../../services/generateUrl';
// @ts-expect-error TS(6142): Module '../../themes/Sharing/LinkTelegram' was res... Remove this comment to see the full error message
import LinkTelegram from '../../themes/Sharing/LinkTelegram';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    '& .header': {
        margin: '0.5em 0',
    },
    '& .telegram': {
        margin: '1em 0',
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        lineHeight: '30px',
        textTransform: 'uppercase',
    },
    '& .text': {
        margin: '0.5em 0',
    },
    '& .link': {
        textAlign: 'center',
    },
    '@media (min-width: 350px)': {
        fontSize: '16px',
    },
    '@media (min-width: 1024px)': {
        '&.paper': {
            padding: '10vh 10vw',
        },
        '& .link': {
            textAlign: 'center',
        },
    },
};
const getLinkFromSlug = (slug: any) => `${global.origin}${generateUrl('ua', { slug })}`;

type OwnShareProps = {
    className?: string;
    slug: string;
    step?: string;
    data?: {
        title: string;
        text: string;
        share?: any;
    };
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'ShareProps' circularly references itse... Remove this comment to see the full error message
type ShareProps = OwnShareProps & typeof Share.defaultProps;

// @ts-expect-error TS(7022): 'Share' implicitly has type 'any' because it does ... Remove this comment to see the full error message
const Share = ({ className, slug, step, data, analyticsCategory }: ShareProps) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    const share = get(data, 'share');
    const telegram = get(data, 'telegram');

    const link = getLinkFromSlug(slug);

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={className}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="header">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h1>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <LongText text={title} />
                </h1>
                {text && (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className="text">
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <RichText html={text} />
                    </div>
                )}
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ShareForm
                {...share}
                slug={slug}
                step={step}
                link={link}
                analyticsCategory={analyticsCategory}
            />
            {telegram && telegram.url && telegram.message && (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="telegram">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <hr
                        style={{
                            color: '#c4c4c4',
                            backgroundColor: '#c4c4c4',
                            border: 'none',
                            height: 2,
                            marginBottom: '1rem',
                        }}
                    />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="text">
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <RichText html={telegram.message} />
                    </div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="link">
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <LinkTelegram
                            slug={slug}
                            step={step}
                            url={telegram.url}
                            target="telegram"
                            text={`${encodeURIComponent(telegram.url)}`}
                            analyticsCategory={analyticsCategory}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

Share.defaultProps = {
    slug: 'new-ua',
    data: {
        title: '',
        text: '',
        share: {},
    },
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(Share)(styles);
