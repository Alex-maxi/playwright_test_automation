import { Page } from "@playwright/test";
import { LoginPage } from "../applications/ui/poms/loginPage";
import { WelcomePopup } from "../applications/ui/poms/welcomePopup";
import { RegisterPage } from "../applications/ui/poms/registerPage";
import { SnackbarPage } from "../applications/ui/poms/snackbarPage";


export class PageFactory {
  constructor(private readonly page: Page) {}

  // Lazy-loaded pages
  private _loginPage: LoginPage | undefined;
  private _welcomePopup: WelcomePopup | undefined;
  private _registerPage: RegisterPage | undefined;
  private _snackbarPage: SnackbarPage | undefined;



  get welcomePopup(): WelcomePopup {
    return (this._welcomePopup ??= new WelcomePopup(this.page));
  }

  get loginPage(): LoginPage {
    return (this._loginPage ??= new LoginPage(this.page));
  }
  get registerPage(): RegisterPage {
    return (this._registerPage ??= new RegisterPage(this.page));
  }
  get snackbarPage(): SnackbarPage {
    return (this._snackbarPage ??= new SnackbarPage(this.page));
  }

}
