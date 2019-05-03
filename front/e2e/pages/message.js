import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        richText: By.css('.rich-text'),
        container: By.className('message'),
        inputObject: By.css('.object input'),
        indication: By.css('.objectIndication'),
        inputEmail: By.css('.email input'),
        inputCivility: By.css('input[type=radio]'),
        inputFirstname: By.css('.firstname input'),
        inputLastname: By.css('.lastname input'),
        sendMailButton: By.css('.action a'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(slug) {
            await driver.navigate().to(`http://front:3000/#/ua/${slug}/message`);
            await this.isLoaded();
        },
        getMessages: async () => {
            const messageSections = await driver.findElements(elements.richText);

            return Promise.all(messageSections.map(messageSection => messageSection.getText()));
        },
        getIndication: async () => driver.findElement(elements.indication).getText(),
        enterObjectText: async value => driver.findElement(elements.inputObject).sendKeys(value),
        enterEmailText: async value => driver.findElement(elements.inputEmail).sendKeys(value),
        chooseCivility: async () => driver.findElement(elements.inputCivility).click(),
        enterFirstnameText: async value =>
            driver.findElement(elements.inputFirstname).sendKeys(value),
        enterLastnameText: async value =>
            driver.findElement(elements.inputLastname).sendKeys(value),
        isButtonDisabled: async () => {
            const className = await driver
                .findElement(elements.sendMailButton)
                .getAttribute('class');

            return className.includes('disabled');
        },
    };
};
