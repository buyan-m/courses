import type { Locator, Page } from '@playwright/test'

const INLINE_TOOLBAR_SELECTOR = '.ce-inline-toolbar'

export class EditorLessonPage {
    readonly page: Page

    readonly heading: Locator

    readonly errorText: Locator

    readonly editor: Locator

    readonly editorParagraphs: Locator

    readonly saveButton: Locator

    readonly inlineToolbar: Locator

    readonly inlineToolbarBold: Locator

    readonly inlineToolbarItalic: Locator

    readonly inlineToolbarLink: Locator

    readonly inlineToolbarLinkInput: Locator

    constructor(page: Page) {
        this.page = page
        this.heading = page.locator('[data-test="heading"]')
        this.errorText = page.locator('[data-test="errorText"]')
        this.editor = page.locator('[data-test="editor"]')
        this.editorParagraphs = page.locator('[data-test="editor"] .ce-paragraph')
        this.saveButton = page.locator('[data-test="editor-save"]')
        this.inlineToolbar = page.locator(INLINE_TOOLBAR_SELECTOR)
        this.inlineToolbarBold = page.locator(`${INLINE_TOOLBAR_SELECTOR} button[data-tool="bold"]`)
        this.inlineToolbarItalic = page.locator(`${INLINE_TOOLBAR_SELECTOR} button[data-tool="italic"]`)
        this.inlineToolbarLink = page.locator(`${INLINE_TOOLBAR_SELECTOR} button[data-tool="link"]`)
        this.inlineToolbarLinkInput = page.locator(`${INLINE_TOOLBAR_SELECTOR} .ce-inline-tool-input`)
    }

    async selectTheWord(paragraph: Locator, word: string) {
        await paragraph.focus()
        await paragraph.press('Home')
        const text = await paragraph.innerText()
        let textIndex = 0
        let wordIndex = 0
        while (wordIndex < word.length && textIndex < text.length) {
            if (text[textIndex] === word[wordIndex]) {
                // так правильно, мы не можем дожидаться всех вместе
                // eslint-disable-next-line no-await-in-loop
                await paragraph.press('Shift+ArrowRight')
                textIndex += 1
                wordIndex += 1
            } else {
                // eslint-disable-next-line no-await-in-loop
                await paragraph.press('ArrowRight')
                textIndex += 1
                wordIndex = 0
            }
        }
    }
}
