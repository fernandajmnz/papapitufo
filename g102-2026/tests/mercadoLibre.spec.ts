import { test, expect } from '@playwright/test';


// Activity 1: MercadoLibre - los 7 locators recomendados
test.describe('mercado libre - locators', () => {
  test('usar los 7 locators recomendados para encontrar elementos', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('https://www.mercadolibre.com.mx/', { waitUntil: 'domcontentloaded' });

    // 1. getByRole
    const searchInput = page.getByRole('combobox');
    console.log('1. getByRole - searchbox encontrado:', await searchInput.isVisible());

    // 2. getByTestId
    const logo = page.getByTestId('logo');
    console.log('2. getByTestId - logo encontrado:', await logo.isVisible());

    // 3. getByAltText
    const logoImg = page.getByAltText('Mercado Libre');
    console.log('3. getByAltText - imagen encontrada:', await logoImg.isVisible());

    // 4. getByText
    const categoriesLink = page.getByRole('button', { name: 'Categorías' });
    console.log('4. getByText - categorias encontrado:', await categoriesLink.isVisible());

    // 5. getByLabel
    const searchLabel = page.getByLabel('Ingresa lo que quieras encontrar');
    console.log('5. getByLabel - input encontrado:', await searchLabel.isVisible());

    // 6. getByPlaceholder
    const searchPlaceholder = page.getByPlaceholder('Buscar productos, marcas y más…');
    console.log('6. getByPlaceholder - input encontrado:', await searchPlaceholder.isVisible());

    // 7. getByTitle
    const searchButton = page.getByTitle('Buscar');
    console.log('7. getByTitle - boton encontrado:', await searchButton.isVisible());
  });
});


// Activity 2: TodoMVC - anotaciones, tags, locators, assertions y page methods
test.describe('todomvc', () => {

  // test.skip() - no corre el test
  test('saltar este test por ahora', { tag: '@smoke' }, async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'todavia no funciona en webkit');
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });


  // test.fail() - corre el test y se espera que falle
  test('verificar titulo incorrecto', { tag: '@smoke' }, async ({ page }) => {
    test.fail();
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page).toHaveTitle('TodoMVC equivocado');
  });


  // test.fixme() - no corre el test, pendiente de arreglar
  test('limpiar tareas completadas', { tag: '@regression' }, async ({ page }) => {
    test.fixme();
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('tarea para borrar');
    await input.press('Enter');

    await page.locator('li').filter({ hasText: 'tarea para borrar' }).locator('.toggle').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    const count = await page.locator('li.todo').count();
    expect(count).toBe(0);
  });


  // test.slow() - triplica el timeout del test
  test('filtrar tareas activas y completadas', { tag: '@regression' }, async ({ page }) => {
    test.slow();
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('tarea uno');
    await input.press('Enter');
    await input.fill('tarea dos');
    await input.press('Enter');

    await page.locator('li').filter({ hasText: 'tarea uno' }).locator('.toggle').check();

    // soft assertions - sigue corriendo aunque alguna falle
    await expect.soft(page.getByText('tarea uno')).toBeVisible();
    await expect.soft(page.getByText('tarea dos')).toBeVisible();
    await expect.soft(page.locator('.todo-count')).toContainText('1');

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByText('tarea uno')).toBeVisible();
  });


  // test con todos los elementos: locators, assertions, screenshot y page methods
  test('agregar y completar una tarea', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('comprar fresas y uvas');
    await input.press('Enter');

    // auto-retrying assertion
    await expect(page.getByText('comprar fresas y uvas')).toBeVisible();
    await expect(page.locator('.todo-count')).toContainText('1');

    await page.locator('li').filter({ hasText: 'comprar fresas y uvas' }).locator('.toggle').check();

    // assertion negativa
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByText('comprar fresas y uvas')).not.toBeVisible();

    // non-retrying assertion
    const count = await page.locator('li.todo').count();
    expect(count).toBe(0);

    // page methods
    await page.goBack();
    await page.screenshot({ path: './tests/screenshots/todomvc.png' });
    console.log('titulo:', await page.title());
  });

});
