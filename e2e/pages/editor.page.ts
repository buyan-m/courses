import type { Locator, Page } from '@playwright/test'

export class EditorPage {
    readonly page: Page

    readonly courses: Locator

    constructor(page: Page) {
        this.page = page
        this.courses = page.locator('[data-test="courseCard"]')
    }
}
