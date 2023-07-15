import { authGuard } from '@/guards'

export default {
    path: '/viewer',
    component: () => import('@/Viewer/views/ViewerLayout.vue'),
    beforeEnter: authGuard,
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
                    path: 'students',
                    children: [
                        {
                            path: '',
                            component: () => import('@/Viewer/views/Course/Students/CourseStudents.vue'),
                            name: 'viewer-course-students'
                        },
                        {
                            path: ':studentId',
                            component: () => import('@/Viewer/views/Course/Students/CourseStudent.vue'),
                            name: 'viewer-course-student'
                        }
                    ]
                },
                {
                    path: 'lesson/:lessonId',
                    children: [
                        {
                            path: 'page/:pageId',
                            name: 'viewer-lesson-page',
                            component: () => import('@/Viewer/views/Course/Lesson/LessonPage.vue')
                        },
                        {
                            path: 'page/:pageId/:studentId',
                            name: 'viewer-lesson-teacher-page',
                            component: () => import('@/Viewer/views/Course/Lesson/LessonPage.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: 'students',
            name: 'teacher-students',
            component: () => import('@/Viewer/views/TeacherStudents.vue')
        }
    ]
}
