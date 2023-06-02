import { useState } from 'react';

type MailtoCheckProps = {
    mailto: string;
};

export const MailtoCheck = ({ mailto }: MailtoCheckProps) => {
    const [status, setStatus] = useState('en attente d\'un clic');

    const checkFocus = () => {
        if (navigator.userAgent.indexOf('Win') && document.hasFocus()) {
            setStatus('❌ l\'ouverture du lien mailto n\'a pas fonctionné');
        } else {
            setStatus('✅ l\'ouverture du lien mailto a fonctionné');
        }
    }

    return (
        <>
            <a
                href={mailto}
                onClick={
                    (e) => {
                        e.preventDefault();
                        window.open(mailto, 'mailto');
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
