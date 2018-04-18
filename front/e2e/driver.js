import chrome from 'selenium-webdriver/chrome';
import webdriver from 'selenium-webdriver';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(
    '--disable-application-cache --disk-cache-dir=/dev/null',
);

const builder = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions);

builder.usingServer('http://hub:4444/wd/hub');

const driver = builder.build();

export default driver;
