import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        emailInput: By.css('input'),
        action: By.css('.action'),
        container: By.css('.email-step'),
    };

    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/email`);
            await this.isLoaded();
        },
        typeEmail: async value => driver.findElement(elements.emailInput).sendKeys(value),
        validate: async () => driver.findElement(elements.action).click(),
    };
};
