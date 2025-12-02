import { Page } from "@playwright/test";
import { LoginPage } from "../applications/ui/poms/loginPage";
import { WelcomePopup } from "../applications/ui/poms/welcomePopup";


export class PageFactory {
  constructor(private readonly page: Page) {}

  // Lazy-loaded pages
  private _loginPage: LoginPage | undefined;
  private _welcomePopup: WelcomePopup | undefined;

  get welcomePopup(): WelcomePopup {
    return (this._welcomePopup ??= new WelcomePopup(this.page));
  }

  get loginPage(): LoginPage {
    return (this._loginPage ??= new LoginPage(this.page));
  }
}
