import type { TPageId, TEditorBlock, TLessonId } from './common'

export type TNextPage = {
    pageId: TPageId
}

export type TPage = {
    id: TPageId,
    name: string,
    structure: {
        blocks: TEditorBlock[]
    }
}

export type TLessonResponse = {
    id: TLessonId,
    name: string,
    pages: TPage[]
}

export type TViewerPage = TPage & {
    nextPageAvailable: boolean
}
