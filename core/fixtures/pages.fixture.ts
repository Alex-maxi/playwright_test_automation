import { test as base } from "./api.fixture";
import { PageFactory } from "../pageFactory";

type PagesFixture = {
  pages: PageFactory;
};

export const test = base.extend<PagesFixture>({
  pages: async ({ page }, use) => {
    const factory = new PageFactory(page);
    await use(factory);
  },
});

