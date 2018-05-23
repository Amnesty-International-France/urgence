import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        richText: By.css('.rich-text'),
        nextButton: By.css('a'),
    };
    return {
        navigate: async (id, step) => {
            this.id = id;
            this.step = step;
            await driver.navigate().to(`http://front:3000/#/ua/${id}/message/${step}`);
            await driver.wait(until.elementLocated(elements.nextButton));
        },
        getMessages: async () => {
            const messageSteps = await driver.findElements(elements.richText);

            return Promise.all(messageSteps.map(messageStep => messageStep.getText()))
        },
        next: async () => driver.findElement(elements.nextButton).click(),
    };
};
