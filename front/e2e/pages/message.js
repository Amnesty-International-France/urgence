import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        richText: By.css('.rich-text'),
        container: By.className('message'),
        inputObject: By.css('.object input'),
        indication: By.css('.objectIndication'),
        inputCivility: By.css('input[type=radio]'),
        inputSurname: By.css('.surname input'),
        inputName: By.css('.name input'),
        sendMailButton: By.css('.action a'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/message`);
            await this.isLoaded();
        },
        getMessages: async () => {
            const messageSteps = await driver.findElements(elements.richText);

            return Promise.all(messageSteps.map(messageStep => messageStep.getText()));
        },
        getIndication: async () => driver.findElement(elements.indication).getText(),
        enterObjectText: async value => driver.findElement(elements.inputObject).sendKeys(value),
        chooseCivility: async () => driver.findElement(elements.inputCivility).click(),
        enterSurnameText: async value => driver.findElement(elements.inputSurname).sendKeys(value),
        enterNameText: async value => driver.findElement(elements.inputName).sendKeys(value),
        getMailTo: async () => driver.findElement(elements.sendMailButton).getAttribute('href'),
        isButtonDisabled: async () => {
            const className = await driver
                .findElement(elements.sendMailButton)
                .getAttribute('class');

            return className.includes('disabled');
        },
    };
};
