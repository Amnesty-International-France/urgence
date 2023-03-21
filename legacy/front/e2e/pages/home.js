import { By, until } from 'selenium-webdriver';

export default driver => {
    const elements = {
        activeSlide: By.className('swiper-slide-active'),
    };
    return {
        navigate: async () => {
            await driver.navigate().to(`http://front:3000`);
            await driver.wait(until.elementLocated(elements.activeSlide));
        },
    };
};
