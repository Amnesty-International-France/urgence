import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        title: By.className('long-text'),
        text: By.className('rich-text'),
        action: By.css('a'),
    };

    return {
        navigate: async id => {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/thanks-letter`);
            await driver.wait(until.elementLocated(elements.title));
        },
        getTitle: async () => driver.findElement(elements.title).getText(),
        getText: async () => driver.findElement(elements.text).getText(),
    };
};
