import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';


test.describe('Home Page', () => {

  test.beforeEach(async ({ pages }) => {
    await pages.getPage().context().addCookies([
      {
        name: 'cookieconsent_status',
        value: 'dismiss',
        domain: 'localhost',
        path: '/'
      },
      {
        name: 'welcomebanner_status',
        value: 'dismiss',
        domain: 'localhost',
        path: '/'
      }
    ]);
    await pages.registerPage.navigate();
    const EMAIL = `test_${Date.now()}@juice.local`;
    const PASSWORD = 'Test1234!';
    const SECURITY_ANSWER: string = 'SECURITY_ANSWER'
    await pages.registerPage.fillRegistrationFormAndSubmit({
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: PASSWORD,
      securityAnswer: SECURITY_ANSWER,
      selectQuestion: true
    });
    
    await expect(pages.snackbarPage.snackbarTextRegistration).toBeVisible();
    await expect(pages.loginPage.loginForm).toBeVisible();
    
    await pages.loginPage.fillLoginFormAndLogin({ email: EMAIL, password: PASSWORD });
    await expect(pages.homePage.accountButton).toBeVisible();

    await pages.homePage.navigate();
  });

  test('Should add first product to basket @smoke', async ({ pages, page }) => {
    const firstName = (await pages.homePage.getProductNameByIndex(0))?.trim() ?? '';
    await pages.snackbarPage.waitForSnackbarAbsent();
    await pages.homePage.addProductToBasketByIndex(0);
    await expect(pages.snackbarPage.snackbar).toContainText(`Placed ${firstName} into basket.`);
  });

  // test('Should search product @regression', async ({ pages }) => {
  //   const name = (await pages.homePage.getProductNameByIndex(0))?.trim() ?? '';
  //   await pages.homePage.searchProduct(name);
  //   await expect(pages.homePage.productNames.first()).toContainText(name);
  // });

  // test('Should open and close side menu @regression', async ({ pages }) => {
  //   await pages.homePage.openSideMenu();
  //   await expect(pages.homePage.sideMenu).toBeVisible();
  //   await pages.homePage.closeSideMenu();
  //   await expect(pages.homePage.sideMenu).toBeHidden();
  // });

  // test('Should navigate to login from account menu @regression', async ({ pages }) => {
  //   await pages.homePage.goToLogin();
  //   await expect(pages.loginPage.loginForm).toBeVisible();
  // });

});
