import { expect, test } from '@playwright/test'
import { EditorPage } from '../pages/editor.page'
import routes from '../constants/routes'
import data from '../data.json'
import { EditorCoursePage } from '../pages/editorCourse.page'
import { authorize, logout } from '../utils/login'

const preparedPageLink = routes.editorLessonPage({
    courseId: data.testCourse.id,
    lessonId: data.testCourse.lessonId,
    pageId: data.testCourse.pageId
})

test.describe('Create course', () => {
    test.describe('Unauthorized', () => {
        test('Editor home is unavailable for unauthorized users', async ({ page, context }) => {
            await logout(context)
            await page.goto(routes.editorPage)
            await expect(page).toHaveURL(routes.authPageWithRedirect)
        })
    })

    test.describe('Authorized', () => {
        test.beforeEach(async ({ context }) => {
            await authorize(context)
        })
        test('Editor home is available for authorized users', async ({ page }) => {
            await page.goto(routes.editorPage)
            await expect(page).toHaveURL(routes.editorPage)
        })
        test('Courses page shows user\'s courses with actual links', async ({ page }) => {
            const editorPage = new EditorPage(page)
            await page.goto(routes.editorPage)
            await expect(editorPage.courses).toHaveCount(1)
            await expect(editorPage.courses.nth(0))
                .toHaveAttribute('href', `${routes.editorCourses}/${data.testCourse.id}`)
        })
        test('Users don\'t see course creating if they don\'t have the permission', async () => {
            // user without role
        })

        test('User can\'t edit someone\'s else course', async ({ page }) => {
            const coursePage = new EditorCoursePage(page)
            await page.goto(`${routes.editorCourses}/${data.otherCourse.id}`)
            await expect(await coursePage.heading.count()).toEqual(0)
            await expect(coursePage.errorText).toContainText('Error: Forbidden')
        })

        test('User sees their own course in edit mode', async ({ page }) => {
            const coursePage = new EditorCoursePage(page)
            await coursePage.goToTheTestCourse()
            await expect(coursePage.heading).toBeVisible
            await expect(coursePage.heading).toContainText('Autotest course')
            await expect(await coursePage.errorText.count()).toEqual(0)
        })

        test('Course page shows actual lessons', async ({ page }) => {
            const coursePage = new EditorCoursePage(page)
            await coursePage.goToTheTestCourse()
            await expect(await coursePage.lessonCard.count()).toEqual(4) // one actual and the other for a new
            await expect(coursePage.lessonCardName(data.testCourse.lessonId)).toHaveValue('lesson 1')
        })

        test('User can edit their own lesson', async ({ page }) => {
            const coursePage = new EditorCoursePage(page)
            await coursePage.goToTheTestCourse()
            await coursePage.lessonCardName(data.testCourse.lessonId).clear()
            await coursePage.lessonCardName(data.testCourse.lessonId).fill('autotest lesson name')
            await coursePage.lessonCardName(data.testCourse.lessonId).blur()
            // src/Editor/components/CourseLessons/CourseLessons.vue:94 uses 700ms timeout for a debouncing
            await page.waitForTimeout(1000)
            await page.waitForLoadState('networkidle')
            await page.reload()
            await expect(coursePage.lessonCardName(data.testCourse.lessonId)).toHaveValue('autotest lesson name')
            await coursePage.lessonCardName(data.testCourse.lessonId).clear()
            await coursePage.lessonCardName(data.testCourse.lessonId).fill('lesson 1')
            await coursePage.lessonCardName(data.testCourse.lessonId).blur()
            // src/Editor/components/CourseLessons/CourseLessons.vue:94 uses 700ms timeout for a debouncing
            await page.waitForTimeout(1000)
            await page.waitForLoadState('networkidle')
            await page.reload()
            await expect(coursePage.lessonCardName(data.testCourse.lessonId)).toHaveValue('lesson 1')
        })

        test('Lesson card shows pages with actual links', async ({ page }) => {
            const coursePage = new EditorCoursePage(page)
            await coursePage.goToTheTestCourse()
            await expect(await coursePage.lessonPage().count()).toEqual(5)
            await expect(coursePage.lessonPage(data.testCourse.pageId)).toBeVisible()
            await expect(coursePage.lessonPageLink(data.testCourse.pageId))
                .toHaveAttribute('href', new RegExp(preparedPageLink))
        })
    })
})
