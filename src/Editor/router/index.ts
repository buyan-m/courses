import { authGuard } from '@/guards'

export default {
    path: '/editor',
    name: 'course-editor',
    component: () => import('@/Editor/views/EditorLayout.vue'),
    beforeEnter: authGuard,
    children: [
        {
            path: '',
            name: 'editor-home',
            component: () => import('@/Editor/views/EditorHome.vue')
        },
        {
            path: 'courses',
            children: [
                {
                    path: 'create',
                    name: 'editor-course-create',
                    component: () => import('@/Editor/views/Courses/CourseUpdate.vue')
                },
                {
                    path: ':courseId',
                    children: [
                        {
                            path: '',
                            name: 'editor-course-update',
                            component: () => import('@/Editor/views/Courses/CourseUpdate.vue')
                        },
                        {
                            path: 'lessons',
                            name: 'editor-lessons-update',
                            children: [
                                {
                                    path: 'create-lesson',
                                    name: 'editor-lessons-new',
                                    component: () => import('@/Editor/views/Courses/Lessons/LessonUpdate.vue')
                                },
                                {
                                    path: ':lessonId',
                                    children: [
                                        {
                                            path: '',
                                            name: 'editor-lesson-update',
                                            component: () => import('@/Editor/views/Courses/Lessons/LessonUpdate.vue')
                                        },
                                        {
                                            path: 'create-page',
                                            name: 'editor-lesson-new-page',
                                            component: () => import('@/Editor/views/Courses/Lessons/PageEditor.vue')
                                        },
                                        {
                                            path: 'page/:pageId',
                                            name: 'editor-lesson-update-page',
                                            component: () => import('@/Editor/views/Courses/Lessons/PageEditor.vue')
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
