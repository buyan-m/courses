import type { Locator, Page } from '@playwright/test'
import routes from '../constants/routes'
import data from '../data.json'

export class EditorCoursePage {
    readonly page: Page

    readonly heading: Locator

    readonly errorText: Locator

    readonly lessonCard: Locator

    readonly lessonCardName: (id?: string) => Locator

    readonly lessonPage: (id?: string) => Locator

    readonly lessonPageLink: (id?: string) => Locator

    goToTheTestCourse() {
        return this.page.goto(`${routes.editorCourses}/${data.testCourse.id}`)
    }

    constructor(page: Page) {
        this.page = page
        this.heading = page.locator('[data-test="heading"]')
        this.errorText = page.locator('[data-test="errorText"]')
        this.lessonCard = page.locator('[data-test="lessonCard"]')
        this.lessonCardName = (id) => {
            const selector = id
                ? `[data-test-id="lessonCard.${id}"] [data-test="lessonCard.name"]`
                : '[data-test="lessonCard"] [data-test="lessonCard.name"]'
            return page.locator(selector)
        }
        this.lessonPage = (id) => {
            const selector = id ? `[data-test-id="lessonPage.${id}"]` : '[data-test="lessonPage"]'
            return page.locator(selector)
        }
        this.lessonPageLink = (id) => {
            const selector = id ? `[data-test-id="lessonPage.${id}"] a` : '[data-test="lessonPage"] a'
            return page.locator(selector)
        }
    }
}
