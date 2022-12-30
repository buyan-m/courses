export default {
    path: '/viewer',
    component: () => import('@/Viewer/views/ViewerLayout.vue'),
    children: [
        {
            path: '',
            name: 'viewer-home',
            component: () => import('@/Viewer/views/ViewerHome.vue')
        },
        {
            path: 'course/:courseId',
            children: [
                {
                    path: '',
                    name: 'viewer-course',
                    component: () => import('@/Viewer/views/Course/CourseMain.vue')
                },
                {
                    path: 'lesson/:lessonId',
                    children: [
                        {
                            path: '',
                            name: 'viewer-lesson',
                            component: () => import('@/Viewer/views/Course/Lesson/LessonMain.vue')
                        },
                        {
                            path: 'page/:pageId',
                            name: 'viewer-lesson-page',
                            component: () => import('@/Viewer/views/Course/Lesson/LessonPage.vue')
                        }
                    ]
                }
            ]
        }
    ]
}
