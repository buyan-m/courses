import { defineStore } from 'pinia'
import type {
    CourseCreateResponse,
    EditorCourseResponse,
    TCourseId,
    LessonResponse,
    TLessonId,
    EditorLessonCreateResponse,
    Lesson,
    LessonUpdateDTO
} from '@/types/api-types'
import { CourseStatus } from '@/constants/CourseStatus'
import request from '@/utils/request'

function getEmptyLesson(): LessonResponse {
    return {
        _id: '',
        name: '',
        courseId: '',
        pages: []
    }
}

export const useCourseUpdateStore = defineStore('courseUpdate', {
    state: () => ({
        courseUpdatePromise: new Promise(() => {}) as Promise<TCourseId>,
        savingLessons: {} as Record<string, Promise<void | undefined> | undefined>,
        courseId: '',
        courseStatus: CourseStatus.new,
        courseUpdatedName: 'Course\'s title',
        courseUpdatedDescription: 'Course\'s description',
        course: {
            name: 'Course\'s title',
            description: 'Course\'s description',
            lessons: [getEmptyLesson()]
        } as EditorCourseResponse
    }),

    actions: {
        getCourse(courseId?: TCourseId) {
            if (courseId) {
                this.courseId = courseId

                return request<EditorCourseResponse>(`/api/editor/courses/${this.courseId}`)
                    .then(({ data, errors }) => {
                        if (data) {
                            this.course = data
                            this.course.lessons.push(getEmptyLesson())
                            this.courseUpdatedName = data.name
                            this.courseUpdatedDescription = data.description
                            this.courseStatus = CourseStatus.created
                            return Promise.resolve()
                        }
                        if (errors.length) {
                            return Promise.reject(errors[0])
                        }
                        return Promise.reject()
                    })
            }
            return Promise.resolve()
        },

        courseHeadingUpdate(heading: string) {
            this.courseUpdatedName = heading
        },

        courseDescriptionUpdate(description: string) {
            this.courseUpdatedDescription = description
        },

        async saveLesson(lesson: LessonUpdateDTO): Promise<void | undefined> {
            if (this.courseStatus === CourseStatus.new || this.courseStatus === CourseStatus.requesting) {
                return this.saveCourse().then(() => this.saveLesson(lesson))
            }

            const lessonId = lesson._id || 'create'

            if (this.savingLessons[lessonId]) {
                await this.savingLessons[lessonId]
            }

            const lessonDTO = {
                name: lesson.name,
                courseId: this.courseId
            } as Lesson & { _id?: TLessonId }

            if (lesson._id) {
                lessonDTO._id = lesson._id
            }

            this.savingLessons[lessonId] = request<EditorLessonCreateResponse>(
                `/api/editor/lessons/${lessonId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(lessonDTO)
                }
            ).then(({ data }) => {
                this.savingLessons[lessonId] = undefined

                if (data && lesson._id === '') {
                    const index = this.course.lessons.findIndex(({ _id }) => _id === lesson._id)
                    this.course.lessons[index] = {
                        ...lessonDTO,
                        _id: data.lessonId as TLessonId,
                        pages: []
                    }
                    this.course.lessons.push(getEmptyLesson())
                }
            })

            return this.savingLessons[lessonId]
        },

        saveCourse(): Promise<TCourseId> {
            let routeId = this.courseId

            if (this.courseStatus === CourseStatus.requesting) {
                return this.courseUpdatePromise
            }

            if (this.courseStatus === CourseStatus.new) {
                routeId = 'create'
            }

            this.courseStatus = CourseStatus.requesting

            this.courseUpdatePromise = request<CourseCreateResponse>(`/api/editor/courses/${routeId}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.courseUpdatedName,
                    description: this.courseUpdatedDescription
                })
            })
                .then(({ data, errors }) => {
                    if (!errors.length) {
                        this.courseStatus = CourseStatus.created
                        this.courseId = data!.courseId
                        return this.courseId
                    }
                    this.courseStatus = this.courseId ? CourseStatus.created : CourseStatus.new
                    return ''
                })

            return this.courseUpdatePromise
        }
    }
})
