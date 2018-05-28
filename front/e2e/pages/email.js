import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        emailInput: By.className('input'),
        action: By.css('.action'),
    };

    return {
        navigate: async id => {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/email`);
            await driver.wait(until.elementLocated(elements.action));
        },
        typeEmail: async value => driver.findElement(elements.emailInput).sendKeys(value),
        validate: async () => driver.findElement(elements.action).click(),
    };
};
