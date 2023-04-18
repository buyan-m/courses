import { defineStore } from 'pinia'
import request from '@/utils/request'
import { TNextPage, TViewerPage } from '@/types/api/viewer-responses'
import { TAnswer, TLearningPageAnswers, TTestAnswer } from '@/types/api/learning-responses'

export const useLessonPageStore = defineStore('lessonPage', {
    state: () => ({
        currentPageId: '',
        heading: '',
        pageContent: [] as unknown as TViewerPage['structure'],
        nextPage: false,
        pageCompleted: false,
        answers: [] as TTestAnswer[],
        saveRequest: Promise.resolve() as Promise<unknown>,
        savedAnswers: {} as Record<string, TAnswer>
    }),
    actions: {
        getLessonPage(pageId: string) {
            this.currentPageId = pageId
            this.pageCompleted = false
            this.savedAnswers = {} as Record<string, TAnswer>
            this.answers = []

            return Promise.all([
                request<TLearningPageAnswers>(`/api/learning/answers/${pageId}`).then(({ data }) => {
                    if (data) {
                        this.savedAnswers = data.answers.reduce((acc, el) => {
                            acc[el.id] = el.answer
                            return acc
                        }, {} as Record<string, TAnswer>)
                        this.pageCompleted = true
                    }
                }),
                request<TViewerPage>(`/api/viewer/pages/${pageId}`).then(({ data, errors }) => {
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

        getNextPage() {
            if (this.answers.length) {
                this.saveRequest = this.saveAnswers()
            }

            return request<TNextPage>(`/api/viewer/pages/${this.currentPageId}/next`, {
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
            return request<TViewerPage>(`/api/viewer/lessons/${lessonId}/complete`, { method: 'post' })
                .then(({ errors }) => {
                    if (errors.length) {
                        // показать бы ошибку и все равно перевести на другую страницу, по прошествию saveRequest
                    }
                    return this.saveRequest
                })
        },

        setAnswers(answers: TTestAnswer[]) {
            this.answers = answers
            this.pageCompleted = true
        }
    }
})
