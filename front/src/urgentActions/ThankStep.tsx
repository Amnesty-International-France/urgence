import React from 'react';
import classnames from 'classnames';
import { compose } from 'recompose';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import get from 'lodash.get';

import RichText from '../themes/RichText';
import LongText from '../themes/LongText';
import { withBlackLogo, withYellowBackground } from '../themes/ThemeContext';
import Share from './share/Share';

const styles = {
    padding: '60px 15px 20px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
        width: '100%',
        padding: '80px 20px 20px 20px',
    },
    '& .paper-share': {
        marginTop: '20px',
        padding: '20px',
    },
    '& h1': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
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
            <Paper className="paper" elevation={6} square>
                <div>
                    <h1>
                        <LongText text={title} />
                    </h1>
                    {text && <RichText html={text} />}
                </div>
            </Paper>
            <Paper className="paper paper-share" elevation={6} square>
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
