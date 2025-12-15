import { Page, Locator } from "@playwright/test";
class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.evaluate(() => localStorage.clear());
  }

  async waitForElementVisible(locator: Locator, timeout = 10000) {
    try {
      // await locator.waitFor({ state: 'attached', timeout });
      await locator.waitFor({ state: 'visible', timeout });
    } catch(e) {
      console.error(e);
    }
    
  }

  async waitForElementAbsent(locator: Locator, timeout = 10000) {
    await locator.waitFor({ state: 'detached', timeout });
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

  async getText(locator: Locator) {
    try {
      await this.waitForElementVisible(locator);
      let text = await locator.textContent();
      text === "" ? await locator.innerText() : ""
      return text;
    } catch {
        return "";
      }
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