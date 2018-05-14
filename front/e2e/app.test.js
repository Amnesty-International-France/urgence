import driver from './driver';
import fetch from 'isomorphic-fetch';

describe(
    'app',
    () => {
        let urgentAction;
        beforeAll(async () => {
            urgentAction = await fetch('http://api:4000/test/createUrgentAction').then(r => r.text());
            console.log({urgentAction});
        }, 20000);

        it('should display home', async () => {
            await driver.get('http://front:3000/ua/0');
            const title = await driver.getTitle();
            expect(title).toBe('React App');
        });
    },
    20000,
);
