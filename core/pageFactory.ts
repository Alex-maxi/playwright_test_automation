import { Page } from "@playwright/test";
import { LoginPage } from "../applications/ui/poms/loginPage";


export class PageFactory {
  constructor(private readonly page: Page) {}

  // Lazy-loaded pages
  private _loginPage: LoginPage | undefined;

  get loginPage(): LoginPage {
    return (this._loginPage ??= new LoginPage(this.page));
  }
}
