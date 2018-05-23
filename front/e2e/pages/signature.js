import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        validateButton: By.css('.action a'),
        textarea: By.css('textarea'),
        sendMailButton: By.css('.action a'),
    };
    return {
        navigate: async id => {
            this.id = id;
            await driver.navigate().to(`http://front:3000/#/ua/${id}/signature`);
            await driver.wait(until.elementLocated(elements.textarea));
        },
        enterText: async value => driver.findElement(elements.textarea).sendKeys(value),
        getMailTo: async () => driver.findElement(elements.sendMailButton).getAttribute('href'),
    };
};
