import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';
import { PageFactory } from '../../../core/pageFactory';


test.describe('Login Page', () => {
  test('Should display login form', async ({ pages }) => {
    await pages.loginPage.navigate();
    await expect(pages.loginPage.loginForm).toBeVisible();
  });

//   test('should login with valid credentials', async ({ page }) => {
//     await page.fill('#username', 'validUser');
//     await page.fill('#password', 'validPassword');
//     await page.click('#login-button');

//     const dashboard = page.locator('#dashboard');
//     await expect(dashboard).toBeVisible();
//   });

//   test('should show error with invalid credentials', async ({ page }) => {
//     await page.fill('#username', 'invalidUser');
//     await page.fill('#password', 'invalidPassword');
//     await page.click('#login-button');

//     const errorMessage = page.locator('#error-message');
//     await expect(errorMessage).toBeVisible();
//     await expect(errorMessage).toHaveText('Invalid username or password.');
//   });
});