import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    borderRadius: 5,
    margin: '0.3rem 0',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'grey',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

const normalise = (value: number) => (value * 100) / 2000;

const MailtoLength = ({ mailto }: { mailto: string }) => {
    const color = mailto.length > 2000 ? '#d32f2f' : mailto.length > 1600 ? '#ed6c02' : '#2e7d32';
    const progressColor =
        mailto.length > 2000 ? 'error' : mailto.length > 1600 ? 'warning' : 'success';
    return (
        <div style={{ fontSize: '0.8rem', lineHeight: '1rem', margin: '0 0 1rem 0' }}>
            mailto : <strong style={{ color }}>{mailto.length}</strong> / 2000
            <br />
            <BorderLinearProgress
                color={progressColor}
                variant="determinate"
                value={normalise(mailto.length)}
            />
        </div>
    );
};

export default MailtoLength;
