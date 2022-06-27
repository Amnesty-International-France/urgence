import styled from '@emotion/styled';

import { AmnestyCandle } from '../icons';

const AmnestyWrapper = styled.div`
    fontSize: 133,
    fill: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    width: '100vw',
    height: '100vh',
`;

export const LoadingScreen = () => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AmnestyWrapper>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AmnestyCandle />
    </AmnestyWrapper>
);

export default LoadingScreen;
