import fetch from 'isomorphic-fetch';
import { until } from 'selenium-webdriver';

import driver from './driver';
import storyPageFactory from './pages/story';
import actPageFactory from './pages/act';
import messagePageFactory from './pages/message';
import objectPageFactory from './pages/object';
import signaturePageFactory from './pages/signature';
import thanksPageFactory from './pages/thanks';
import addressPageFactory from './pages/address';
import emailPageFactory from './pages/email';
import thanksLetterPageFactory from './pages/thanksLetter';

const storyPage = storyPageFactory(driver);
const actPage = actPageFactory(driver);
const messagePage = messagePageFactory(driver);
const objectPage = objectPageFactory(driver);
const signaturePage = signaturePageFactory(driver);
const thanksPage = thanksPageFactory(driver);
const addressPage = addressPageFactory(driver);
const emailPage = emailPageFactory(driver);
const thanksLetterPage = thanksLetterPageFactory(driver);

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

        await storyPage.act();

        await driver.wait(until.urlIs(`http://front:3000/#/ua/${urgentAction.id}/act`));
    });

    it('should display act step', async () => {
        await actPage.navigate(urgentAction.id);
        const title = await actPage.getTitle();
        expect(title).toBe('Génial !');

        const text = await actPage.getText();

        expect(text).toBe(
            "Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.",
        );

        await actPage.displayMessage();

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

        await messagePage.next();
        await objectPage.isLoaded();
    });

    it('should display subject steps', async () => {
        await objectPage.navigate(urgentAction.id);
        const indication = await objectPage.getIndication();
        expect(indication).toBe(
            'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
        );

        await objectPage.enterText('My subject');

        await objectPage.validate();
        await signaturePage.isLoaded();
    });

    it('should display signature steps', async () => {
        await signaturePage.navigate(urgentAction.id);

        expect(await signaturePage.isButtonDisabled()).toBe(true);
        await signaturePage.enterText('My name');
        expect(await signaturePage.isButtonDisabled()).toBe(false);

        const mailTo = await signaturePage.getMailTo();
        expect(mailTo).toContain('subject=My%20subject');
        expect(mailTo).toContain('My%20name');
    });

    it('should display thanks step', async () => {
        await thanksPage.navigate(urgentAction.id);

        const title = await thanksPage.getTitle();
        expect(title).toBe('Merci de votre soutien !');

        const text = await thanksPage.getText();
        expect(text).toBe(
            "Pour aller plus loin, vous pouvez envoyer une lettre à l'ambassade d'Égypte ou partager cette histoire avec vos amis.",
        );
        await thanksPage.next();
        await addressPage.isLoaded();
    });

    it('should display address step', async () => {
        await addressPage.navigate(urgentAction.id);
        expect(await addressPage.isActionDisabled()).toBe(true);
        await addressPage.typeAddress(
            'M. Dupond\n4, rue du coin qui tourne en rond\n00 000 Perpéte La Galette',
        );
        expect(await addressPage.isActionDisabled()).toBe(false);

        await addressPage.validate();
        await emailPage.isLoaded();
    });

    it('should display email step', async () => {
        await emailPage.navigate(urgentAction.id);

        expect(await emailPage.isActionDisabled()).toBe(true);
        await emailPage.typeEmail('dupond@perpéte.com');
        expect(await emailPage.isActionDisabled()).toBe(false);

        await emailPage.validate();
        await thanksLetterPage.isLoaded();
    });

    it('should display thanks-letter step', async () => {
        await thanksLetterPage.navigate(urgentAction.id);

        const title = await thanksLetterPage.getTitle();
        expect(title).toBe('Merci de votre aide !');

        const text = await thanksLetterPage.getText();
        expect(text).toBe(
            "Il ne vous reste plus qu'as poster la lettre qui vous à été envoyé par courriel.",
        );
    });
});
