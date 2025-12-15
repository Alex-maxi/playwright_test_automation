import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { I18nHelper } from "../../../core/translationHelper";

class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginForm: Locator;
  readonly errorMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByLabel('Email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    this.loginForm = page.locator('#login-form');
    this.errorMessage = page.locator('.error');
        // Validation messages
    this.emailError = this.page.locator('mat-form-field:has(input#email) mat-error');
    this.passwordError = this.page.locator('mat-form-field:has(input#password) mat-error');
  }

  async navigate() {
    await this.navigateTo('/#/login');
  }

  async isLoginFormVisible() {
    return await this.isVisible(this.loginForm);
  }

  async fillLoginForm({ email, password }: { email: string; password: string }) {
    await this.typeText(this.usernameInput, email);
    await this.typeText(this.passwordInput, password);
    this.clickOutside();
    return this;
  }

  async fillLoginFormAndLogin({ email, password }: { email: string; password: string }) {
    await this.fillLoginForm({ email, password })
    await this.waitForElementVisible(this.loginButton)
    await this.tapLoginButton();
    return this;
  }

  async tapLoginButton() {
    await this.click(this.loginButton);
  }


  async getErrorMessageText() {
    return await this.errorMessage.innerText();
  }

  getExpectedData() {
    return {
      invalidCredentials: "Invalid email or password.",
      emailRequired: I18nHelper.getTranslation("MANDATORY_EMAIL"),
      passwordRequired: I18nHelper.getTranslation("MANDATORY_PASSWORD")
    };
  }

}

export { LoginPage };