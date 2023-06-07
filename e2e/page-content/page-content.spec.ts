import { test } from '@playwright/test'
import { EditorLessonPage } from '../pages/editorLesson.page'

const availableBlockTypes = ['', '.', '...']

test.describe.skip('Page content', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(preparedPageLink)
    })
    availableBlockTypes.forEach((type) => {
        test(`type '${type}' is available`, async () => {})
    })

    test('there are no other types', async () => {
        //
    })
})
