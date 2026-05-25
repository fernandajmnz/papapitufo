import { chromium, firefox, test, expect, BrowserContext } from '@playwright/test';


test.describe('github dummy login', () => {
  test('abrir github y hacer login con credenciales invalidas', async ({ page }) => {
    await page.goto('https://github.com/login');

    await page.getByLabel('Username or email address').fill('coqui@example.com');
    await page.getByLabel('Password').fill('12345678');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    await expect(page.getByText('Incorrect username or password.')).toBeVisible();
  });
});


test.describe('navegadores y contextos', () => {
  test('lanzar firefox', async () => {
    const browser = await firefox.launch();

    const context: BrowserContext = await browser.newContext();
    console.log('firefox context', browser.contexts().length);

    const page = await context.newPage();
    console.log('contexto despues de nueva pagina:', browser.contexts().length);

    await page.goto('https://playwright.dev/');

    await context.close();
    await browser.close();
  });
});


test.describe('multiples tabs', () => {
  test('abrir dos tabs en el mismo contexto de chromium', async () => {
    const browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();

    const page1 = await context.newPage();
    await page1.goto('https://playwright.dev/docs/intro');

    const page2 = await context.newPage();
    await page2.goto('https://playwright.dev/docs/writing-tests');

    const pages = context.pages();
    console.log('numero de tabs en el contexto:', pages.length);

    await browser.close();
  });
});


test.describe('metodos de pagina', () => {
  test('ir a github y regresar a la tab anterior', async () => {
    const browser = await firefox.launch();
    const context: BrowserContext = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    await page.screenshot({ path: './tests/screenshots/playwright.png' });

    await page.goto('https://github.com/');
    page.once('load', () => console.log('Page loaded!'));

    await page.goBack();

    await browser.close();
  });
});
