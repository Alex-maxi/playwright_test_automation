import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';


test.describe('Register Page', () => {
  test('Should register user and display regisrtation snackbar.', async ({ pages }) => {
    const SECURITY_ANSWER: string = 'SECURITY_ANSWER'
    await pages.registerPage.navigate();
    await pages.welcomePopup.dismiss();
    await pages.registerPage.fillRegistrationFormAndSubmit({
      email: `test_${Date.now()}@juice.local`,
      password: 'Test1234!',
      repeatPassword: 'Test1234!',
      securityAnswer: SECURITY_ANSWER
    });
    await pages.snackbarPage.waitForLanguageSnackbarAbsent();
    await pages.snackbarPage.waitForRegistrationSnackbarDisplayed();
    await expect(pages.snackbarPage.snackbarTextRegistration).toBeVisible();
    await expect(pages.snackbarPage.snackbarTextRegistration).toContainText(pages.snackbarPage.getExpectedData().registrationText);
    await expect(pages.loginPage.loginForm).toBeVisible();
  });
});