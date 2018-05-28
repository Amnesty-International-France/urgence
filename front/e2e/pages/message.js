import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        richText: By.css('.rich-text'),
        nextButton: By.css('a'),
        container: By.className('message'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/message`);
            await this.isLoaded();
        },
        getMessages: async () => {
            const messageSteps = await driver.findElements(elements.richText);

            return Promise.all(messageSteps.map(messageStep => messageStep.getText()))
        },
        next: async () => driver.findElement(elements.nextButton).click(),
    };
};
