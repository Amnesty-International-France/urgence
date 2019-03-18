import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        activeSlide: By.className('swiper-slide-active'),
        activeSlideText: By.css('.swiper-slide-active .rich-text'),
        nextButton: By.css('.swiper-controls .next-arrow'),
        lastButton: By.css('.swiper-controls .last-arrow'),
    };
    return {
        navigate: async (id, step) => {
            this.id = id;
            this.step = step;
            await driver.navigate().to(`http://front:3000/#/ua/${id}/story/${step}`);
            await driver.wait(until.elementLocated(elements.activeSlide));
        },
        getActiveText: async () => driver.findElement(elements.activeSlideText).getText(),
        nextStep: async () => {
            const nextButton = await driver.findElement(elements.nextButton);
            await driver.wait(until.elementIsVisible(nextButton));
            await nextButton.click();
            await driver.sleep(220); // wait for transition to end
            this.step++;
            await driver.wait(until.urlIs(`http://front:3000/#/ua/${this.id}/story/${this.step}`));
            await driver.wait(until.elementLocated(elements.activeSlide));
        },
        lastStep: async () => {
            const lastButton = await driver.findElement(elements.lastButton);
            await driver.wait(until.elementIsVisible(lastButton));
            await lastButton.click();
            await driver.wait(until.urlIs(`http://front:3000/#/ua/${this.id}/act`));
        },
    };
};
