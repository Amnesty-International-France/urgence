import styled from '@emotion/styled';

import { white } from '../../themes/colors';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
    background: white,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    userSelect: 'none',
    '&:active': {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    '& .text': {
        position: 'relative',
        '& > .downText': {
            position: 'relative',
            top: 5,
        },
        '& > .upText': {
            position: 'relative',
            top: -3,
        },
    },
};

// @ts-expect-error TS(2769): No overload matches this call.
const StyledSpan = styled('span')(styles);

type OwnProps = {
    showAllText?: boolean;
    action: (...args: any[]) => any;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ShowButton.defaultProps;

// @ts-expect-error TS(7022): 'ShowButton' implicitly has type 'any' because it ... Remove this comment to see the full error message
const ShowButton = ({ showAllText, action }: Props) => (
    <StyledSpan onClick={action}>
        {showAllText ? (
            <span className="text">
                Voir moins&nbsp;&nbsp;
                <strong className="upText">︿</strong>
            </span>
        ) : (
            <span className="text">
                Voir plus&nbsp;&nbsp;
                <strong className="downText">﹀</strong>
            </span>
        )}
    </StyledSpan>
);

ShowButton.defaultProps = {
    showAllText: false,
};

export default ShowButton;
