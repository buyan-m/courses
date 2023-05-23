import { defineStore } from 'pinia'
import request, { TResponse } from '@/utils/request'
import type {
    NextPage, PageViewerDTO as ViewerPageResponse, AnswersDTO, AnswerFeedback, AnswerWithId, TAnswer
} from '@/types/api-types'

export const useLessonPageStore = defineStore('lessonPage', {
    state: () => ({
        currentPageId: '',
        currentStudentId: '',
        heading: '',
        pageContent: { blocks: [], version: '' } as ViewerPageResponse['structure'],
        nextPage: false,
        pageCompleted: false,
        answers: [] as AnswerWithId[],
        saveRequest: Promise.resolve() as Promise<unknown>,
        savedAnswers: {} as Record<string, TAnswer>,
        updatedFeedbacks: {} as Record<string, AnswerFeedback>,
        isUserTeacher: false
    }),
    actions: {
        getLessonPage(pageId: string, studentId?: string) {
            this.currentPageId = pageId
            this.currentStudentId = ''
            this.pageCompleted = false
            this.isUserTeacher = false
            this.savedAnswers = {} as Record<string, TAnswer>
            this.answers = []
            let answersRequest: Promise<TResponse<AnswersDTO>> = new Promise(() => {})

            if (studentId) {
                answersRequest = request<AnswersDTO>(`/api/learning/answers/${pageId}/${studentId}`)
                    .then((response) => {
                        if (response.data) {
                            this.isUserTeacher = true
                            this.currentStudentId = studentId
                            this.updatedFeedbacks = response.data.answers
                                .reduce((acc, { id, answer }) => {
                                    acc[id] = {
                                        correctness: answer.correctness,
                                        feedback: answer.feedback
                                    }
                                    return acc
                                }, {} as Record<string, AnswerFeedback>)
                        }
                        return response
                    })
            } else {
                answersRequest = request<AnswersDTO>(`/api/learning/answers/${pageId}`)
            }

            return Promise.all([
                answersRequest.then(({ data, errors }) => {
                    if (data) {
                        this.savedAnswers = data.answers.reduce((acc, el) => {
                            acc[el.id] = el.answer
                            return acc
                        }, {} as Record<string, TAnswer>)
                        this.pageCompleted = true
                    }
                    if (errors.length) {
                        throw new Error(errors[0])
                    }
                }),
                request<ViewerPageResponse>(`/api/viewer/pages/${pageId}`).then(({ data, errors }) => {
                    if (data) {
                        this.pageContent = data!.structure
                        this.heading = data!.name
                        this.nextPage = data!.nextPageAvailable
                    } else {
                        throw new Error(errors[0])
                    }
                })
            ])
        },

        saveAnswers() {
            return request(`/api/learning/save-answers/${this.currentPageId}`, {
                method: 'put',
                body: JSON.stringify({
                    answers: this.answers
                })
            }).then(({ errors }) => {
                if (errors.length) {
                    throw new Error(`Error while saving answers: ${errors[0]}`)
                }
            })
        },

        updateFeedback({ id, answerFeedback }: { id: string, answerFeedback: AnswerFeedback }) {
            this.updatedFeedbacks[id] = answerFeedback
        },

        sendFeedbackToStudent() {
            return request(`/api/learning/answers-feedback/${this.currentPageId}/${this.currentStudentId}`, {
                method: 'put',
                body: JSON.stringify(this.updatedFeedbacks)
            })
        },

        getNextPage() {
            if (this.answers.length) {
                this.saveRequest = this.saveAnswers()
            }

            return request<NextPage>(`/api/viewer/pages/${this.currentPageId}/next`, {
                method: 'post'
            }).then(async ({ data, errors }) => {
                if (data) {
                    await this.saveRequest
                    return data.pageId
                }
                throw new Error(errors[0])
            })
        },

        completeLesson(lessonId: string) {
            if (this.answers.length) {
                this.saveRequest = this.saveAnswers()
            }
            return request(`/api/viewer/lessons/${lessonId}/complete`, { method: 'post' })
                .then(({ errors }) => {
                    if (errors.length) {
                        // показать бы ошибку и все равно перевести на другую страницу, по прошествию saveRequest
                    }
                    return this.saveRequest
                })
        },

        setAnswers(answers: AnswerWithId[]) {
            this.answers = answers
            this.pageCompleted = true
        }
    }
})
