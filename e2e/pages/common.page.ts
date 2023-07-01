import type { Locator, Page } from '@playwright/test'

export class CommonPage {
    readonly page: Page

    readonly submenuItem: Locator

    readonly shareCodeOpener: Locator

    readonly shareCodePopup: Locator

    readonly shareCodeField: Locator

    readonly notificationsBlock: Locator

    readonly notificationsOpener: Locator

    readonly notificationTimes: Locator

    readonly notifications: Locator

    constructor(page: Page) {
        this.page = page
        this.submenuItem = page.locator('[data-test="subMenuOpener"]')
        this.shareCodeOpener = page.locator('[data-test="shareMenuOpener"]')
        this.shareCodePopup = page.locator('[data-test="shareMenuPopup"]')
        this.shareCodeField = page.locator('[data-test="shareMenuField"]')
        this.notificationsBlock = page.locator('[data-test="notificationsBlock"]')
        this.notificationsOpener = page.locator('[data-test="notificationsOpener"]')
        this.notifications = page.locator('[data-test="notification"]')
        this.notificationTimes = page.locator('[data-test="notification"] time')
    }

    async getShareCode(): Promise<string> {
        await this.submenuItem.hover()
        await this.shareCodeOpener.click()
        await this.shareCodeField.click()
        return this.page.evaluate('navigator.clipboard.readText()')
    }
}
