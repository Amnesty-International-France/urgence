import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        errorMessage: By.className('error'),
        actionButton: By.css('a'),
    };
    return {
        navigate: async () => {
            await driver.navigate().to(`http://front:3000/error`);
            await driver.wait(until.elementLocated(elements.errorMessage));
        },
        navigateWrongUrl: async () => {
            await driver.navigate().to(`http://front:3000/wrong-url`);
            await driver.wait(until.elementLocated(elements.errorMessage));
        },
        getErrorMessage: async () => driver.findElement(elements.errorMessage).getText(),
        clickButton: async () => driver.findElement(elements.actionButton).click(),
    };
};
