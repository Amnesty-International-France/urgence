import fetch from 'isomorphic-fetch';
import { until } from 'selenium-webdriver';

import driver from './driver';
import storyPageFactory from './pages/story';
import actPageFactory from './pages/act';
import messagePageFactory from './pages/message';
import thanksPageFactory from './pages/thanks';

const storyPage = storyPageFactory(driver);
const actPage = actPageFactory(driver);
const messagePage = messagePageFactory(driver);
const thanksPage = thanksPageFactory(driver);

describe('app', () => {
    let urgentAction;

    beforeAll(async () => {
        urgentAction = await fetch('http://api:4000/test/createUrgentAction').then(r => r.json());
    });

    it(
        'should display story',
        async () => {
            await storyPage.navigate(urgentAction.id, 0);
            const title = await driver.getTitle();
            expect(title).toBe('React App');
            const text = await storyPage.getActiveText();
            expect(text).toBe(urgentAction.story[0].content);

            await storyPage.nextStep();
            const text2 = await storyPage.getActiveText();
            expect(text2).toBe(urgentAction.story[1].content);

            await storyPage.nextStep();
            const text3 = await storyPage.getActiveText();
            expect(text3).toBe(urgentAction.story[2].content);

            await storyPage.act();

            await driver.wait(until.urlIs(`http://front:3000/#/ua/${urgentAction.id}/act`));
        },
        20000,
    );

    it('should display act step', async () => {
        await actPage.navigate(urgentAction.id);
        const title = await actPage.getTitle();
        expect(title).toBe('Génial !');

        const text = await actPage.getText();

        expect(text).toBe(
            "Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.",
        );

        await actPage.displayMessage();

        await driver.wait(until.urlIs(`http://front:3000/#/ua/${urgentAction.id}/message/0`));
    });

    it(
        'should display message steps',
        async () => {
            await messagePage.navigate(urgentAction.id, 0);
            const text1 = await messagePage.getActiveText();
            expect(text1).toBe(urgentAction.message_template[0].value);

            await messagePage.nextStep();
            const text2 = await messagePage.getActiveText();
            expect(text2).toBe(urgentAction.message_template[1].value);

            await messagePage.nextStep();
            const text3 = await messagePage.getActiveText();
            expect(text3).toBe(urgentAction.message_template[2].value);

            await messagePage.nextStep();
            const text4 = await messagePage.getActiveText();
            expect(text4).toBe(
                'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
            );

            await messagePage.enterText('My subject');

            await messagePage.nextStep();

            await messagePage.enterText('My name');

            const mailTo = await messagePage.getMailTo();
            expect(mailTo).toContain('subject=My%20subject');
            expect(mailTo).toContain('My%20name');
        },
        20000,
    );

    it('should display thanks step', async () => {
        await thanksPage.navigate(urgentAction.id);
        const title = await thanksPage.getTitle();

        expect(title).toBe('Merci de votre soutien !');
    });
});
