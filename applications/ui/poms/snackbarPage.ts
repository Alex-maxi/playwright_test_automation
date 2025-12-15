import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { I18nHelper } from "../../../core/translationHelper";

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

    async waitForSnackbarDisplayed() {
        await this.waitForElementVisible(this.snackbar)
    }

    async waitForSnackbarAbsent() {
        await this.waitForElementAbsent(this.snackbar)
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
        languageText: I18nHelper.getTranslation("NOTIFICATION_LANGUAGE_CHANGE") || " Language has been changed to English",
        registrationText: I18nHelper.getTranslation("CONFIRM_REGISTER"),
        buttonText: I18nHelper.getTranslation("BTN_FORCE_RELOAD") || " Force page reload ",
        };
    }

}

export { SnackbarPage };