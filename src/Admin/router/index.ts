export default {
    path: '/admin',
    component: () => import('@/Admin/views/AdminLayout.vue'),
    children: [
        {
            path: 'issues',
            name: 'issues',
            component: () => import('@/Admin/views/IssuesView.vue')
        }
    ]
}
