export default {
    path: '/',
    children: [
        {
            path: '',
            name: 'main',
            component: () => import('@/Basic/views/HomeView.vue')
        },
        {
            path: 'auth',
            name: 'auth',
            component: () => import('@/Basic/views/AuthView.vue')
        },
        {
            path: 'confirm-email',
            name: 'confirm-email',
            component: () => import('@/Basic/views/ConfirmEmail.vue')
        }
    ]
}
