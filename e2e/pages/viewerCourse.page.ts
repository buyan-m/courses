import type { Locator, Page } from '@playwright/test'

export class ViewerCoursePage {
    readonly page: Page

    readonly inviteForm: Locator

    readonly becomeTeacherButton: Locator

    readonly inviteFormSubmit: Locator

    readonly inviteFormInput: Locator

    constructor(page:Page) {
        this.page = page
        this.inviteForm = page.locator('[data-test="inviteForm"]')
        this.becomeTeacherButton = page.locator('[data-test="becomeTeacherButton"]')
        this.inviteFormSubmit = page.locator('[data-test="inviteForm.submit"]')
        this.inviteFormInput = page.locator('[data-test="inviteForm.input"]')
    }
}
