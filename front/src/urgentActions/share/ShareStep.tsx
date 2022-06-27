import React from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import { Paper } from '@material-ui/core';

// @ts-expect-error TS(6142): Module '../../themes/ThemeContext' was resolved to... Remove this comment to see the full error message
import { withBlackLogo, withYellowBackground } from '../../themes/ThemeContext';
import { white, black } from '../../themes/colors';
// @ts-expect-error TS(6142): Module './Share' was resolved to '/home/guillaume/... Remove this comment to see the full error message
import Share from './Share';

const styles = {
    padding: '60px 15px 20px',
    height: 'calc(100vh - 30px)',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        width: '100%',
        padding: '100px 20px 20px 20px',
        color: black,
        backgroundColor: white,
    },
};

type OwnProps = {
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

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ShareStep.defaultProps;

// @ts-expect-error TS(7022): 'ShareStep' implicitly has type 'any' because it d... Remove this comment to see the full error message
const ShareStep = ({ className, slug, step, data, analyticsCategory }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={classnames('share', className)}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Paper className="paper" elevation={6} square>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Share slug={slug} step={step} data={data} analyticsCategory={analyticsCategory} />
        </Paper>
    </div>
);

ShareStep.defaultProps = {
    slug: 'new-ua',
    data: {
        title: '',
        text: '',
        share: {},
    },
};

// @ts-expect-error TS(2769): No overload matches this call.
const WithStylesShare = styled(ShareStep)(styles);

export default compose(withBlackLogo, withYellowBackground)(WithStylesShare);
