import React from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { compose } from 'recompose';

import { black, white, withBlackLogo, withYellowBackground } from 'amnesty-components';
import Share from './Share';
import PaperForMobile from '../layout/PaperForMobile';

const styles = {
    padding: '60px 15px 20px',
    height: 'calc(100vh - 30px)',
    overflowY: 'auto',

    '@media (orientation: landscape)': {
        padding: '60px 120px 20px 60px',
        minHeight: 'calc(100vh - 30px)',
    },

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
        <div className={classnames('share', className)}>
            <PaperForMobile elevation={6} className={'paper'}>
                <Share
                    slug={slug}
                    step={step}
                    data={data}
                    analyticsCategory={analyticsCategory}
                />
            </PaperForMobile>
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
