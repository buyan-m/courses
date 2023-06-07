import { expect, test } from '@playwright/test'
import { AuthPage } from '../pages/auth.page'
import routes from '../constants/routes'
import credentials from '../constants/auth-credentials'
import { fieldErrorClass } from '../constants/elements'
import { logout } from '../utils/login'

test.describe('Auth', () => {
    test('Home page opened', async ({ page }) => {
        await page.goto(routes.homePage, { timeout: 10000 })
        await expect(page.locator('span').nth(0)).toHaveText('Image by Drazen Zigic on Freepik')
    })

    test('Courses page was redirected to auth', async ({ page }) => {
        const authPage = new AuthPage(page)
        await page.goto(routes.coursesPage)
        await expect(page).toHaveURL(routes.authPageWithRedirect)
        await expect(authPage.loginButton).toBeVisible()
    })

    test.describe('Log in', () => {
        test.beforeEach(async ({ page }) => {
            const authPage = new AuthPage(page)
            await page.goto(routes.coursesPage)
            await expect(page).toHaveURL(routes.authPageWithRedirect)
            await expect(authPage.loginButton).toBeVisible()
        })

        test('Log in without credentials', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.clear()
            await authPage.passwordField.clear()
            await authPage.loginButton.click()
            await expect(authPage.emailRow).toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).toHaveClass(fieldErrorClass)
        })

        test('Log in with email only', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.fill(credentials.logIn.editor.email)
            await authPage.passwordField.clear()
            await authPage.loginButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).toHaveClass(fieldErrorClass)
        })
        test('Log in with password only', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.clear()
            await authPage.passwordField.fill(credentials.logIn.editor.password)
            await authPage.loginButton.click()
            await expect(authPage.emailRow).toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
        })
        test('Log in with incorrect email', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.fill(credentials.create.email())
            await authPage.passwordField.fill(credentials.create.password)
            await authPage.loginButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.apiError).toBeVisible()
            // await expect(authPage.apiError).toContainText('')
        })
        test('Log in with incorrect password', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.fill(credentials.logIn.editor.email)
            await authPage.passwordField.fill(credentials.create.password)
            await authPage.loginButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.apiError).toBeVisible()
        })
        test('Log in with correct credentials', async ({ page }) => {
            const authPage = new AuthPage(page)
            await page.goto(routes.coursesPage)
            await expect(page).toHaveURL(routes.authPageWithRedirect)
            await authPage.emailField.fill(credentials.logIn.editor.email)
            await authPage.passwordField.fill(credentials.logIn.editor.password)
            await authPage.loginButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.apiError).not.toBeVisible()
            await expect(page).toHaveURL(routes.coursesPage)
        })
        test.afterAll(async ({ page, context }) => {
            await page.goto(routes.coursesPage)
            await logout(context)
            await page.reload()
            await expect(page).toHaveURL(routes.authPageWithRedirect)
        })
    })

    test.describe('Register', () => {
        test.beforeEach(async ({ page }) => {
            const authPage = new AuthPage(page)
            await page.goto(routes.coursesPage)
            await expect(page).toHaveURL(routes.authPageWithRedirect)
            await authPage.switchToRegister.click()
            await expect(authPage.nameField).toBeVisible()
        })
        test('Register with incorrect email', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.fill(credentials.logIn.editor.email)
            await authPage.nameField.fill('qwertin')
            await authPage.passwordField.fill(credentials.create.password)
            await authPage.registerButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.apiError).toBeVisible()
        })
        test('Register without name', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.fill(credentials.logIn.editor.email)
            await authPage.nameField.clear()
            await authPage.passwordField.fill(credentials.create.password)
            await authPage.registerButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.nameRow).toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.apiError).not.toBeVisible()
        })
        test('Register with correct credentials', async ({ page }) => {
            const authPage = new AuthPage(page)
            await authPage.emailField.fill(credentials.create.email())
            await authPage.nameField.fill('qwertin')
            await authPage.passwordField.fill(credentials.create.password)
            await authPage.registerButton.click()
            await expect(authPage.emailRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.passwordRow).not.toHaveClass(fieldErrorClass)
            await expect(authPage.apiError).not.toBeVisible()
            await expect(page).toHaveURL(routes.coursesPage)
        })
    })
})
