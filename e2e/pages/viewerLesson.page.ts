import type { Locator, Page } from '@playwright/test'

const PAGE_CONTENT_SELECTOR = '[data-test="pageContent"]'

export class ViewerLessonPage {
    readonly page: Page

    readonly content: Locator

    readonly paragraphs: Locator

    constructor(page:Page) {
        this.page = page

        this.content = page.locator(PAGE_CONTENT_SELECTOR)
        this.paragraphs = page.locator(`${PAGE_CONTENT_SELECTOR} p`)
    }
}
