import styled from '@emotion/styled';

import LinkFacebook from './LinkFacebook';
import LinkTwitter from './LinkTwitter';
import LinkWhatsapp from './LinkWhatsapp';
import CopyToClipboard from './CopyToClipboard';
import { black } from 'amnesty-components';

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
        <div className={className}>
            <div className="share-block">
                <div className="share-text">Partagez l&apos;action avec vos proches</div>
                <CopyToClipboard
                    slug={slug}
                    step={step}
                    url={link}
                    analyticsCategory={analyticsCategory}
                />
            </div>
            <div className="share-block">
                <div className={'share-block-title'}>Ou utilisez vos réseaux sociaux favoris</div>
                <div className="share-links">
                    <LinkFacebook
                        slug={slug}
                        step={step}
                        url={encodeURIComponent(link)}
                        analyticsCategory={analyticsCategory}
                    />
                    <LinkTwitter
                        slug={slug}
                        step={step}
                        text={`${twitter_message} - ${encodeURIComponent(link)}`}
                        analyticsCategory={analyticsCategory}
                    />
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
