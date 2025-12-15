import { ApiClient } from '../apiClient';

export interface UserData {
  email: string;
  password: string;
  securityAnswer: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class UserApiHelper {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async register(userData: UserData): Promise<any> {
    const response = await this.apiClient.post('/api/Users', {
      email: userData.email,
      password: userData.password,
      passwordRepeat: userData.password,
      securityQuestion: {
        id: 1,
        question: "Your eldest siblings middle name?",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      securityAnswer: userData.securityAnswer
    });

    if (response.status() !== 201) {
      throw new Error(`Registration failed: ${response.status()} ${await response.text()}`);
    }

    return await response.json();
  }

  async login(credentials: LoginCredentials): Promise<any> {
    const response = await this.apiClient.post('/rest/user/login', {
      email: credentials.email,
      password: credentials.password
    });

    if (response.status() !== 200) {
      throw new Error(`Login failed: ${response.status()} ${await response.text()}`);
    }

    return await response.json();
  }
}