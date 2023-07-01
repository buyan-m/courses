import type { BrowserContext, Page } from '@playwright/test'
import { authorize } from './login'

const { BASE_URL } = process.env

export async function removeNotifications({
    userId,
    context,
    page
}: { userId: string, context: BrowserContext, page: Page }) {
    await authorize(context, 'admin')
    await page.goto('/')

    await page.evaluate(
        // @ts-ignore
        (url: string) => fetch(url, { method: 'delete' }),
        `${BASE_URL}api/admin/notifications/${userId}`
    )

    await page.waitForLoadState('networkidle')
}
