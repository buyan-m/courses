export enum EditorBlockType {
    'paragraph' = 'paragraph',
    'heading' = 'heading',
    'audio' = 'audio',
    'video' = 'video',
    'radio' = 'radio',
    'checkbox' = 'checkbox',
    'image' = 'image'
}

export type TOption = {
    value: string,
    isCorrect: boolean
}

export type TEditorBlockParagraph = {
    type: EditorBlockType.paragraph,
    data: {
        text: string
    }
}

export type TEditorBlockHeading = {
    type: EditorBlockType.heading,
    data: {
        text: string
    }
}

export type TEditorBlockImage = {
    type: EditorBlockType.image,
    data: {
        url: string
    }
}

export type TEditorBlockAudio = {
    type: EditorBlockType.audio,
    data: {
        url: string
    }
}

export type TEditorBlockVideo = {
    type: EditorBlockType.video,
    data: {
        videoId: string
    }
}

export type TEditorBlockRadio = {
    type: EditorBlockType.radio,
    data: {
        options: TOption[]
    }
}

export type TEditorBlockCheckbox = {
    type: EditorBlockType.checkbox,
    data: {
        options: TOption[]
    }
}

export type TEditorBlockUnknown = {
    type: EditorBlockType,
    data: Record<string, unknown>
}

export type TEditorBlock = TEditorBlockParagraph | TEditorBlockHeading | TEditorBlockImage |
    TEditorBlockAudio | TEditorBlockVideo | TEditorBlockRadio | TEditorBlockCheckbox | TEditorBlockUnknown
