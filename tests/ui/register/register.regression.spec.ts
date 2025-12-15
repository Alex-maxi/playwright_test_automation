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
  await pages.registerPage.navigate();
});

test.describe('Register Page @regression', () => {

  test('User can successfully register @critical @smoke', async ({ pages }) => {
    const SECURITY_ANSWER: string = 'SECURITY_ANSWER'
    await pages.registerPage.fillRegistrationFormAndSubmit({
      email: `test_${Date.now()}@juice.local`,
      password: 'Test1234!',
      repeatPassword: 'Test1234!',
      securityAnswer: SECURITY_ANSWER,
      selectQuestion: true
    });
    await pages.snackbarPage.waitForLanguageSnackbarAbsent();
    await pages.snackbarPage.waitForRegistrationSnackbarDisplayed();
    await expect(pages.snackbarPage.snackbarTextRegistration).toBeVisible();
    await expect(pages.snackbarPage.snackbarTextRegistration).toContainText(pages.snackbarPage.getExpectedData().registrationText);
    await expect(pages.loginPage.loginForm).toBeVisible();
  });

  test('Should not allow registering the same email twice', async ({ pages }) => {
    const email = `dup_${Date.now()}@juice.local`;

    await pages.registerPage.fillRegistrationFormAndSubmit({
      email,
      password: 'Test1234!',
      repeatPassword: 'Test1234!',
      securityAnswer: 'A'
    });

    await pages.snackbarPage.waitForRegistrationSnackbarDisplayed();

    // retry registration
    await pages.registerPage.navigate();
    await pages.registerPage.fillRegistrationFormAndSubmit({
      email,
      password: 'Test1234!',
      repeatPassword: 'Test1234!',
      securityAnswer: 'A'
    });

    await pages.snackbarPage.waitForRegistrationSnackbarAbsent();
    await expect(pages.loginPage.loginForm).not.toBeVisible();
  });

  test('Security question dropdown opens and displays options', async ({ pages }) => {
    await pages.registerPage.clickSecurityQuestionDropdown();

    await expect(pages.registerPage.dropDown).toBeVisible();
  });

  test('Password advices with icons.', async ({ pages }) => {
    await pages.registerPage.setShowPasswordAdviceToggle(true);
    await pages.registerPage.fillRegistrationForm({
      password: 'c',
      selectQuestion: false
    });

    expect(await pages.registerPage.getAllPasswordAdviceText()).toEqual(pages.registerPage.expectedData().passwordAdvices);
    expect(await pages.registerPage.getPasswordAdviceIconType(0)).toEqual("done");
    expect(await pages.registerPage.getPasswordAdviceIconType(1)).toEqual("error");

    await pages.registerPage.fillRegistrationForm({
      password: 'cC',
      selectQuestion: false
    });
    expect(await pages.registerPage.getPasswordAdviceIconType(0)).toEqual("done");
    expect(await pages.registerPage.getPasswordAdviceIconType(1)).toEqual("done");

    await pages.registerPage.fillRegistrationForm({
      password: 'qwertyui',
      selectQuestion: false
    });
    expect(await pages.registerPage.getPasswordAdviceIconType(4)).toEqual("done");


  });

});
