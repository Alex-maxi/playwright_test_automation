import { test as base } from '@playwright/test';
import { ApiClient } from '../apiClient';
import { UserApiHelper } from '../helpers/userApiHelper';

type ApiFixture = {
  api: ApiClient;
  userApi: UserApiHelper;
};

export const test = base.extend<ApiFixture>({
  api: async ({ playwright }, use) => {
    const requestContext = await playwright.request.newContext({
      baseURL: 'http://localhost:3000', // Adjust base URL as needed
    });
    const client = new ApiClient(requestContext);
    await use(client);
    await requestContext.dispose();
  },

  userApi: async ({ api }: { api: ApiClient }, use: (helper: UserApiHelper) => Promise<void>) => {
    const helper = new UserApiHelper(api);
    await use(helper);
  },
});