import test, { firefox, BrowserContext } from '@playwright/test';

test.describe('firefox test', () => {
  test('open firefox and navigate to newtab', async ({  }) => {

    const browser = await firefox.launch();
    console.log('browser: ', browser.contexts().length);
    const context: BrowserContext = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://playwright.dev/');
    console.log("browser contexts: ", browser.contexts().length);
    await browser.close();

  });
});

test.describe("browser context", () => {
  test('should open multiple pages in a new context', async ({  }) => {
    const browser = await firefox.launch();
    const context: BrowserContext = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://playwright.dev/');
    const page2 = await context.newPage();
    await page2.goto('https://www.google.com/');
    await page1.screenshot({path: "./tests/screenshots/page1.png"})
    await page2.screenshot({path: "./tests/screenshots/page2.png"})
    await browser.close();
   
  });

  
});