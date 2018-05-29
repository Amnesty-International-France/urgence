import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        validateButton: By.css('.action a'),
        input: By.css('input'),
        sendMailButton: By.css('.action a'),
        container: By.className('signature'),
    };
    return {
        isLoaded: async () => driver.wait(until.elementLocated(elements.container)),
        async navigate(id) {
            await driver.navigate().to(`http://front:3000/#/ua/${id}/signature`);
            await this.isLoaded();
        },
        enterText: async value => driver.findElement(elements.input).sendKeys(value),
        getMailTo: async () => driver.findElement(elements.sendMailButton).getAttribute('href'),
        isButtonDisabled: async () => {
            const className = await driver
                .findElement(elements.sendMailButton)
                .getAttribute('class');

            return className.includes('disabled');
        },
    };
};
