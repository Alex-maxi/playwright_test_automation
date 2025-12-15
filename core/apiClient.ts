import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async get(url: string, options?: { headers?: Record<string, string>; params?: Record<string, string> }): Promise<APIResponse> {
    try {
      const response = await this.request.get(url, options);
      this.logRequest('GET', url, response.status());
      return response;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  async post(url: string, data?: any, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    try {
      const response = await this.request.post(url, { data, ...options });
      this.logRequest('POST', url, response.status());
      return response;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  async put(url: string, data?: any, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    try {
      const response = await this.request.put(url, { data, ...options });
      this.logRequest('PUT', url, response.status());
      return response;
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  async delete(url: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    try {
      const response = await this.request.delete(url, options);
      this.logRequest('DELETE', url, response.status());
      return response;
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }

  private logRequest(method: string, url: string, status: number) {
    console.log(`${method} ${url} - ${status}`);
  }
}