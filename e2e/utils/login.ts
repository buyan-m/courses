import type { BrowserContext } from '@playwright/test'
import data from '../data.json'

export function authorize(context: BrowserContext) {
    return context.addCookies([{ name: 'token', value: data.authToken, url: data.projectDomain }])
}

export function logout(context: BrowserContext) {
    return context.clearCookies()
}
