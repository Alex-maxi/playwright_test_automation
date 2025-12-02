import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";


class WelcomePopup extends BasePage {
  readonly dismissButtonSelector: Locator;

  constructor(page: Page) {
    super(page);
    // this.dismissButtonSelector = page.locator('[aria-label="Close Welcome Banner"]');
    this.dismissButtonSelector = page.locator('button', { hasText: 'Dismiss' });
  }

  async dismiss(locator = this.dismissButtonSelector) {
    await this.click(locator);
    await this.waitForElementAbsent(locator);
  }
}

export { WelcomePopup };