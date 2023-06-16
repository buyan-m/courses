import type { Locator, Page } from '@playwright/test'

export class CommonPage {
    readonly page: Page

    readonly submenuItem: Locator

    readonly shareCodeOpener: Locator

    readonly shareCodePopup: Locator

    readonly shareCodeField: Locator

    constructor(page: Page) {
        this.page = page
        this.submenuItem = page.locator('.el-sub-menu__hide-arrow')
        this.shareCodeOpener = page.locator('[data-test="shareMenuOpener"]')
        this.shareCodePopup = page.locator('[data-test="shareMenuPopup"]')
        this.shareCodeField = page.locator('[data-test="shareMenuField"]')
    }

    async getShareCode(): Promise<string> {
        await this.submenuItem.hover()
        await this.shareCodeOpener.click()
        await this.shareCodeField.click()
        return this.page.evaluate('navigator.clipboard.readText()')
    }
}
