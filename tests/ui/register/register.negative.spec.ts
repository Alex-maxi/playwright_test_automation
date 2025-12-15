import { expect } from '@playwright/test';
import { test } from '../../../core/fixtures/pages.fixture';

test.beforeEach(async ({ pages }) => {
    await pages.registerPage.navigate();
    await pages.welcomePopup.dismiss();
});

test.describe('Register Page @negative', () => {

  test('Should show validation errors and keep register button disabled when submitting empty form', async ({ pages }) => {
    await pages.registerPage.fillRegistrationForm({
      email: "",
      password: "",
      repeatPassword: "",
      securityAnswer: "",
      selectQuestion: false
    });

    expect(await pages.registerPage.getEmailError()).toContain(pages.registerPage.expectedData().emailRequired);
    expect(await pages.registerPage.getPasswordError()).toContain(pages.registerPage.expectedData().passwordRequired);
    expect(await pages.registerPage.getRepeatPasswordError()).toContain(pages.registerPage.expectedData().repeatPasswordRequired);
    expect(await pages.registerPage.getSecurityAnswerError()).toContain(pages.registerPage.expectedData().securityAnswerRequired);

    await expect(pages.registerPage.registerButton).toBeDisabled();
  });

  test('Invalid email format shows correct error and register button stays disabled', async ({ pages }) => {
    await pages.registerPage.fillRegistrationForm({
      email: "invalid_email",
      selectQuestion: false
    });

    expect(await pages.registerPage.getEmailError()).toContain(pages.registerPage.expectedData().emailNotValid);
    await expect(pages.registerPage.registerButton).toBeDisabled();
  });

  test('Passwords mismatch should show correct error and keep button disabled', async ({ pages }) => {
    await pages.registerPage.fillRegistrationForm({
      email: 'user@test.com',
      password: 'Test1234!',
      repeatPassword: 'WrongPass!',
      selectQuestion: false
    });

    expect(await pages.registerPage.getRepeatPasswordError()).toContain(pages.registerPage.expectedData().passwordNotMatch);
    await expect(pages.registerPage.registerButton).toBeDisabled();
  });


});
