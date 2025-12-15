import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

class HomePage extends BasePage {
  // NAVBAR
  readonly navBar: Locator;
  readonly logo: Locator;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly accountButton: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly basketButton: Locator;
  readonly sideMenuButton: Locator;

  // SIDEMENU
  readonly sideMenu: Locator;
  readonly closeSidenavButton: Locator;
  readonly sidenavItems: Locator;

  // PRODUCTS
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly addToBasketButtons: Locator;

  // CATEGORIES
  readonly categories: Locator;

  // COOKIE CONSENT
  readonly cookieConsentDialog: Locator;
  readonly dismissCookieButton: Locator;

  // SNACKBAR
  readonly snackbar: Locator;
  readonly snackbarText: Locator;

  constructor(page: Page) {
    super(page);

    // --- NAVBAR ---
    this.navBar = page.locator('mat-toolbar');
    this.logo = page.locator('img[alt="OWASP Juice Shop"]');

    this.searchIcon = page.locator('mat-icon[mattooltip="Search"]');
    this.searchInput = page.locator('input[aria-label="Search for products"]');

    this.accountButton = page.locator('#navbarAccount');
    this.loginButton = page.locator('button[aria-label="Go to login page"]');
    this.logoutButton = page.locator('button[aria-label="Logout"]');

    this.basketButton = page.locator('button[aria-label="Show the shopping cart"]');

    this.sideMenuButton = page.locator('button[aria-label="Open Sidenav"]');

    // --- SIDEMENU ---
    this.sideMenu = page.locator('mat-sidenav');
    this.closeSidenavButton = page.locator('button[aria-label="Close Sidenav"]');
    this.sidenavItems = page.locator('mat-nav-list a');

    // --- PRODUCTS ---
    this.productCards = page.locator('mat-card');
    this.productNames = this.productCards.locator('.item-name');
    this.productPrices = this.productCards.locator('.item-price');
    this.addToBasketButtons = this.productCards.locator('button[aria-label="Add to Basket"]');

    // --- CATEGORIES ---
    this.categories = page.locator('mat-chip-list mat-chip');

    // --- COOKIE CONSENT ---
    this.cookieConsentDialog = page.locator('#cookieconsent');
    this.dismissCookieButton = page.getByText('Me want it!');

    // --- SNACKBAR ---
    this.snackbar = page.locator('simple-snack-bar');
    this.snackbarText = this.snackbar.locator('.mat-simple-snack-bar-content');
  }

  async navigate() {
    await this.page.goto('/#/search');
  }

  async searchProduct(text: string) {
    await this.searchIcon.click();
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }

  async openAccountMenu() {
    await this.accountButton.click();
  }

  async goToLogin() {
    await this.openAccountMenu();
    await this.loginButton.click();
  }

  async logout() {
    await this.openAccountMenu();
    await this.logoutButton.click();
  }

  async openSideMenu() {
    await this.sideMenuButton.click();
    await this.sideMenu.waitFor({ state: 'visible' });
  }

  async closeSideMenu() {
    await this.closeSidenavButton.click();
    await this.sideMenu.waitFor({ state: 'hidden' });
  }

  async addProductToBasketByIndex(index: number) {
    await this.addToBasketButtons.nth(index).click();
  }

  async getProductNameByIndex(index: number) {
    return await this.productNames.nth(index).textContent();
  }

  async getProductPriceByIndex(index: number) {
    return await this.productPrices.nth(index).textContent();
  }

  async waitForSnackbar() {
    await this.snackbar.waitFor({ state: 'visible' });
  }
}

export { HomePage };
