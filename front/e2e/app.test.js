import driver from './driver';

describe(
    'app',
    () => {
        it('should display home', async () => {
            await driver.get('http://front:3000/ua/0');
            const title = await driver.getTitle();
            expect(title).toBe('React App');
        });
    },
    20000,
);
