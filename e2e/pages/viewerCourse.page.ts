import type { Locator, Page, BrowserContext } from '@playwright/test'
import { authorize } from '../utils/login'
import routes from '../constants/routes'
import data from '../data.json'
import { CommonPage } from './common.page'

const { authTokens } = data

type TInviteUserToCourseDTO = {
    teacher: keyof typeof authTokens,
    student: keyof typeof authTokens,
    courseId: string,
    context: BrowserContext,
}

export class ViewerCoursePage extends CommonPage {
    readonly page: Page

    readonly inviteForm: Locator

    readonly becomeTeacherButton: Locator

    readonly inviteFormSubmit: Locator

    readonly inviteFormInput: Locator

    readonly removeCourseFromTeachingButton: Locator

    readonly removeCourseConfirmButton: Locator

    constructor(page:Page) {
        super(page)
        this.page = page
        this.inviteForm = page.locator('[data-test="inviteForm"]')
        this.becomeTeacherButton = page.locator('[data-test="becomeTeacherButton"]')
        this.inviteFormSubmit = page.locator('[data-test="inviteForm.submit"]')
        this.inviteFormInput = page.locator('[data-test="inviteForm.input"]')
        this.removeCourseFromTeachingButton = page.locator('[data-test="removeCourseButton"]')
        this.removeCourseConfirmButton = page.locator('.removeCourseConfirmButton')
    }

    async inviteUserToCourse({
        teacher, student, courseId, context
    }: TInviteUserToCourseDTO) {
        const courseViewerPage = routes.viewerCoursePage({ courseId })

        await authorize(context, student)
        await this.page.goto(routes.viewerStudents)
        const shareCode = await this.getShareCode()

        await authorize(context, teacher)
        await this.page.goto(courseViewerPage)
        await this.page.waitForLoadState('networkidle')
        const isUserTeacher = await this.inviteFormInput.count()
        if (!isUserTeacher) {
            await this.becomeTeacherButton.click()
        }
        await this.inviteFormInput.fill(shareCode)
        await this.inviteFormSubmit.click()

        await this.page.waitForLoadState('networkidle')
    }
}
