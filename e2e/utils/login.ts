import type { BrowserContext } from '@playwright/test'
import data from '../data.json'

const { BASE_URL } = process.env

if (!BASE_URL) {
    throw new Error('Environmental variable BASE_URL is not specified')
}

const { authTokens } = data

export function authorize(context: BrowserContext, user: keyof typeof authTokens = 'editor') {
    return context.addCookies([{ name: 'token', value: authTokens[user], url: BASE_URL }])
}

export function logout(context: BrowserContext) {
    return context.clearCookies()
}
