import styled from '@emotion/styled';
import classnames from 'classnames';
import get from 'lodash.get';
import { compose } from 'recompose';

import { RichText, withBlackLogo, withYellowBackground } from 'amnesty-components';
import LongText from '../themes/LongText';
import Share from './share/Share';
import Paper from '@mui/material/Paper';

const styles = {
    padding: '60px 15px 20px',
    width: '100%',

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

    return (
        <div className={classnames('thank', className)}>
            <Paper elevation={6} className={'paper'}>
                <>
                    <h1>
                        <LongText text={title} />
                    </h1>
                    {text && <RichText html={text} />}
                </>
            </Paper>
            <Paper elevation={6} className={'paper paper-share'}>
                <Share
                    slug={slug}
                    step={step}
                    data={dataShare}
                    analyticsCategory={analyticsCategory}
                />
            </Paper>
        </div>
    );
};

ThankStep.defaultProps = {};

// @ts-expect-error TS(2769): No overload matches this call.
const withStyleThankStep = styled(ThankStep)(styles);

export default compose(withBlackLogo, withYellowBackground)(withStyleThankStep);
