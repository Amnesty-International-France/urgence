import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import React from 'react';

import { black, white } from '../../themes/colors';
import RichText from '../../themes/RichText';

const styles = {
    position: 'relative',
    margin: '60px 15px 15px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '300px',
        color: black,
        backgroundColor: white,
        '@media (min-width: 1024px)': {
            height: '85vh',
        },
    },
    '& .step': {
        margin: '100px 20px 60px',
        '@media (min-width: 350px)': {
            margin: '160px 20px 80px',
        },
    },
    '& .content': {
        display: 'flex',
        flex: '1 0 0',
        alignItems: 'center',
    },
    '& .rich-text > p': {
        fontFamily: 'Amnesty Trade Gothic',
        margin: '0 12px',
        width: 'calc(100% - 24px)',
        fontSize: '18px',
    },
    '@media (min-width: 1024px)': {
        fontSize: '24px',
        '& .rich-text > p': {
            fontSize: '24px',
        },
    },
};

/*
(ts-migrate) TODO: Migrate the remaining prop types
...StoryStepPropType
*/
type Props = {
    className?: string;
};

// @ts-expect-error TS(2339): Property 'content' does not exist on type 'Props'.
export const StoryStep = ({ className, content }: Props) => (
    <div className={className}>
        <Paper className="paper" elevation={6} square>
            <div className="step">
                <div className="content">
                    <RichText html={content} />
                </div>
            </div>
        </Paper>
    </div>
);

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(StoryStep)(styles);
