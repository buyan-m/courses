import { createRouter, createWebHistory } from 'vue-router'
import type { RouterOptions } from 'vue-router'
import basicRoutes from '@/Basic/router'
import editorRoutes from '@/Editor/router'
import viewerRoutes from '@/Viewer/router'
import adminRoutes from '@/Admin/router'

const router = createRouter({
    // @ts-ignore
    history: createWebHistory('/'),
    routes: [
        basicRoutes,
        editorRoutes,
        viewerRoutes,
        adminRoutes
    ]
} as RouterOptions)

export default router
