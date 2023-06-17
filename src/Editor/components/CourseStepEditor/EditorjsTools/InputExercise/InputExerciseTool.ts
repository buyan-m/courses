import { createApp } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { BaseTool } from '@editorjs/editorjs'
import i18n from '@/i18n'
import InputExerciseVue from './InputExercise.vue'

type TInputComponent = ComponentPublicInstance<{}, {}, { correctAnswers: [] }>
type TInputConstructorParams = {
    data: {
        answers: string[]
    }
}

export default class InputExerciseTool implements BaseTool {
    private form: null | HTMLElement

    private answers: string[]

    private vueComponent: TInputComponent | null

    constructor({ data }: TInputConstructorParams) {
        this.form = null
        this.answers = data.answers || []
        this.vueComponent = null
    }

    render() {
        if (!this.vueComponent) {
            this.form = document.createElement('div')
            this.vueComponent = createApp(InputExerciseVue, {
                answers: this.answers
            })
                .use(i18n)
                .mount(this.form) as TInputComponent
        }
        return this.form as HTMLElement
    }

    save() {
        return {
            answers: this.vueComponent!.$data.correctAnswers
        }
    }

    static get toolbox() {
        return {
            icon: '<span>✏️</span>',
            title: 'text answer'
        }
    }
}
