import { expect, test } from '@playwright/test'
import routes from '../../constants/routes'
import data from '../../data.json'
import { EditorLessonPage } from '../../pages/editorLesson.page'
import { authorize } from '../../utils/login'
import { ViewerLessonPage } from '../../pages/viewerLesson.page'

const DEFAULT_TEXT = 'Hello! Let me introduce our editor'
const FORMATTED_HTML_BOLD = 'Hello! <b>Let</b> me introduce our editor'
const FORMATTED_HTML_ITALIC = 'Hello! <i>Let</i> me introduce our editor'
const FORMATTED_HTML_LINK = 'Hello! Let me <a href="/kek">introduce</a> our editor'
const UPDATED_TEXT = 'This is a test'

const preparedEditorPageLink = routes.editorLessonPage({
    courseId: data.testCourse.id,
    lessonId: data.testCourse.lessonId,
    pageId: data.testCourse.pageId
})

const preparedViewerPageLink = routes.viewerLessonPage({
    courseId: data.testCourse.id,
    lessonId: data.testCourse.lessonId,
    pageId: data.testCourse.pageId
})

test.describe('Page content: Text', () => {
    test.beforeEach(async ({ page, context }) => {
        await authorize(context)
        await page.goto(preparedEditorPageLink)
        const editorLessonPage = new EditorLessonPage(page)
        await expect(editorLessonPage.editor).toBeVisible()
    })

    test('Simple text edit without saving', async ({ page }) => {
        const editorLessonPage = new EditorLessonPage(page)
        await editorLessonPage.editorParagraphs.nth(0).focus()
        await expect(await editorLessonPage.editorParagraphs.nth(0))
            .toContainText(DEFAULT_TEXT)
        await editorLessonPage.editorParagraphs.nth(0).fill(UPDATED_TEXT)
        await expect(await editorLessonPage.editorParagraphs.nth(0))
            .toContainText(UPDATED_TEXT)
        await page.reload()
        await expect(await editorLessonPage.editorParagraphs.nth(0))
            .toContainText(DEFAULT_TEXT)
    })

    test('Simple text edit with saving (button)', async ({ page }) => {
        const editorLessonPage = new EditorLessonPage(page)
        const viewerLessonPage = new ViewerLessonPage(page)

        await editorLessonPage.editorParagraphs.nth(0).focus()
        await expect.soft(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)
        await editorLessonPage.editorParagraphs.nth(0).fill(UPDATED_TEXT)
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(UPDATED_TEXT)
        await editorLessonPage.saveButton.click()

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(UPDATED_TEXT)

        await page.goto(preparedEditorPageLink)
        await expect(await editorLessonPage.editorParagraphs.nth(0))
            .toContainText(UPDATED_TEXT)
        await editorLessonPage.editorParagraphs.nth(0).focus()
        await editorLessonPage.editorParagraphs.nth(0).fill(DEFAULT_TEXT)
        await editorLessonPage.saveButton.click()
        await page.reload()
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)
    })

    test('Formatted text(Bold) edit with saving (button)', async ({ page }) => {
        const editorLessonPage = new EditorLessonPage(page)
        const viewerLessonPage = new ViewerLessonPage(page)

        await editorLessonPage.editorParagraphs.nth(0).focus()
        await editorLessonPage.selectTheWord(editorLessonPage.editorParagraphs.nth(0), 'Let')
        await expect(editorLessonPage.inlineToolbar).toBeVisible()
        await editorLessonPage.inlineToolbarBold.click()
        await editorLessonPage.saveButton.click()

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(FORMATTED_HTML_BOLD)

        await page.goto(preparedEditorPageLink)
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(FORMATTED_HTML_BOLD)
        await editorLessonPage.selectTheWord(editorLessonPage.editorParagraphs.nth(0), 'Let')
        await expect(editorLessonPage.inlineToolbar).toBeVisible()
        await editorLessonPage.inlineToolbarBold.click()
        await editorLessonPage.saveButton.click()
        await page.reload()
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)
    })

    test('Formatted text(Italic) edit with saving (button)', async ({ page }) => {
        const editorLessonPage = new EditorLessonPage(page)
        const viewerLessonPage = new ViewerLessonPage(page)

        await editorLessonPage.editorParagraphs.nth(0).focus()
        await editorLessonPage.selectTheWord(editorLessonPage.editorParagraphs.nth(0), 'Let')
        await expect(editorLessonPage.inlineToolbar).toBeVisible()
        await editorLessonPage.inlineToolbarItalic.click()
        await editorLessonPage.saveButton.click()

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(FORMATTED_HTML_ITALIC)

        await page.goto(preparedEditorPageLink)
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(FORMATTED_HTML_ITALIC)
        await editorLessonPage.selectTheWord(editorLessonPage.editorParagraphs.nth(0), 'Let')
        await expect(editorLessonPage.inlineToolbar).toBeVisible()
        await editorLessonPage.inlineToolbarItalic.click()
        await editorLessonPage.saveButton.click()
        await page.reload()
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)
    })

    test('Formatted text(Link) edit with saving (button)', async ({ page }) => {
        const editorLessonPage = new EditorLessonPage(page)
        const viewerLessonPage = new ViewerLessonPage(page)

        await editorLessonPage.editorParagraphs.nth(0).focus()
        await editorLessonPage.selectTheWord(editorLessonPage.editorParagraphs.nth(0), 'introduce')
        await expect(editorLessonPage.inlineToolbar).toBeVisible()
        await editorLessonPage.inlineToolbarLink.click()
        // the input should be focused
        await expect(editorLessonPage.inlineToolbarLinkInput).toBeFocused()
        await editorLessonPage.inlineToolbarLinkInput.type('/kek')
        // mobile?
        await editorLessonPage.inlineToolbarLinkInput.press('Enter')
        await editorLessonPage.saveButton.click()

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(FORMATTED_HTML_LINK)

        await page.goto(preparedEditorPageLink)
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(FORMATTED_HTML_LINK)
        await editorLessonPage.selectTheWord(editorLessonPage.editorParagraphs.nth(0), 'introduce')
        await expect(editorLessonPage.inlineToolbar).toBeVisible()
        await editorLessonPage.inlineToolbarLink.click()
        await editorLessonPage.saveButton.click()
        await page.reload()
        await expect(await editorLessonPage.editorParagraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)

        await page.goto(preparedViewerPageLink)
        await expect(await viewerLessonPage.paragraphs.nth(0).innerHTML())
            .toEqual(DEFAULT_TEXT)
    })
})
