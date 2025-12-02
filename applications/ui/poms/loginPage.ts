import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginForm: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.loginForm = page.locator('#login-form');
    this.errorMessage = page.locator('#error-message');
  }

  async navigate() {
    await this.navigateTo('/#/login');
  }

  async isLoginFormVisible() {
    return await this.loginForm.isVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessageText() {
    return await this.errorMessage.innerText();
  }
}

export { LoginPage };