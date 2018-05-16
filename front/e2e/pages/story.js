import { By, until, Key } from 'selenium-webdriver';

export default driver => {
    const elements = {
        activeSlide: By.className('slick-active'),
        activeSlideText: By.css('.slick-active .rich-text'),
        actButton: By.css('.slick-active a'),
    };
    return {
        navigate: async (id, step) => {
            this.id = id;
            this.step = step;
            await driver
                .navigate()
                .to(`http://front:3000/#/ua/${id}/story/${step}`);
            await driver.wait(until.elementLocated(elements.activeSlide));
        },
        getActiveText: async () =>
            driver.findElement(elements.activeSlideText).getText(),
        nextStep: async () => {
            driver.findElement(elements.activeSlide).sendKeys(Key.RIGHT);
            this.step++;
            await driver.wait(
                until.urlIs(
                    `http://front:3000/#/ua/${this.id}/story/${this.step}`,
                ),
            );
        },
        act: async () => driver.findElement(elements.actButton).click(),
    };
};
