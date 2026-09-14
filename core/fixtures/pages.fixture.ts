import { test as base } from "./api.fixture";
import { PageFactory } from "../pageFactory";

type PagesFixture = {
  pages: PageFactory;
};

export const test = base.extend<PagesFixture>({
  pages: async ({ page }, use) => {
    const baseUrl = process.env.BASE_URL_API_DEV || 'http://127.0.0.1:3000';

    await page.context().addCookies([
      { name: 'welcomebanner_status', value: 'dismiss', url: baseUrl },
      { name: 'cookieconsent_status', value: 'dismiss', url: baseUrl }
    ]);

    await page.addInitScript(() => {
      try {
        window.localStorage.setItem('welcomebanner_status', 'dismiss');
        window.localStorage.setItem('cookieconsent_status', 'dismiss');
      } catch (e) {}
    });

    const factory = new PageFactory(page);
    await use(factory);
  },
});

