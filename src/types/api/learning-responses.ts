export enum AnswerTypes {
    radio = 'radio',
    check = 'check',
    text = 'text'
}

export type TRadioAnswer = {
    type: AnswerTypes.radio,
    value: string
}

export type TCheckAnswer = {
    type: AnswerTypes.check,
    value: string[]
}

export type TTextAnswer = {
    type: AnswerTypes.text,
    value: string
}

export type TAnswer = TRadioAnswer | TCheckAnswer | TTextAnswer

export type TTestAnswer = {
    id: string,
    answer: TAnswer
}

export type TLearningPageAnswers = {
    pageId: string,
    answers: TTestAnswer[]
}
