import request from '@/utils/request'
import type { RouteLocationNormalized } from 'vue-router'

export function authGuard(to: RouteLocationNormalized) {
    return request('/api/auth-check').then(({ errors }) => {
        if (errors.length) {
            return { name: 'auth', query: { redirect: to.path } }
        }
        return undefined
    })
}
