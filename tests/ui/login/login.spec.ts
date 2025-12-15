import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';


test.beforeEach(async ({ pages }) => {
  await pages.getPage().context().addCookies([
      {
        name: 'welcomebanner_status',
        value: 'dismiss',
        domain: 'localhost',
        path: '/'
      }
    ]);
  await pages.loginPage.navigate();
});

test.describe('Login Page', () => {

  test('Should login user @smoke', async ({ pages }) => {
    await pages.registerPage.navigate();
    const EMAIL = `test_${Date.now()}@juice.local`;
    const PASSWORD = 'Test1234!';
    const SECURITY_ANSWER: string = 'SECURITY_ANSWER'
    await pages.registerPage.fillRegistrationFormAndSubmit({
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: PASSWORD,
      securityAnswer: SECURITY_ANSWER
    });
    await expect(pages.snackbarPage.snackbarTextRegistration).toBeVisible();
    await expect(pages.loginPage.loginForm).toBeVisible();
    await pages.loginPage.fillLoginFormAndLogin({ email: EMAIL, password: PASSWORD });
    await expect(pages.homePage.accountButton).toBeVisible();
  });

  test('Should display login form. @regression', async ({ pages }) => {
    await expect(pages.loginPage.loginForm).toBeVisible();
  });

  test('Should display error message. @regression', async ({ pages }) => {
    await pages.loginPage.fillLoginFormAndLogin({ email: 'testuser', password: 'wrongpassword' });
    await expect(pages.loginPage.loginButton).toBeEnabled();
    await expect(pages.loginPage.errorMessage).toHaveText(pages.loginPage.getExpectedData().invalidCredentials);
  });

  test('Should show email required validation. @regression', async ({ pages }) => {
    await pages.loginPage.fillLoginForm({ email: '', password: 'somepassword' });
    await expect(pages.loginPage.emailError).toContainText(pages.loginPage.getExpectedData().emailRequired);
    await expect(pages.loginPage.loginButton).toBeDisabled();
  });

  test('Should show password required validation. @regression', async ({ pages }) => {
    await pages.loginPage.fillLoginForm({ email: 'test@example.com', password: '' });
    await expect(pages.loginPage.passwordError).toContainText(pages.loginPage.getExpectedData().passwordRequired);
    await expect(pages.loginPage.loginButton).toBeDisabled();
  });

  test('Should show invalid credentials for bad email format. @regression', async ({ pages }) => {
    await pages.loginPage.fillLoginFormAndLogin({ email: 'notanemail', password: 'wrongpassword' });
    await expect(pages.loginPage.errorMessage).toContainText(pages.loginPage.getExpectedData().invalidCredentials);
  });
});