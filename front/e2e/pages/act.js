import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        title: By.tagName('h1'),
        text: By.className('rich-text'),
        displayMessageButton: By.css('a'),
    };
    return {
        navigate: async id => {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/act`);
            await driver.wait(until.elementLocated(elements.displayMessageButton));
        },
        getTitle: async () => driver.findElement(elements.title).getText(),
        getText: async () => driver.findElement(elements.text).getText(),
        displayMessage: async () => driver.findElement(elements.displayMessageButton).click(),
    };
};
