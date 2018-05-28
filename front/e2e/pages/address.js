import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        addressInput: By.className('textarea'),
        action: By.css('.action'),
    };
    return {
        navigate: async id => {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/address`);
            await driver.wait(until.elementLocated(elements.action));
        },
        typeAddress: async value => driver.findElement(elements.addressInput).sendKeys(value),
        validate: async () => driver.findElement(elements.action).click(),
    };
};
