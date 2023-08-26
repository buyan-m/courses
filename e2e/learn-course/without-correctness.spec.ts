import { expect, test } from '@playwright/test'
import { authorize } from '../utils/login'
import routes from '../constants/routes'
import data from '../data.json'
import { ViewerCoursePage } from '../pages/viewerCourse.page'
import { ViewerStudentsPage } from '../pages/viewerStudents.page'
import { ViewerLessonPage } from '../pages/viewerLesson.page'
import { CommonPage } from '../pages/common.page'

const studentWithCourse = {
    studentId: data.studentId,
    courseId: data.courseWithoutCorrectnessVisibility.id
}

const studentLessonPage = {
    ...studentWithCourse,
    lessonId: data.courseWithoutCorrectnessVisibility.lessonId,
    pageId: data.courseWithoutCorrectnessVisibility.pageId
}

const courseViewerPage = routes.viewerCoursePage({ courseId: data.testCourse.id })

const EXERCISES_ON_PAGE_COUNT = 4

test.describe('A page without correctness visibility', () => {
    test.describe('Basics', () => {
        test('View own course (editor)', async ({ page, context }) => {
            const coursePage = new ViewerCoursePage(page)
            await authorize(context, 'editor')
            await page.goto(courseViewerPage)

            await expect(coursePage.inviteForm).toBeVisible()
        })

        test('View new course (teacher)', async ({ page, context }) => {
            const coursePage = new ViewerCoursePage(page)
            await authorize(context, 'teacher')
            await page.goto(courseViewerPage)

            await expect(await coursePage.inviteForm.count()).toEqual(0)
        })

        test('The teacher adds a course', async ({ page, context }) => {
            const coursePage = new ViewerCoursePage(page)
            const lessonPage = new ViewerLessonPage(page)
            await authorize(context, 'teacher')
            await page.goto(courseViewerPage)
            await coursePage.becomeTeacherButton.click()

            await expect(coursePage.inviteForm).toBeVisible()
            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))
            await expect(lessonPage.errorText).toBeVisible()
        })

        test('The teacher adds a student to a course', async ({ page, context }) => {
            const coursePage = new ViewerCoursePage(page)
            const studentsPage = new ViewerStudentsPage(page)
            const lessonPage = new ViewerLessonPage(page)
            const commonPage = new CommonPage(page)

            await authorize(context, 'student')

            await page.goto(routes.viewerStudents)

            const shareCode = await commonPage.getShareCode()

            await expect(commonPage.shareCodeField).toHaveText(shareCode)

            await authorize(context, 'teacher')

            await page.goto(routes.viewerStudents)
            await expect.soft(
                await studentsPage.getStudentForCourse(studentWithCourse).count()
            ).toEqual(0)

            await page.goto(courseViewerPage)
            await coursePage.inviteFormInput.fill(shareCode)
            await coursePage.inviteFormSubmit.click()

            await page.waitForLoadState('networkidle')
            await page.goto(routes.viewerStudents)
            await expect(studentsPage.getStudentForCourse(studentWithCourse)).toBeVisible()

            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))
            await expect(lessonPage.errorText).toContainText('Not Found')
        })
    })

    test.describe('Exercises', () => {
        test('The student passes exercises', async ({ page, context }) => {
            await authorize(context, 'student')
            const exercisesPage = new ViewerLessonPage(page)
            await page.goto(routes.viewerLessonPage(studentLessonPage))
            await expect(await exercisesPage.feedbackBlock.count()).toEqual(0)
            await expect.soft(exercisesPage.completeLessonButton).toBeDisabled()

            await exercisesPage.fillTheExercisesWithoutAnswers()

            await page.reload()

            await expect(await exercisesPage.feedbackBlockText.count()).toEqual(0)
        })

        test('The teacher sees student\'s results and sends feedback', async ({ context, page }) => {
            await authorize(context, 'teacher')
            const exercisesPage = new ViewerLessonPage(page)
            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))

            await expect(await exercisesPage.errorText.count()).toEqual(0)
            await expect(await exercisesPage.editableFeedback.count()).toEqual(EXERCISES_ON_PAGE_COUNT)
            await expect(exercisesPage.content).toHaveScreenshot()

            await exercisesPage.fillFeedback()

            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))
            await page.reload()
            await expect(exercisesPage.content).toHaveScreenshot()
        })

        test('The student sees their answers and feedback', async ({ context, page }) => {
            await authorize(context, 'student')
            const exercisesPage = new ViewerLessonPage(page)
            await page.goto(routes.viewerLessonPage(studentLessonPage))
            await expect(exercisesPage.content).toHaveScreenshot()
        })

        test('The editor can\'t see the student\'s answers', async ({ context, page }) => {
            await authorize(context, 'editor')
            const exercisesPage = new ViewerLessonPage(page)
            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))
            await expect(exercisesPage.errorText).toHaveText('Error: Error: Forbidden')
        })

        test('The editor can invite student', async ({ context, page }) => {
            await authorize(context, 'editor')
            const studentsPage = new ViewerStudentsPage(page)

            await page.goto(routes.viewerStudents)
            await expect.soft(
                await studentsPage.getStudentForCourse(studentWithCourse).count()
            ).toEqual(0)

            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))
        })

        test('The editor sees the student\'s answers after inviting them', async ({ context, page }) => {
            const studentsPage = new ViewerStudentsPage(page)
            const coursePage = new ViewerCoursePage(page)
            const exercisesPage = new ViewerLessonPage(page)
            const commonPage = new CommonPage(page)

            await authorize(context, 'student')
            await page.goto(routes.viewerStudents)
            const shareCode = await commonPage.getShareCode()

            await authorize(context, 'editor')
            await page.goto(courseViewerPage)
            await coursePage.inviteFormInput.fill(shareCode)
            await coursePage.inviteFormSubmit.click()

            await page.waitForLoadState('networkidle')
            await page.goto(routes.viewerStudents)
            await expect(studentsPage.getStudentForCourse(studentWithCourse)).toBeVisible()

            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))
            await expect(exercisesPage.content).toHaveScreenshot()
        })
    })

    test.describe('End process', () => {
        test('The teacher can reset answers for a student', async ({ page, context }) => {
            const exercisesPage = new ViewerLessonPage(page)
            await authorize(context, 'teacher')

            await page.goto(routes.viewerLessonStudentPage(studentLessonPage))

            await exercisesPage.resetTheAnswersButton.click()
            await page.waitForLoadState('networkidle')
            await page.reload()

            await expect(await exercisesPage.errorText).toHaveText('Error: Error: Not Found')
        })

        test('The teacher remove a student from a course', async ({ page, context }) => {
            const studentsPage = new ViewerStudentsPage(page)
            await authorize(context, 'teacher')

            await page.goto(routes.viewerStudents)
            await expect.soft(await studentsPage.getStudentForCourse(studentWithCourse)).toBeVisible()

            await studentsPage.getStudentForCourseArchiveButton(studentWithCourse).click()

            await page.waitForLoadState('networkidle')
            await page.goto(routes.viewerStudents)
            await expect(await studentsPage.getStudentForCourse(studentWithCourse).count()).toEqual(0)
        })

        test('The editor remove a student from a course', async ({ page, context }) => {
            const studentsPage = new ViewerStudentsPage(page)
            await authorize(context, 'editor')

            await page.goto(routes.viewerStudents)
            await expect.soft(await studentsPage.getStudentForCourse(studentWithCourse)).toBeVisible()

            await studentsPage.getStudentForCourseArchiveButton(studentWithCourse).click()

            await page.waitForLoadState('networkidle')
            await page.goto(routes.viewerStudents)
            await expect(await studentsPage.getStudentForCourse(studentWithCourse).count()).toEqual(0)
        })

        test('The teacher remove a course', async ({ page, context }) => {
            const coursePage = new ViewerCoursePage(page)
            await authorize(context, 'teacher')
            await page.goto(courseViewerPage)

            await coursePage.removeCourseFromTeachingButton.click()
            await coursePage.removeCourseConfirmButton.click()
            await page.waitForLoadState('networkidle')
            await expect(await coursePage.inviteForm.count()).toEqual(0)
        })
    })
})
