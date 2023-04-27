import { useState } from 'react';

type MailToCheckProps = {
    mailTo: string;
};

export const MailToCheck = ({ mailTo }: MailToCheckProps) => {
    const [status, setStatus] = useState('en attente d\'un clic');

    const checkFocus = () => {
        if (navigator.platform == 'Win32' && document.hasFocus()) {
            setStatus('❌ l\'ouverture du lien mailto n\'a pas fonctionné');
        } else {
            setStatus('✅ l\'ouverture du lien mailto a fonctionné');
        }
    }

    return (
        <>
            <a
                href={mailTo}
                onClick={
                    (e) => {
                        e.preventDefault();
                        window.open(mailTo, 'mailto');
                        setTimeout(checkFocus, 500);
                    }
                }
                target="_self"
                rel="noopener noreferrer">
                Cliquez ici pour tester le lien mailto
            </a>
            <br />
            <span>Statut: {status}</span>
        </>
    );
};
