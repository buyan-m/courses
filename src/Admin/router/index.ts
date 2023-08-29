import { authGuard } from '@/guards'

export default {
    path: '/admin',
    component: () => import('@/Admin/views/AdminLayout.vue'),
    beforeEnter: authGuard,
    children: [
        {
            path: 'issues',
            name: 'issues',
            component: () => import('@/Admin/views/IssuesView.vue')
        }
    ]
}
