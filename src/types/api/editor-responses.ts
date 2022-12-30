import type {
    TCourseId, TLessonId, TPageId, TEditorBlock
} from './common'

export type TCourseStructure = {
    id: TCourseId,
    name: string,
    lessons: TLessonId[]
}
export type TLesson = {
    id: TLessonId,
    name: string,
    pages: TPageId[]
}

export type TLessonResponse = {
    id: TLessonId,
    name: string,
    pages: TPage[]
}
export type TLessonCreateResponse = {
    lessonId: TLessonId,
}

export type TPage = {
    id: TPageId,
    name: string,
    structure: {
        blocks: TEditorBlock[]
    }
}

export type TPageCreateResponse = {
    pageId: TPageId
}

export type TCoursesMap = Record<TCourseId, TCourseStructure>
export type TLessonsList = TLesson[]
export type TPagesList = TPage[]
