import fetch from 'isomorphic-fetch';

import driver from './driver';
import storyPageFactory from './pages/story';
import actPageFactory from './pages/act';
import messagePageFactory from './pages/message';
import thanksPageFactory from './pages/thanks';
import addressPageFactory from './pages/address';
import thanksEndPageFactory from './pages/thanksEnd';

const storyPage = storyPageFactory(driver);
const actPage = actPageFactory(driver);
const messagePage = messagePageFactory(driver);
const thanksPage = thanksPageFactory(driver);
const addressPage = addressPageFactory(driver);
const thanksEndPage = thanksEndPageFactory(driver);

describe('app', () => {
    let urgentAction;

    beforeAll(async () => {
        urgentAction = await fetch('http://api:4000/test/createUrgentAction').then(r => r.json());
    });

    it('should display story', async () => {
        await storyPage.navigate(urgentAction.id, 0);

        const text = await storyPage.getActiveText();
        expect(text).toBe(
            'Ho Duy Hai a été condamné à mort en 2008 après avoir été déclaré coupable de pillage de biens et de meurtre.',
        );

        await storyPage.nextStep();
        const text2 = await storyPage.getActiveText();
        expect(text2).toBe(
            "En 2015, la Commission des Affaires judiciaires de l'Assemblée nationale a demandé le réexamen de son cas après avoir découvert de graves erreurs de procédure.",
        );

        await storyPage.nextStep();
        const text3 = await storyPage.getActiveText();
        expect(text3).toBe(
            "Le 7 décembre, le responsable du parquet de Long An a insisté, lors d'un discours à la télévision, pour que son exécution soit accélérée.",
        );

        await storyPage.lastStep();
    });

    it('should display act step', async () => {
        await actPage.navigate(urgentAction.id);

        const title = await actPage.getTitle();
        expect(title).toBe('GÉNIAL !');

        const text = await actPage.getText();
        expect(text).toBe(
            "Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.",
        );

        await actPage.next();

        await messagePage.isLoaded();
    });

    it('should display message steps', async () => {
        await messagePage.navigate(urgentAction.id, 0);
        const messages = await messagePage.getMessages();
        expect(messages[0]).toBe(
            'Dear Minister,\nI am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.',
        );

        expect(messages[1]).toBe(
            'On 5 July, police arrested Idil Eser along with seven other human rights defenders and two trainers, who were simply attending a workshop in Istanbul.',
        );

        expect(messages[2]).toBe(
            'They were doing nothing wrong. They are being investigated on suspicion of "membership of an armed terrorist organization", a baseless and ridiculous accusation.',
        );

        await messagePage.isLoaded();

        const indication = await messagePage.getIndication();
        expect(indication).toBe(
            'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
        );

        await messagePage.enterObjectText('My subject');

        expect(await messagePage.isButtonDisabled()).toBe(true);
        await messagePage.enterEmailText('super@man.fr');
        await messagePage.chooseCivility();
        await messagePage.enterSurnameText('My');
        await messagePage.enterNameText('name');
        expect(await messagePage.isButtonDisabled()).toBe(false);

        const mailTo = await messagePage.getMailTo();
        expect(mailTo).toContain('subject=My%20subject');
        expect(mailTo).toContain('My%20name');
    });

    it('should display thanks step', async () => {
        await thanksPage.navigate(urgentAction.id);

        const title = await thanksPage.getTitle();
        expect(title).toBe('MERCI DE VOTRE SOUTIEN !');

        const text = await thanksPage.getText();
        expect(text).toBe(
            "Pour aller plus loin, vous pouvez envoyer une lettre à l'ambassade d'Égypte ou partager cette histoire avec vos amis.",
        );
    });

    it('should display thanks-end step', async () => {
        await thanksEndPage.navigate(urgentAction.id);

        const title = await thanksEndPage.getTitle();
        expect(title).toBe('MERCI DE VOTRE AIDE !');

        const text = await thanksEndPage.getText();
        expect(text).toBe(
            "Il ne vous reste plus qu'à poster la lettre qui vous a été envoyée par courriel.",
        );
    });
});
