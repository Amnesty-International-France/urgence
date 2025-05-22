import { By, until } from 'selenium-webdriver';

export default (driver) => {
    const elements = {
        container: By.css('.message-send'),
        text: By.css('.text > .rich-text'),
        inputCivility: By.css('input[type=radio]'),
        inputFirstname: By.css('.firstname input'),
        inputLastname: By.css('.lastname input'),
        inputEmail: By.css('.email input'),
        sendMailButton: By.css('.action a'),
        legalInformation: By.css('.legal-information'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(slug) {
            await driver.navigate().to(`http://front:3000/ua/${slug}/message-send`);
            // await this.isLoaded();
        },
        getText: async () => driver.findElement(elements.text).getText(),
        chooseCivility: async () => driver.findElement(elements.inputCivility).click(),
        enterFirstnameText: async (value) =>
            driver.findElement(elements.inputFirstname).sendKeys(value),
        enterLastnameText: async (value) =>
            driver.findElement(elements.inputLastname).sendKeys(value),
        enterEmailText: async (value) => driver.findElement(elements.inputEmail).sendKeys(value),
        getLegalInformation: async () => driver.findElement(elements.legalInformation).getText(),
        test: console.log(async () => driver.findElement(elements.legalInformation).getText()),
        clickButton: async () => driver.findElement(elements.sendMailButton).click(),
        getButtonText: async () => driver.findElement(elements.sendMailButton).getText(),
        isButtonDisabled: async () => {
            const className = await driver
                .findElement(elements.sendMailButton)
                .getAttribute('class');

            return className.includes('disabled');
        },
    };
};
