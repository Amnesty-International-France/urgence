import styled from '@emotion/styled';
import { black } from 'amnesty-components';
import { useLocation, useNavigate } from 'react-router';

const styles = {
    position: 'absolute',
    top: '2rem',
    right: '1rem',
    display: 'flex',
    flexDirection: 'column',
    width: '3.6rem',
    alignItems: 'center',
    gap: '20px',
    '@media (min-width: 1441px)': {
        width: '4.5rem',
        gap: '24px',
    },

    '& .step': {
        height: '18px',
        width: '18px',
        border: '1px solid black',
        borderRadius: '100%',
        backgroundColor: 'transparent',
        zIndex: 1,
        cursor: 'pointer',
        '@media (min-width: 1441px)': {
            height: '22px',
            width: '22px',
        },
    },
    '& .done': {
        backgroundColor: black,
    },
};

type RoundedStepperProps = {
    className?: string;
    links: any;
};

const RoundedStepper = ({ className, links }: RoundedStepperProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const navigateTo = (link: string) => {
        navigate(link);
    };

    return (
        <div className={className}>
            {links.map((link: string, i: number) => (
                <div
                    key={link}
                    className={`step ${pathname === link ? 'done' : 'todo'}`}
                    onClick={() => navigateTo(link)}
                />
            ))}
        </div>
    );
};

// @ts-ignore
export default styled(RoundedStepper)(styles);
