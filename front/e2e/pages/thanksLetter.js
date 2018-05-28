import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        container: By.className('thanks'),
        title: By.tagName('h1'),
        text: By.css('.content .text'),
    };

    return {
        isLoaded: async () => await driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/thanks-letter`);
            await this.isLoaded();
        },
        getTitle: async () => driver.findElement(elements.title).getText(),
        getText: async () => driver.findElement(elements.text).getText(),
    };
};
