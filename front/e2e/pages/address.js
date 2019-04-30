import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        container: By.className('address'),
        addressMainInput: By.css('.addressMain input'),
        addressMoreInput: By.css('.addressMore input'),
        postalCodeInput: By.css('.postalCode input'),
        cityInput: By.css('.city input'),
        countryInput: By.css('.country input'),
        emailInput: By.css('.email input'),
        action: By.css('.action a'),
    };
    return {
        isLoaded: () => driver.wait(until.elementLocated(elements.container)),
        async navigate(slug) {
            await driver.navigate().to(`http://front:3000/#/ua/${slug}/address`);
            await this.isLoaded();
        },
        typeAddressMain: async value =>
            driver.findElement(elements.addressMainInput).sendKeys(value),
        typeAddressMore: async value =>
            driver.findElement(elements.addressMoreInput).sendKeys(value),
        typePostalCode: async value => driver.findElement(elements.postalCodeInput).sendKeys(value),
        typeCity: async value => driver.findElement(elements.cityInput).sendKeys(value),
        typeCountry: async value => driver.findElement(elements.countryInput).sendKeys(value),
        typeEmail: async value => driver.findElement(elements.emailInput).sendKeys(value),
        validate: async () => driver.findElement(elements.action).click(),
        isActionDisabled: async () => {
            const className = await driver.findElement(elements.action).getAttribute('class');

            return className.includes('disabled');
        },
    };
};
