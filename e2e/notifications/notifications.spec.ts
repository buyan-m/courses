import { expect, test } from '@playwright/test'
import { removeNotifications } from '../utils/admin'
import data from '../data.json'
import routes from '../constants/routes'
import { authorize } from '../utils/login'
import { CommonPage } from '../pages/common.page'
import { ViewerCoursePage } from '../pages/viewerCourse.page'
import { ViewerLessonPage } from '../pages/viewerLesson.page'

const studentWithCourse = {
    studentId: data.studentId,
    courseId: data.testCourse.id
}

const studentLessonPage = {
    ...studentWithCourse,
    lessonId: data.testCourse.lessonId,
    pageId: data.testCourse.pageId
}

const studentLessonTestPage = {
    ...studentLessonPage,
    pageId: data.testCourse.exercisesPageId
}

const courseViewerPage = routes.viewerCoursePage({ courseId: data.testCourse.id })

test.describe('Notifications', () => {
    test('Clear notifications', async ({ context, page }) => {
        const commonPage = new CommonPage(page)
        await removeNotifications({ context, page, userId: data.studentId })
        await removeNotifications({ context, page, userId: data.teacherId })
        await authorize(context, 'student')
        await page.goto(routes.coursesPage)
        await commonPage.notificationsOpener.hover()
        await expect(await commonPage.notifications.count()).toEqual(0)
        await expect(commonPage.notificationsBlock).toHaveScreenshot({ mask: [commonPage.notificationTimes] })
    })

    test('Course invitation', async ({ context, page }) => {
        const viewerCoursePage = new ViewerCoursePage(page)
        const commonPage = new CommonPage(page)
        await viewerCoursePage.inviteUserToCourse({
            teacher: 'teacher',
            student: 'student',
            courseId: data.testCourse.id,
            context
        })
        await authorize(context, 'student')
        await page.goto(routes.coursesPage)
        await commonPage.notificationsOpener.hover()
        await expect(await commonPage.notifications.count()).toEqual(1)
        await expect(commonPage.notificationsBlock).toHaveScreenshot({ mask: [commonPage.notificationTimes] })
    })

    test('Page pass', async ({ context, page }) => {
        const commonPage = new CommonPage(page)
        const exercisesPage = new ViewerLessonPage(page)
        await authorize(context, 'student')
        await page.goto(routes.viewerLessonPage(studentLessonPage))
        await exercisesPage.nextPageButton.click()
        await exercisesPage.fillTheExercises()

        await authorize(context, 'teacher')
        await page.goto(routes.viewerLessonPage(studentLessonPage))
        await commonPage.notificationsOpener.hover()
        await expect(await commonPage.notifications.count()).toEqual(1)
        await expect(commonPage.notificationsBlock).toHaveScreenshot({ mask: [commonPage.notificationTimes] })
    })

    test('Feedback received', async ({ context, page }) => {
        const commonPage = new CommonPage(page)
        const exercisesPage = new ViewerLessonPage(page)
        await authorize(context, 'teacher')
        await page.goto(routes.viewerLessonStudentPage(studentLessonTestPage))
        await exercisesPage.fillFeedback()

        await authorize(context, 'student')
        await page.goto(routes.viewerLessonPage(studentLessonPage))
        await commonPage.notificationsOpener.hover()
        await expect(await commonPage.notifications.count()).toEqual(2)
        await expect(commonPage.notificationsBlock).toHaveScreenshot({ mask: [commonPage.notificationTimes] })
    })

    test('End', async ({ context, page }) => {
        await removeNotifications({ context, page, userId: data.studentId })
        await removeNotifications({ context, page, userId: data.teacherId })
        const exercisesPage = new ViewerLessonPage(page)
        const coursePage = new ViewerCoursePage(page)
        await authorize(context, 'teacher')

        await page.goto(routes.viewerLessonStudentPage(studentLessonTestPage))

        await exercisesPage.resetTheAnswersButton.click()
        await page.goto(courseViewerPage)

        await coursePage.removeCourseFromTeachingButton.click()
        await coursePage.removeCourseConfirmButton.click()
        await page.waitForLoadState('networkidle')
        await expect(await coursePage.inviteForm.count()).toEqual(0)
    })
})
