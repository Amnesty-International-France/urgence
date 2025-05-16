import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import classnames from 'classnames';
import get from 'lodash.get';
import { compose } from 'recompose';

import { RichText, withBlackLogo, withYellowBackground } from 'amnesty-components';
import LongText from '../themes/LongText';
import Share from './share/Share';
import MobileDetect from 'mobile-detect';

const styles = {
    padding: '60px 15px 20px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: '20px',
        alignItems: 'center',

    },
    '& .paper-share': {
        marginTop: '20px',

        '& .rich-text': {
            textAlign: 'center',
        },
    },
    '& h1': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        textAlign: 'center',
    },
};

export type ThanksType =
    | {
    title: string;
    text: string;
}
    | undefined;

type OwnProps = {
    className: string;
    data?: ThanksType;
    slug: string;
    step?: string;
    dataShare?: {
        title: string;
        text: string;
        share?: any;
    };
    analyticsCategory?: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ThankStep.defaultProps;

// @ts-expect-error TS(7022): 'ThankStep' implicitly has type 'any' because it d... Remove this comment to see the full error message
export const ThankStep = ({ className, data, slug, step, dataShare, analyticsCategory }: Props) => {
    const title = get(data, 'title');
    const text = get(data, 'text');

    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };


    return (
        <div className={classnames('thank', className)}>
            {isOnMobile()
                ? (
                    <Paper className="paper" elevation={6} square>
                        <>
                            <h1>
                                <LongText text={title} />
                            </h1>
                            {text && <RichText html={text} />}
                        </>
                    </Paper>
                ) : (
                    <>
                        <h1>
                            <LongText text={title} />
                        </h1>
                        {text && <RichText html={text} />}
                    </>
                )
            }{isOnMobile()
            ? (
                <Paper className="paper paper-share" elevation={6} square>
                    <Share
                        slug={slug}
                        step={step}
                        data={dataShare}
                        analyticsCategory={analyticsCategory}
                    />
                </Paper>
            ) : (
                <Share
                    slug={slug}
                    step={step}
                    data={dataShare}
                    analyticsCategory={analyticsCategory}
                />
            )
        }
        </div>
    );
};

ThankStep.defaultProps = {};

// @ts-expect-error TS(2769): No overload matches this call.
const withStyleThankStep = styled(ThankStep)(styles);

export default compose(withBlackLogo, withYellowBackground)(withStyleThankStep);
