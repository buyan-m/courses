import type {
    TCourseId, TLessonId, TPageId, TEditorBlock
} from './common'

export type TCourseStructure = {
    _id: TCourseId,
    name: string,
    lessons: TLessonId[]
}
export type TCourseCreateResponse = {
    courseId: TCourseId
}

export type TLesson = {
    _id: TLessonId,
    name: string,
    pages: TPageId[]
}

export type TLessonResponse = {
    _id: TLessonId,
    name: string,
    pages: TPage[]
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
