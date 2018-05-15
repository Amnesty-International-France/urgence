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
                expect(text).toBe(
                    'Ho Duy Hai a été condamné à mort en 2008 après avoir été déclaré coupable de pillage de biens et de meurtre.',
                );

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
                expect(text2).toBe(
                    "En 2015, la Commission des Affaires judiciaires de l'Assemblée nationale a demandé le réexamen de son cas après avoir découvert de graves erreurs de procédure.",
                );

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
                expect(text3).toBe(
                    "Le 7 décembre, le responsable du parquet de Long An a insisté, lors d'un discours à la télévision, pour que son exécution soit accélérée.",
                );
            },
            20000,
        );
    },
    20000,
);
