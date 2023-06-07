type TLessonPageParams = {
    courseId: string,
    lessonId: string,
    pageId: string
}
type TStudentLessonPageParams = TLessonPageParams & { studentId: string }

export default {
    homePage: '/',
    coursesPage: '/viewer',
    editorPage: '/editor',
    editorCourses: '/editor/courses',
    editorLessonPage: (
        {
            courseId,
            lessonId,
            pageId
        }: TLessonPageParams
    ) => `/editor/courses/${courseId}/lessons/${lessonId}/page/${pageId}`,
    viewerLessonPage: (
        {
            courseId,
            lessonId,
            pageId
        }: TLessonPageParams
    ) => `/viewer/course/${courseId}/lesson/${lessonId}/page/${pageId}`,
    viewerLessonStudentPage: (
        {
            courseId,
            lessonId,
            pageId,
            studentId
        }: TStudentLessonPageParams
    ) => `/viewer/course/${courseId}/lesson/${lessonId}/page/${pageId}/${studentId}`,
    viewerCoursePage: ({ courseId }: { courseId: string }) => `/viewer/course/${courseId}`,
    viewerStudents: '/viewer/students',
    authPage: '/auth',
    authPageWithRedirect: /\/auth\?redirect=\/.+/
}
