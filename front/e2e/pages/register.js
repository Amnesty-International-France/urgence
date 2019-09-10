import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        header: By.className('header'),
        title: By.css('.header .long-text'),
        text: By.css('.header .rich-text'),
        legalInformation: By.css('.legal-information'),
        inputEmail: By.css('.email input'),
        inputPhone: By.css('.phone input'),
        inputCivility: By.css('input[type=radio]'),
        inputFirstname: By.css('.firstname input'),
        inputLastname: By.css('.lastname input'),
        registerButton: By.css('.action a'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.header)),
        async navigate(slug) {
            await driver.navigate().to(`http://front:3000/#/ua/${slug}/register`);
            await this.isLoaded();
        },
        getTitle: async () => driver.findElement(elements.title).getText(),
        getText: async () => driver.findElement(elements.text).getText(),
        enterEmailText: async value => driver.findElement(elements.inputEmail).sendKeys(value),
        enterPhoneText: async value => driver.findElement(elements.inputPhone).sendKeys(value),
        chooseCivility: async () => driver.findElement(elements.inputCivility).click(),
        enterFirstnameText: async value =>
            driver.findElement(elements.inputFirstname).sendKeys(value),
        enterLastnameText: async value =>
            driver.findElement(elements.inputLastname).sendKeys(value),
        clickButton: async () => {
            driver.findElement(elements.registerButton).click();
        },
        isButtonDisabled: async () => {
            const className = await driver
                .findElement(elements.registerButton)
                .getAttribute('class');

            return className.includes('disabled');
        },
        getLegalInformation: async () => driver.findElement(elements.legalInformation).getText(),
    };
};
