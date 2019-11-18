import fetch from 'isomorphic-fetch';

import driver from './driver';

import homePageFactory from './pages/home';
import errorPageFactory from './pages/error';
import storyPageFactory from './pages/story';
import actPageFactory from './pages/act';
import messageViewPageFactory from './pages/messageView';
import messageSendPageFactory from './pages/messageSend';
import registerPageFactory from './pages/register';
import sharePageFactory from './pages/share';
import thanksEndPageFactory from './pages/thanksEnd';

const homePage = homePageFactory(driver);
const errorPage = errorPageFactory(driver);
const storyPage = storyPageFactory(driver);
const actPage = actPageFactory(driver);
const messageViewPage = messageViewPageFactory(driver);
const messageSendPage = messageSendPageFactory(driver);
const registerPage = registerPageFactory(driver);
const sharePage = sharePageFactory(driver);
const thanksEndPage = thanksEndPageFactory(driver);

describe('Urgent Action', () => {
    let urgentAction;

    beforeAll(async () => {
        urgentAction = await fetch('http://api:4000/test/createUrgentAction').then(r => r.json());
        await fetch('http://api:4000/test/createSettings').then(r => r.json());
    });

    afterAll(async () => {
        await fetch('http://api:4000/test/clearDb');
    });

    describe('app', () => {
        it('should display the story step', async () => {
            await storyPage.navigate(urgentAction.slug, 0);

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

        it('should display the act step', async () => {
            await actPage.navigate(urgentAction.slug);

            const title = await actPage.getTitle();
            expect(title).toBe('GÉNIAL !');

            const text = await actPage.getText();
            expect(text).toBe(
                "Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.",
            );

            await actPage.next();

            // await messageViewPage.isLoaded();
        });

        it('should display the message view step', async () => {
            await messageViewPage.navigate(urgentAction.slug);

            const text = await messageViewPage.getText();
            expect(text).toBe(
                "Parce que les messages uniques ont plus d'impact nous vous invitons à personnaliser l'objet de l'email.",
            );

            const messages = await messageViewPage.getMessages();
            expect(messages[0]).toBe(
                'Dear Minister,\nI am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.',
            );

            expect(messages[1]).toBe(
                'On 5 July, police arrested Idil Eser along with seven other human rights defenders and two trainers, who were simply attending a workshop in Istanbul.',
            );

            expect(messages[2]).toBe(
                'They were doing nothing wrong. They are being investigated on suspicion of "membership of an armed terrorist organization", a baseless and ridiculous accusation.',
            );

            const indication = await messageViewPage.getIndication();
            expect(indication).toBe(
                'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
            );

            expect(await messageViewPage.isButtonDisabled()).toBe(true);
            await messageViewPage.enterObjectText('My subject');
            expect(await messageViewPage.isButtonDisabled()).toBe(false);

            await messageViewPage.clickButton();
            // await messageSendPage.isLoaded();
        });

        it('should display the message send step', async () => {
            await messageSendPage.navigate(urgentAction.slug);

            const text = await messageSendPage.getText();
            expect(text).toBe('Compléter le formulaire suivant pour envoyer le message.');

            expect(await messageSendPage.isButtonDisabled()).toBe(true);
            await messageSendPage.chooseCivility();
            await messageSendPage.enterFirstnameText('My');
            await messageSendPage.enterLastnameText('name');
            await messageSendPage.enterEmailText('super@man.fr');
            expect(await messageSendPage.isButtonDisabled()).toBe(false);

            const legalInformation = await messageSendPage.getLegalInformation();
            expect(legalInformation).toBe(
                'Vos données personnelles sont traitées par Amnesty International France.',
            );

            await messageSendPage.clickButton();
            await registerPage.isLoaded();
        });

        it('should display the register step', async () => {
            await registerPage.navigate(urgentAction.slug);

            const title = await registerPage.getTitle();
            expect(title).toBe("CONTINUONS D'AGIR ENSEMBLE !");

            const text = await registerPage.getText();
            expect(text).toBe(
                "L'expérience vous a plu ? Inscrivez-vous pour recevoir les actions urgentes suivantes !",
            );

            expect(await registerPage.isButtonDisabled()).toBe(true);
            await registerPage.enterPhoneText('0836656565');
            expect(await registerPage.isButtonDisabled()).toBe(false);

            await registerPage.clickButton();
            await thanksEndPage.isLoaded();
        });

        it('should display the share step', async () => {
            await sharePage.navigate(urgentAction.slug);

            const title = await sharePage.getTitle();
            expect(title).toBe('SE BATTRE. ENCORE. ET ENCORE.');

            const text = await sharePage.getText();
            expect(text).toBe("Continuons d'agir en partageant cette histoire.");
        });

        it('should display the thanks-end step', async () => {
            await thanksEndPage.navigate(urgentAction.slug);

            const title = await thanksEndPage.getTitle();
            expect(title).toBe('MERCI DE VOTRE AIDE !');

            const text = await thanksEndPage.getText();
            expect(text).toBe('Nous comptons sur vous pour la prochaine action urgente.');
        });
    });

    // describe('home', () => {
    //     it('should display the last default urgent action', async () => {
    //         await homePage.navigate();

    //         const text = await storyPage.getActiveText();
    //         expect(text).toBe(
    //             'Ho Duy Hai a été condamné à mort en 2008 après avoir été déclaré coupable de pillage de biens et de meurtre.',
    //         );
    //     });
    // });

    // describe('error', () => {
    //     it('should display the error page', async () => {
    //         await errorPage.navigate();

    //         const text = await errorPage.getErrorMessage();
    //         expect(text).toBe(`Oups. Tout ne s'est pas passé comme prévu 🙈.`);
    //     });

    //     it('should display the error page if url is wrong', async () => {
    //         await errorPage.navigateWrongUrl();

    //         const text = await errorPage.getErrorMessage();
    //         expect(text).toBe(`Oups. Tout ne s'est pas passé comme prévu 🙈.`);
    //     });
    // });
});
