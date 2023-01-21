import { Locator, Page } from '@playwright/test'

export class AuthPage {
    readonly page: Page

    readonly switchToRegister: Locator

    readonly switchToAuth: Locator

    readonly loginButton: Locator

    readonly registerButton: Locator

    readonly emailField: Locator

    readonly passwordField: Locator

    readonly nameField: Locator

    readonly errors: Locator

    readonly emailRow: Locator

    readonly passwordRow: Locator

    readonly apiError: Locator

    readonly nameRow: Locator

    constructor(page: Page) {
        this.page = page
        this.switchToRegister = page.locator('button[data-test="auth.switchToRegister"]')
        this.switchToAuth = page.locator('button[data-test="auth.switchToAuth"]')
        this.loginButton = page.locator('button[data-test="auth.login"]')
        this.registerButton = page.locator('button[data-test="auth.register"]')
        this.emailField = page.locator('input[data-test="auth.email"]')
        this.passwordField = page.locator('input[data-test="auth.password"]')
        this.nameField = page.locator('input[data-test="auth.name"]')
        this.emailRow = page.locator('[data-test="auth.emailRow"]')
        this.passwordRow = page.locator('[data-test="auth.passwordRow"]')
        this.nameRow = page.locator('[data-test="auth.nameRow"]')
        this.apiError = page.locator('[data-test="auth.apiError"]')
    }
}
