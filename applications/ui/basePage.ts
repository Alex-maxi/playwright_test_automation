import { Page } from "@playwright/test";
class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.evaluate(() => localStorage.clear());
  }
}

export { BasePage };    