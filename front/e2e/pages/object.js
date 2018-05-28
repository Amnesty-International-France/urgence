import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        indication: By.css('.rich-text'),
        validateButton: By.css('.action a'),
        input: By.css('input'),
        container: By.className('object'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            this.id = id;
            await driver.navigate().to(`http://front:3000/#/ua/${id}/object`);
            await this.isLoaded();
        },
        getIndication: async () => driver.findElement(elements.indication).getText(),
        enterText: async value => driver.findElement(elements.input).sendKeys(value),
        validate: async () => driver.findElement(elements.validateButton).click(),
    };
};
