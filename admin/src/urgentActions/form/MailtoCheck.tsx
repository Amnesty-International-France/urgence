import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type MailtoCheckProps = {
    mailto: string;
};

const MailtoCheck = ({ mailto }: MailtoCheckProps) => {
    const [status, setStatus] = useState('untested');
    const [currentMailto, setCurrentMailto] = useState('');

    useEffect(() => {
        if (mailto !== currentMailto) {
            setStatus('untested');
        }
        setCurrentMailto(mailto);
    }, [mailto]);

    const checkFocus = () => {
        if (navigator.userAgent.indexOf('Win') !== -1 && document.hasFocus()) {
            setStatus('error');
        } else {
            setStatus('ok');
        }
    };

    if (status === 'ok') {
        return (
            <Button
                sx={{ width: '100%' }}
                variant="contained"
                color="success"
                startIcon={<CheckCircleOutlineIcon />}
                size="small"
            >
                mailto ouvert
            </Button>
        );
    }

    if (status === 'error') {
        return (
            <Button sx={{ width: '100%' }} variant="contained" color="error" size="small">
                mailto en erreur
            </Button>
        );
    }

    return (
        <Button
            variant="contained"
            color="info"
            sx={{ width: '100%' }}
            href={mailto}
            onClick={(e) => {
                e.preventDefault();
                window.open(mailto, 'mailto');
                setTimeout(checkFocus, 500);
            }}
            target="_self"
            rel="noopener noreferrer"
            size="small"
        >
            Tester le mailto
        </Button>
    );
};

export default MailtoCheck;
