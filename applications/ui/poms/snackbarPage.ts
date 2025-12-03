import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

class SnackbarPage extends BasePage {
    readonly snackbar: Locator;
    readonly snackbarTextLanguage: Locator;
    readonly snackbarButton: Locator;
    readonly snackbarTextRegistration: Locator;

    constructor(page: Page) {
        super(page);
        this.snackbar = page.locator('simple-snack-bar [matsnackbarlabel]');
        this.snackbarTextLanguage = page.locator('simple-snack-bar [matsnackbarlabel]',
            {hasText: " Language has been changed to English"});
        this.snackbarTextRegistration = page.locator('simple-snack-bar [matsnackbarlabel]',
            {hasText: " Registration completed successfully. You can now log in."});
        this.snackbarButton = page.locator('mat-snack-bar-container simple-snack-bar [matsnackbaractions] button');
    }

    async tapSnackbarButton() {
        await this.click(this.snackbarButton);
    }

    async waitForRegistrationSnackbarDisplayed() {
        await this.waitForElementVisible(this.snackbarTextRegistration)
    }

    async waitForRegistrationSnackbarAbsent() {
        await this.waitForElementAbsent(this.snackbarTextRegistration)
    }

    async waitForLanguageSnackbarAbsent() {
        await this.waitForElementAbsent(this.snackbarTextLanguage)
    }

    async getSnackbarText() {
        const text = await this.getText(this.snackbar);
        return text?.trim() ?? "";
    }

    getExpectedData() {
        return {
        languageText: " Language has been changed to English",
        registrationText: " Registration completed successfully. You can now log in.",
        buttonText: " Force page reload ",
        };
    }

}

export { SnackbarPage };