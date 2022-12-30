export type TCourseId = string
export type TLessonId = string
export type TPageId = string

export enum EditorBlockType {
    'paragraph' = 'paragraph',
    'heading' = 'heading',
    'audio' = 'audio',
    'radio' = 'radio',
    'checkbox' = 'checkbox',
    'image' = 'image'
}

export type TEditorBlock = {
    type: EditorBlockType,
    data: Record<string, unknown> // доуточнить
}
