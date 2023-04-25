import { expect, test } from '@playwright/test'
import routes from '../constants/routes'
import data from '../data.json'
import { EditorLessonPage } from '../pages/editorLesson.page'

const preparedPageLink = routes.editorLessonPage({
    courseId: data.testCourse.id,
    lessonId: data.testCourse.lessonId,
    pageId: data.testCourse.pageId
})

test.describe('Create page', () => {
    test.describe('Unauthorized', () => {
    })
    test.describe('Authorized', () => {
        test('User can\'t edit someone\'s else page', async ({ page }) => {
            const forbiddenPage = routes.editorLessonPage({
                courseId: data.otherCourse.id,
                lessonId: data.otherCourse.lessonId,
                pageId: data.otherCourse.pageId
            })
            const editorLessonPage = new EditorLessonPage(page)
            await page.goto(forbiddenPage)
            await expect(await editorLessonPage.heading.count()).toEqual(0)
            await expect(editorLessonPage.errorText).toContainText('Error: Forbidden')
        })

        test('User can edit their own page', async ({ page }) => {
            const editorLessonPage = new EditorLessonPage(page)
            await page.goto(preparedPageLink)
            await expect(editorLessonPage.heading).toBeVisible()
            await expect(await editorLessonPage.errorText.count()).toEqual(0)
        })

        test('Create new page', async () => {
            // check both editor and viewer pages
        })

        test('Title update', async () => {
            // check both editor and viewer pages
        })

        test('Text update', async () => {
            // check both editor and viewer pages
        })

        test('Test mode update', async () => {
            // check both editor and viewer pages
        })
    })
})
