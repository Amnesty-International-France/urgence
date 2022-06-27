import React from 'react';
import classnames from 'classnames';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash.get';

// @ts-expect-error TS(6142): Module '../themes/RichText' was resolved to '/home... Remove this comment to see the full error message
import RichText from '../themes/RichText';
// @ts-expect-error TS(6142): Module '../themes/LongText' was resolved to '/home... Remove this comment to see the full error message
import LongText from '../themes/LongText';
// @ts-expect-error TS(6142): Module '../themes/ThemeContext' was resolved to '/... Remove this comment to see the full error message
import { withBlackLogo, withYellowBackground } from '../themes/ThemeContext';
// @ts-expect-error TS(6142): Module './share/Share' was resolved to '/home/guil... Remove this comment to see the full error message
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

type OwnProps = {
    className: string;
    data?: {
        title: string;
        text: string;
    };
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={classnames('thank', className)}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Paper className="paper" elevation={6} square>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h1>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <LongText text={title} />
                    </h1>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    {text && <RichText html={text} />}
                </div>
            </Paper>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Paper className="paper paper-share" elevation={6} square>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
