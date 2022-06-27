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
    <AmnestyWrapper>
        <AmnestyCandle />
    </AmnestyWrapper>
);

export default LoadingScreen;
