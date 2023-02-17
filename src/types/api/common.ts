export type TCourseId = string
export type TLessonId = string
export type TPageId = string
export type TUserId = string

export enum EditorBlockType {
    'paragraph' = 'paragraph',
    'heading' = 'heading',
    'note' = 'note',
    'audio' = 'audio',
    'video' = 'video',
    'radio' = 'radio',
    'input' = 'input',
    'checkbox' = 'checkbox',
    'image' = 'image'
}

export type TEditorBlock = {
    type: EditorBlockType,
    data: Record<string, unknown> // доуточнить
}
