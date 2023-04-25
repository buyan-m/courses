import type { Locator, Page } from '@playwright/test'

export class EditorLessonPage {
    readonly page: Page

    readonly heading: Locator

    readonly errorText: Locator

    constructor(page: Page) {
        this.page = page
        this.heading = page.locator('[data-test="heading"]')
        this.errorText = page.locator('[data-test="errorText"]')
    }
}
