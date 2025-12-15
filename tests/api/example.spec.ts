import { test } from '../../core/fixtures/api.fixture';
import { expect } from '@playwright/test';


test.describe('API Tests', () => {
  test('Example GET request', async ({ api }) => {
    const response = await api.get('/api/products');
    expect(response.status()).toBe(200);
  });

  test('Example POST request', async ({ api }) => {
    const response = await api.post('/rest/user/login', {
      email: 'test@example.com',
      password: 'password'
    });
    expect(response.status()).toBe(401);
  });

  test('Register and login user', async ({ userApi }) => {
    const email = `test_${Date.now()}@example.com`;
    const password = 'Test1234!';
    const securityAnswer = 'Test';

    // Register
    const registerResult = await userApi.register({
      email,
      password,
      securityAnswer
    });
    expect(registerResult).toBeDefined();
    console.log('Register Result:', registerResult);

    // Login
    const loginResult = await userApi.login({
      email,
      password
    });
    console.log('Login Result:', loginResult);
    expect(loginResult).toBeDefined();
  });
});