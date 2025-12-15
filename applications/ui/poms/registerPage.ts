import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

class RegisterPage extends BasePage {
  readonly title: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly repeatPasswordField: Locator;
  readonly securityQuestionDropdown: Locator;
  readonly securityQuestions: Locator;
  readonly dropDown: Locator;
  readonly securityAnswerField: Locator;
  readonly registerButton: Locator;
  readonly successSnackBar: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly repeatPasswordError: Locator;
  readonly securityAnswerError: Locator;
  readonly passwordHint: Locator;
  readonly passwordLengthCounter: Locator;
  readonly passwordAdviceToggle: Locator;
  readonly passwordAdvice: Locator;
  readonly passwordAdviceIcon: Locator;
  readonly passwordAdviceText: Locator;
  readonly securityQuestionHint: Locator;
  readonly securityQuestionHintIcon: Locator;
  readonly securityQuestionHintText: Locator;

  constructor(page: Page) {
    super(page);

    this.title = this.page.locator('app-register h1');

    this.emailField = this.page.locator('#emailControl');
    this.passwordField = this.page.locator('#passwordControl');
    this.passwordLengthCounter = this.page.locator('mat-form-field:has(#passwordControl) mat-hint').last();
    this.passwordAdviceToggle = this.page.getByRole('switch', { name: 'Show password advice' });
    this.passwordAdvice = this.page.locator('mat-card-content .info-row');
    this.passwordAdviceText = this.passwordAdvice.locator('span');
    this.passwordAdviceIcon = this.passwordAdvice.locator('mat-icon');
    this.repeatPasswordField = this.page.locator('#repeatPasswordControl');
    this.securityQuestionDropdown = this.page.getByRole('combobox');
    this.securityQuestions = this.page.locator('mat-option');
    this.securityQuestionHint = this.page.locator('mat-form-field:has([name="securityQuestion"]) mat-hint');
    this.securityQuestionHintIcon = this.securityQuestionHint.locator("svg");
    this.securityQuestionHintText = this.securityQuestionHint.locator("em");
    this.dropDown = this.page.getByRole('listbox');
    this.securityAnswerField = this.page.locator('#securityAnswerControl');
    this.registerButton = this.page.locator('#registerButton');
    this.successSnackBar = this.page.locator('simple-snack-bar');
    // Validation messages
    this.emailError = this.page.locator('mat-form-field:has(input#emailControl) mat-error');
    this.passwordError = this.page.locator('mat-form-field:has(input#passwordControl) mat-error');
    // this.passwordHint = this.page.getByText('Password must be 5-40 characters long.', { exact: true });
    this.passwordHint = this.page.locator('mat-form-field:has(#passwordControl) mat-hint').first();
    this.repeatPasswordError = this.page.locator('mat-form-field:has(input#repeatPasswordControl) mat-error');
    this.securityAnswerError = this.page.locator('mat-form-field:has(input#securityAnswerControl) mat-error');
  }

  async navigate() {
    await this.navigateTo('/#/register');
    await this.waitForTimeout(1000);
  }

  async fillRegistrationForm({
    email,
    password,
    repeatPassword,
    securityAnswer,
    selectQuestion = true
  }: {
    email?: string;
    password?: string;
    repeatPassword?: string;
    securityAnswer?: string;
    selectQuestion?: boolean
  }) {
    if (email !== undefined) {
      await this.typeText(this.emailField, email);
    }
    if (password !== undefined) {
      await this.typeText(this.passwordField, password);
    }
    if (repeatPassword !== undefined) {
      await this.typeText(this.repeatPasswordField, repeatPassword);
    }
    if (selectQuestion) {
      await this.waitForTimeout(500);
      await this.clickSecurityQuestionDropdown();
      await this.waitForTimeout(500);
      await this.waitForDropDownListDisplayed();
      await this.securityQuestions.nth(Math.floor(Math.random() * 13)).click();
      await this.waitForDropDownListAbsent();
    }
    if (securityAnswer !== undefined) {
      await this.typeText(this.securityAnswerField, securityAnswer);
    }
    this.clickOutside();
    return this;
  }

  async waitForDropDownListAbsent() {
    await this.waitForElementAbsent(this.dropDown);
    return this;
  }

  async waitForDropDownListDisplayed() {
    await this.waitForElementVisible(this.dropDown);
    return this;
  }

  async fillRegistrationFormAndSubmit(args: {
    email?: string; password?: string; repeatPassword?: string; securityAnswer?: string, selectQuestion?: boolean
  }) {
    await this.fillRegistrationForm(args);
    await this.submit();
    return this;
  }

  async clickSecurityQuestionDropdown() {
    await this.click(this.securityQuestionDropdown);
  }

  async submit() {
    await this.click(this.registerButton);
  }

  async isRegistrationSuccessful() {
    await this.waitForElementVisible(this.successSnackBar);
    return await this.isVisible(this.successSnackBar);
  }

  async getEmailError() {
    return await this.getText(this.emailError);
  }

  async getRepeatPasswordError() {
    return await this.getText(this.repeatPasswordError);
  }

  async getPasswordError() {
    return await this.getText(this.passwordError);
  }

  async getPasswordHintText() {
    return await this.getText(this.passwordHint);
  }

  async setShowPasswordAdviceToggle(state: boolean) {
    const toggle = this.passwordAdviceToggle;

    const current = await toggle.getAttribute('aria-checked');
    const isChecked = current === 'true';

    if (isChecked !== state) {
      await toggle.click();
    }
  }

  async getPasswordAdviceText(nth: number) {
    return await this.getText(this.passwordAdviceText.nth(nth));
  }

  async getAllPasswordAdviceText() {
    let result = [];
    for (let i = 0; i < await this.passwordAdviceText.count(); i++) {
      result.push(await this.getPasswordAdviceText(i))
    }
    return result;
  }

  async getSecurityAnswerError() {
    return await this.getText(this.securityAnswerError);
  }

  async getPasswordAdviceIconType(nth: number): Promise<string> {
    const attrValue = await this.passwordAdviceIcon.nth(nth).getAttribute('fonticon');
    return attrValue ?? "";
  }

  expectedData() {
    return {
      emailRequired: "Please provide an email address.",
      emailNotValid: "Email address is not valid.",
      passwordRequired: "Please provide a password.",
      repeatPasswordRequired: "Please repeat your password.",
      passwordNotMatch: "Passwords do not match",
      securityAnswerRequired: "Please provide an answer to your security question.",
      passwordAdvices: [
        "contains at least one lower character",
        "contains at least one upper character",
        "contains at least one digit",
        "contains at least one special character",
        "contains at least 8 characters"
      ]
    };
  }
}

export { RegisterPage };
