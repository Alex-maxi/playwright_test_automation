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
  readonly forgotPasswordLink: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByLabel('Email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    this.loginForm = page.locator('#login-form');
    this.errorMessage = page.locator('.error, .mat-error');
    this.emailError = page.locator('mat-form-field:has(input#email) mat-error');
    this.passwordError = page.locator('mat-form-field:has(input#password) mat-error');
    this.forgotPasswordLink = page.getByText('Forgot your password?').locator('a');
    this.registerLink = page.getByText('Register here').locator('a');
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
    await this.fillLoginForm({ email, password });
    await this.tapLoginButton();
    await this.page.waitForURL('/#/search');
    return this;
  }

  async tapLoginButton() {
    await this.page.waitForLoadState('networkidle');
    await this.click(this.loginButton, true);
  }

  async clickRegisterLink() {
    await this.click(this.registerLink);
  }

  async clickForgotPasswordLink() {
    await this.click(this.forgotPasswordLink);
  }

  async getErrorMessageText() {
    return await this.errorMessage.innerText();
  }

  async getEmailErrorText() {
    const errors = this.emailError.allTextContents();
    return await errors;
  }

  async getPasswordErrorText() {
    const errors = this.passwordError.allTextContents();
    return await errors;
  }

  getExpectedData() {
    return {
      invalidCredentials: "Invalid email or password.",
      emailRequired: I18nHelper.getTranslation("MANDATORY_EMAIL"),
      passwordRequired: I18nHelper.getTranslation("MANDATORY_PASSWORD"),
      emailExists: "This email is already registered",
      registerLinkText: "Register here"
    };
  }

  async waitForLoginSuccess() {
    // Чекаємо на з'явлення кнопки акаунту або іншого маркера успішного входу
    await this.page.waitForSelector('#accountButton', { timeout: 5000 });
  }
}

export { LoginPage };