import { createRouter, createWebHistory } from 'vue-router'
import type { RouterOptions } from 'vue-router'
import editorRoutes from '@/Editor/router'
import viewerRoutes from '@/Viewer/router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => {}
        },
        editorRoutes,
        viewerRoutes
    ]
} as RouterOptions)

export default router
