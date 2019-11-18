import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        container: By.className('message-view'),
        text: By.css('.text > .rich-text'),
        letterMessageSections: By.css('.letter-message-section > .rich-text'),
        inputObject: By.css('.object input'),
        indication: By.css('.objectIndication'),
        nextButton: By.css('.action a'),
    };

    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(slug) {
            await driver.navigate().to(`http://front:3000/ua/${slug}/message`);
            await this.isLoaded();
        },
        getText: async () => driver.findElement(elements.text).getText(),
        getMessages: async () => {
            const messageSections = await driver.findElements(elements.letterMessageSections);
            return Promise.all(messageSections.map(messageSection => messageSection.getText()));
        },
        getIndication: async () => driver.findElement(elements.indication).getText(),
        enterObjectText: async value => driver.findElement(elements.inputObject).sendKeys(value),
        clickButton: async () => driver.findElement(elements.nextButton).click(),
        getButtonText: async () => driver.findElement(elements.nextButton).getText(),
        isButtonDisabled: async () => {
            const className = await driver.findElement(elements.nextButton).getAttribute('class');
            return className.includes('disabled');
        },
    };
};
