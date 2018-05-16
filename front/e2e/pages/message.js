import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        activeSlide: By.className('slick-active'),
        activeSlideText: By.css('.slick-active .rich-text'),
        actButton: By.css('.slick-active a'),
        activeTextArea: By.css('.slick-active textarea'),
        sendMailButton: By.css('.slick-active a'),
    };
    return {
        navigate: async (id, step) => {
            this.id = id;
            this.step = step;
            await driver
                .navigate()
                .to(`http://front:3000/#/ua/${id}/message/${step}`);
            await driver.wait(until.elementLocated(elements.activeSlide));
        },
        getActiveText: async () =>
            driver.findElement(elements.activeSlideText).getText(),
        nextStep: async () => {
            this.step++;
            await driver
                .navigate()
                .to(`http://front:3000/#/ua/${this.id}/message/${this.step}`);
            await driver.navigate().refresh();
        },
        enterText: async value =>
            driver.findElement(elements.activeTextArea).sendKeys(value),
        getMailTo: async () =>
            driver.findElement(elements.sendMailButton).getAttribute('href'),
    };
};
