import { Role } from '@/constants/Role'
import type {
    TCourseId, TUserId, TLessonId, TPageId, TEditorBlock
} from './common'

export type TCourseStructure = {
    _id: TCourseId,
    name: string,
    description: string,
    lessons: TLesson[]
}
export type TCourseCreateResponse = {
    courseId: TCourseId
}

export type TLesson = {
    _id: TLessonId,
    name: string,
    pages: Omit<TPage, 'structure'>[]
}

export type TLessonCreateDTO = {
    _id?: TLessonId,
    name: string,
    courseId: TCourseId
}

export type TLessonCreateResponse = {
    lessonId: TLessonId,
}

export type TPage = {
    _id: TPageId,
    name: string,
    structure: {
        blocks: TEditorBlock[]
    }
}

export type TPageCreateResponse = {
    pageId: TPageId
}

export type TLessonsList = TLesson[]
export type TPagesList = TPage[]
export type TAuthCheckResponse = {
    userId: TUserId,
    roles: Role[]
}
