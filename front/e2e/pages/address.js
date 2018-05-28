import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        container: By.className('address'),
        addressInput: By.css('textarea'),
        action: By.css('.action'),
    };
    return {
        isLoaded: () => driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/address`);
            await this.isLoaded();
        },
        typeAddress: async value => driver.findElement(elements.addressInput).sendKeys(value),
        validate: async () => driver.findElement(elements.action).click(),
    };
};
