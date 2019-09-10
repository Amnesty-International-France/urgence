import chrome from 'selenium-webdriver/chrome';
import webdriver from 'selenium-webdriver';

const chromeOptions = new chrome.Options();
chromeOptions.addArguments(
    '--disable-application-cache',
    '--disk-cache-dir=/dev/null',
    '--user-agent=Mozilla/5.0 (Linux; Android 4.2.2; Nexus 7 Build/JDQ39) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.49 Safari/537.31 ',
);

const builder = new webdriver.Builder().forBrowser('chrome').setChromeOptions(chromeOptions);

builder.usingServer('http://hub:4444/wd/hub');

const driver = builder.build();

export default driver;
