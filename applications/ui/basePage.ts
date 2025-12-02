import { Page, Locator } from "@playwright/test";
class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.evaluate(() => localStorage.clear());
  }

  async waitForElementVisible(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForElementAbsent(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async typeText(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async selectOption(locator: Locator, text: string) {
    await locator.selectOption({ label: text });
  }

  async isVisible(locator: Locator) {
    return await locator.isVisible();
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async clickOutside() {
    try {
      await this.page.mouse.click(10, 10);
    } catch (e) {
      await this.page.locator('body').click({ position: { x: 0, y: 0 } });
    }
    return this;
  }
}

export { BasePage };    