import React from 'react';
import styled from '@emotion/styled';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash.get';

import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import ShareForm from '../../themes/Sharing/ShareForm';

import generateUrl from '../../services/generateUrl';
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
        <div className={className}>
            <div className="header">
                <h1>
                    <LongText text={title} />
                </h1>
                {text && (
                    <div className="text">
                        <RichText html={text} />
                    </div>
                )}
            </div>
            <ShareForm
                {...share}
                slug={slug}
                step={step}
                link={link}
                analyticsCategory={analyticsCategory}
            />
            {telegram && telegram.url && telegram.message && (
                <div className="telegram">
                    <hr
                        style={{
                            color: '#c4c4c4',
                            backgroundColor: '#c4c4c4',
                            border: 'none',
                            height: 2,
                            marginBottom: '1rem',
                        }}
                    />
                    <div className="text">
                        <RichText html={telegram.message} />
                    </div>
                    <div className="link">
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
