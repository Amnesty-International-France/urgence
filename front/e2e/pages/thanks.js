import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        title: By.tagName('h1'),
    };
    return {
        navigate: async id => {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/thanks`);
            await driver.wait(until.elementLocated(elements.title));
        },
        getTitle: async () => driver.findElement(elements.title).getText(),
    };
};
