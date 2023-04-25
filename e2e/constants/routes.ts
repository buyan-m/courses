export default {
    homePage: '/',
    coursesPage: '/viewer',
    editorPage: '/editor',
    editorCourses: '/editor/courses',
    editorLessonPage: ({ courseId, lessonId, pageId }: { courseId: string, lessonId: string, pageId: string }) => `/editor/courses/${courseId}/lessons/${lessonId}/page/${pageId}`,
    authPage: '/auth',
    authPageWithRedirect: /\/auth\?redirect=\/.+/
}
