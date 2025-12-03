import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

class RegisterPage extends BasePage {
  readonly title: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly repeatPasswordField: Locator;
  readonly securityQuestionDropdown: Locator;
  readonly securityQuestion: Locator;
  readonly dropDown: Locator;
  readonly securityAnswerField: Locator;
  readonly registerButton: Locator;
  readonly successSnackBar: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly repeatPasswordError: Locator;
  readonly securityAnswerError: Locator;

  constructor(page: Page) {
    super(page);
    this.title = this.page.locator('app-register h1');
    this.emailField = this.page.locator('#emailControl');
    this.passwordField = this.page.locator('#passwordControl');
    this.repeatPasswordField = this.page.locator('#repeatPasswordControl');
    this.securityQuestionDropdown = this.page.getByRole('combobox');
    this.securityQuestion = this.page.locator(`#mat-option-${Math.floor(Math.random() * 15)}`);
    this.dropDown = this.page.locator('div[role="listbox"]');
    this.securityAnswerField = this.page.locator('#securityAnswerControl');
    this.registerButton = this.page.locator('#registerButton');
    this.successSnackBar = this.page.locator('simple-snack-bar');
    this.emailError = this.page.locator('mat-form-field:has(input#emailControl) mat-error');
    this.passwordError = this.page.locator('mat-form-field:has(input#passwordControl) mat-error');
    this.repeatPasswordError = this.page.locator('mat-form-field:has(input#repeatPasswordControl) mat-error');
    this.securityAnswerError = this.page.locator('mat-form-field:has(input#securityAnswerControl) mat-error');
  }

  async navigate() {
    await this.navigateTo('/#/register');
  }

  async fillRegistrationForm({ email, password, repeatPassword, securityAnswer }:{ 
    email?: string; password?: string; repeatPassword?: string; securityAnswer?: string}) {
    await this.typeText(this.emailField, email ?? "");
    await this.typeText(this.passwordField, password ?? "");
    await this.typeText(this.repeatPasswordField, repeatPassword ?? "");
    if (securityAnswer) {
        await this.selectSecurityQuestion();
        await this.waitForElementVisible(this.securityAnswerField);
      }
    await this.enterSecurityAnswer(securityAnswer ?? "");
    return this;
  }

  async fillRegistrationFormAndSubmit({ email, password, repeatPassword, securityAnswer }: { 
    email?: string; password?: string; repeatPassword?: string; securityAnswer?: string}) {
    await
    this.fillRegistrationForm({ email, password, repeatPassword, securityAnswer });
    await this.submit();
    return this;
  }

  async selectSecurityQuestion() {
    await this.clickSecurityQuestionDropdown();
    await this.click(this.securityQuestion);
    await this.waitForDropDownAbsent();
    return this;
  }

  async clickSecurityQuestionDropdown() {
    await this.click(this.securityQuestionDropdown);
    return this;
  }

  async getSecurityQuestionText() {
    const questionText = await this.securityQuestion.textContent()
    return questionText;
  }

  async enterSecurityAnswer(securityAnswer: string) {
    await this.typeText(this.securityAnswerField, securityAnswer ?? "");
    return this;
  }

  async waitForDropDownAbsent() {
    await this.waitForElementAbsent(this.dropDown);
    return this;
  }

  async submit() {
    await this.click(this.registerButton);
    return this;
  }

  async isRegistrationSuccessful() {
    await this.waitForElementAbsent(this.successSnackBar);
    await this.waitForElementVisible(this.successSnackBar);
    return await this.isVisible(this.successSnackBar);
  }

  getExpectedData() {
    return {
      emailError: "Please provide an email address.",
      passwordError:  "Please provide a password.",
      repeatPasswordError: "Please repeat your password.",
      securityAnswerError: "Please provide an answer to your security question.",
    };
  }

}

export { RegisterPage };