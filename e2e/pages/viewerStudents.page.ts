import type { Locator, Page } from '@playwright/test'

const STUDENT_LIST_SELECTOR = '[data-test="studentsList"]'

export class ViewerStudentsPage {
    readonly page: Page

    readonly studentList: Locator

    constructor(page: Page) {
        this.page = page
        this.studentList = page.locator(STUDENT_LIST_SELECTOR)
    }

    getStudentForCourse({ studentId, courseId }: { studentId: string, courseId: string }) {
        return this.page.locator(`${STUDENT_LIST_SELECTOR} [data-test="s${studentId}/c${courseId}"]`)
    }

    getStudentForCourseArchiveButton({ studentId, courseId }: { studentId: string, courseId: string }) {
        return this.page.locator(`${STUDENT_LIST_SELECTOR} [data-test="s${studentId}/c${courseId}.archive"]`)
    }
}
