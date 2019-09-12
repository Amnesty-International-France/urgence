import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        title: By.className('long-text'),
        text: By.className('rich-text'),
        action: By.css('a'),
    };

    return {
        isLoaded: () => driver.wait(until.elementLocated(elements.text)),
        navigate: async slug => {
            await driver.navigate().to(`http://front:3000/ua/${slug}/thanks-end`);
            await driver.wait(until.elementLocated(elements.title));
        },
        getTitle: async () => driver.findElement(elements.title).getText(),
        getText: async () => driver.findElement(elements.text).getText(),
    };
};
