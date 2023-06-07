import type { Locator, Page } from '@playwright/test'

const PAGE_CONTENT_SELECTOR = '[data-test="pageContent"]'

export class ViewerLessonPage {
    readonly page: Page

    readonly content: Locator

    readonly paragraphs: Locator

    readonly errorText: Locator

    readonly radioExercise: Locator

    readonly inputExercise: Locator

    readonly checkboxExercise: Locator

    readonly nextPageButton: Locator

    readonly feedbackBlock: Locator

    readonly feedbackBlockText: Locator

    readonly feedbackBlockInput: Locator

    readonly feedbackBlockSave: Locator

    readonly feedbackBlockPass: Locator

    readonly feedbackBlockWrong: Locator

    readonly sendFeedback: Locator

    readonly resetTheAnswersButton: Locator

    readonly editableFeedback: Locator

    readonly completeLessonButton: Locator

    constructor(page:Page) {
        this.page = page

        this.content = page.locator(PAGE_CONTENT_SELECTOR)
        this.paragraphs = page.locator(`${PAGE_CONTENT_SELECTOR} p`)
        this.errorText = page.locator('[data-test="errorText"]')
        this.radioExercise = page.locator('[data-test="radioExercise"]')
        this.inputExercise = page.locator('[data-test="inputExercise"]')
        this.checkboxExercise = page.locator('[data-test="checkboxExercise"]')
        this.nextPageButton = page.locator('[data-test="nextPage"]')
        this.completeLessonButton = page.locator('[data-test="completeLesson"]')
        this.feedbackBlock = page.locator('[data-test="feedback"]')
        this.feedbackBlockText = page.locator('[data-test="feedbackText"]')

        this.feedbackBlockInput = page.locator('[data-test="feedbackBlockInput"]')
        this.feedbackBlockSave = page.locator('[data-test="feedbackBlockSave"]')
        this.feedbackBlockPass = page.locator('[data-test="feedbackBlockPass"]')
        this.feedbackBlockWrong = page.locator('[data-test="feedbackBlockWrong"]')
        this.sendFeedback = page.locator('[data-test="feedbackSend"]')
        this.resetTheAnswersButton = page.locator('[data-test="resetAnswers"]')
        this.editableFeedback = page.locator('[data-test="editableFeedback"]')
    }
}
