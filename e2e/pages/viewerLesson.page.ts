import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

const PAGE_CONTENT_SELECTOR = '[data-test="pageContent"]'

const feedbacks = [
    { text: 'well done', mark: 'pass' },
    { text: 'good', mark: 'pass' },
    { text: 'There is some error in your solution', mark: 'wrong' },
    { text: '', mark: 'pass' }
]

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

    async fillTheExercises() {
        await this.radioExercise
            .nth(0)
            .locator('label')
            .nth(0)
            .click()

        // expect(this.radioExercise
        await this.radioExercise
            .nth(1)
            .locator('label')
            .nth(1)
            .click()

        await this.checkboxExercise
            .locator('label')
            .nth(1)
            .click()

        await this.checkboxExercise
            .locator('label')
            .nth(2)
            .click()

        await this.inputExercise
            .locator('input')
            .fill('qwer')

        await this.inputExercise
            .locator('input')
            .press('Enter')

        await this.inputExercise
            .locator('input')
            .fill('Answer')

        await this.inputExercise
            .locator('input')
            .press('Enter')

        await this.completeLessonButton.click()

        await this.page.waitForLoadState('networkidle')
    }

    async fillFeedback() {
        const count = await this.editableFeedback.count() // it is definitely the same as two lines upper

        expect(feedbacks.length).toEqual(count)
        for (let i = 0; i < count; i += 1) {
            // It is necessary
            // eslint-disable-next-line no-await-in-loop
            await this.feedbackBlockInput.nth(i).fill(feedbacks[i].text)
            if (feedbacks[i].mark === 'pass') {
                // eslint-disable-next-line no-await-in-loop
                await this.feedbackBlockPass.nth(i).click()
            } else if (feedbacks[i].mark === 'wrong') {
                // eslint-disable-next-line no-await-in-loop
                await this.feedbackBlockWrong.nth(i).click()
            }
            // eslint-disable-next-line no-await-in-loop
            await this.feedbackBlockSave.nth(i).click()
        }

        await this.sendFeedback.click()
        await this.page.waitForTimeout(200)
        await this.page.waitForLoadState('networkidle')
    }
}
