import fetch from 'isomorphic-fetch';
import { By, until, Key } from 'selenium-webdriver';

import driver from './driver';

describe(
    'app',
    () => {
        let urgentAction;

        beforeAll(async () => {
            urgentAction = await fetch(
                'http://api:4000/test/createUrgentAction',
            ).then(r => r.json());
        });

        it(
            'should display story',
            async () => {
                await driver.get(`http://front:3000/#/ua/${urgentAction.id}`);

                await driver.wait(
                    until.urlIs(
                        `http://front:3000/#/ua/${urgentAction.id}/story/0`,
                    ),
                );
                const title = await driver.getTitle();
                expect(title).toBe('React App');
                const text = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text).toBe(urgentAction.story[0].content);

                await driver.wait(
                    until.elementLocated(By.className('slick-active')),
                );
                await driver
                    .findElement(By.className('slick-active'))
                    .sendKeys(Key.RIGHT);

                await driver.wait(
                    until.urlIs(
                        `http://front:3000/#/ua/${urgentAction.id}/story/01`,
                    ),
                );
                const text2 = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text2).toBe(urgentAction.story[1].content);

                await driver
                    .findElement(By.className('slick-active'))
                    .sendKeys(Key.RIGHT);

                await driver.wait(
                    until.urlIs(
                        `http://front:3000/#/ua/${urgentAction.id}/story/2`,
                    ),
                );
                const text3 = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text3).toBe(urgentAction.story[2].content);

                const actLink = await driver.findElement(By.tagName('a'));

                expect(await actLink.getText()).toBe("OK J'AGIS!");

                await actLink.click();

                await driver.wait(
                    until.urlIs(
                        `http://front:3000/#/ua/${urgentAction.id}/act`,
                    ),
                );
            },
            20000,
        );

        it('should display act step', async () => {
            const title = await driver.findElement(By.tagName('h1')).getText();
            expect(title).toBe('Génial !');

            const text = await driver
                .findElement(By.className('rich-text'))
                .getText();

            expect(text).toBe(
                "Nous vous proposons d'écrire au chef du pouvoir judiciaire Ayatollah Sadegh Lanjani.",
            );

            const link = await driver.findElement(By.tagName('a'));

            expect(await link.getText()).toBe('VOIR LE MESSAGE');

            await link.click();

            await driver.wait(
                until.urlIs(
                    `http://front:3000/#/ua/${urgentAction.id}/message/0`,
                ),
            );
        });

        it(
            'should display message steps',
            async () => {
                await driver.get(
                    `http://front:3000/#/ua/${urgentAction.id}/message/0`,
                );
                const text1 = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text1).toBe(urgentAction.message_template[0].value);

                await driver.get(
                    `http://front:3000/#/ua/${urgentAction.id}/message/1`,
                );
                await driver.navigate().refresh();
                const text2 = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text2).toBe(urgentAction.message_template[1].value);

                await driver.get(
                    `http://front:3000/#/ua/${urgentAction.id}/message/2`,
                );
                await driver.navigate().refresh();
                const text3 = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text3).toBe(urgentAction.message_template[2].value);

                await driver.get(
                    `http://front:3000/#/ua/${urgentAction.id}/message/3`,
                );
                await driver.navigate().refresh();
                const text4 = await driver
                    .findElement(By.css('.slick-active .rich-text'))
                    .getText();
                expect(text4).toBe(
                    'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
                );

                await driver
                    .findElement(By.css('.slick-active textarea'))
                    .sendKeys('My subject');

                await driver.get(
                    `http://front:3000/#/ua/${urgentAction.id}/message/4`,
                );
                await driver.navigate().refresh();
                const text5 = await driver
                    .findElement(By.css('.slick-active p'))
                    .getText();
                expect(text5).toBe(
                    'Parce que les actions uniques sont un message personnel, nous vous invitons à renseigner vos noms et prénoms.',
                );

                await driver
                    .findElement(By.css('.slick-active textarea'))
                    .sendKeys('My name');
            },
            20000,
        );
    },
    20000,
);
