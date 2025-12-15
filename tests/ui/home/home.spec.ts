import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';


test.describe('Home Page', () => {

  let userEmail: string;

  test.beforeEach(async ({ pages, api, userApi }) => {
    // Register and login via API
    userEmail = `test_${Date.now()}_${Math.random()}@example.com`;
    await userApi.register({
      email: userEmail,
      password: 'Test1234!',
      securityAnswer: 'Test'
    });
    const token = await userApi.login({
      email: userEmail,
      password: 'Test1234!'
    });

    // Set token cookie to browser
    await pages.getPage().context().addCookies([{
      name: 'token',
      value: token,
      domain: 'localhost',
      path: '/'
    }]);

    // Navigate to home
    await pages.homePage.navigate();
    await pages.welcomePopup.dismiss();
  });

  test('Should add first product to basket @smoke', async ({ pages }) => {
    const firstName = (await pages.homePage.getProductNameByIndex(0))?.trim() ?? '';
    await pages.homePage.addProductToBasketByIndex(0);
    await pages.homePage.waitForSnackbar();
    const text = await pages.homePage.waitForSnackbarText('');
    expect(text?.trim()).not.toBe('');
  });

  test('Should search product @regression', async ({ pages }) => {
    const name = (await pages.homePage.getProductNameByIndex(0))?.trim() ?? '';
    await pages.homePage.searchProduct(name);
    await expect(pages.homePage.productNames.first()).toContainText(name);
  });

  test('Should open and close side menu @regression', async ({ pages }) => {
    await pages.homePage.openSideMenu();
    await expect(pages.homePage.sideMenu).toBeVisible();
    await pages.homePage.closeSideMenu();
    await expect(pages.homePage.sideMenu).toBeHidden();
  });

  test('Should navigate to login from account menu @regression', async ({ pages }) => {
    await pages.homePage.goToLogin();
    await expect(pages.loginPage.loginForm).toBeVisible();
  });

});