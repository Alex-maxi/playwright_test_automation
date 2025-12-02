import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';
import { PageFactory } from '../../../core/pageFactory';


test.describe('Login Page', () => {
  test('Should display login form', async ({ pages }) => {
    await pages.loginPage.navigate();
    await expect(pages.loginPage.loginForm).toBeVisible();
  });

  test('Should display error message.', async ({ pages }) => {
    await pages.loginPage.navigate();
    await pages.welcomePopup.dismiss();
    await pages.loginPage.fillLoginFormAndLogin({ email: 'testuser', password: 'wrongpassword' });
    await expect(pages.loginPage.loginForm).toBeVisible();
    await expect(pages.loginPage.errorMessage).toHaveText(pages.loginPage.getExpectedData().invalidCredentials);
  });
});