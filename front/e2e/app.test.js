import { By } from 'selenium-webdriver';
import driver from './driver';

describe('app', () => {
    it('should display home', async () => {
        await driver.get('http://app-e2e:3000');
        const text = await driver.findElement(By.tagName('body')).getText();
        expect(text).toBe('Home');
    });
});
