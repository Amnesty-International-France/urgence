import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
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
            await driver.navigate().to(`http://front:3000/ua/${slug}/message`);
            await this.isLoaded();
        },
        chooseCivility: async () => driver.findElement(elements.inputCivility).click(),
        enterFirstnameText: async value =>
            driver.findElement(elements.inputFirstname).sendKeys(value),
        enterLastnameText: async value =>
            driver.findElement(elements.inputLastname).sendKeys(value),
        enterEmailText: async value => driver.findElement(elements.inputEmail).sendKeys(value),
        clickButton: async () => driver.findElement(elements.sendMailButton).click(),
        getLegalInformation: async () => driver.findElement(elements.legalInformation).getText(),
        isButtonDisabled: async () => {
            const className = await driver
                .findElement(elements.sendMailButton)
                .getAttribute('class');

            return className.includes('disabled');
        },
    };
};
