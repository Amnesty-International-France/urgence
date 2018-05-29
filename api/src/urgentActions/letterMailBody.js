import path from 'path';
import nunjucks from 'nunjucks';

export const letterMailBodyAsText = ({ urgentAction }) => `Bonjour,

Voici votre lettre pour l'Action Urgente "${urgentAction.title}".

Il ne vous reste plus que quelques étapes :

- l'imprimer
- la signer en **votre nom**
- l'affranchir
- la poster au plus vite

Ce courrier est à adresser à :

${urgentAction.recipient.postal_address}

**Astuce :** saviez-vous que vous pouvez acheter et imprimer vos timbres en ligne ?

Votre action est importante. Votre lettre ajoutée avec celles de milliers de personnes peut faire changer les choses !

Sur le terrain, les chercheurs d'Amnesty International suivent la situation, nous vous informerons de toute évolution constatée.

Merci pour votre soutien et votre engagement !

Solidairement,

--
L'équipe Réaction Rapide
Amnesty International France
`;

export const letterMailBodyAsHtml = params =>
    nunjucks.render(path.join(__dirname, './letterMailBody.html'), params);

export const getLetterMailBody = params => ({
    text: letterMailBodyAsText(params),
    html: letterMailBodyAsHtml(params),
});
