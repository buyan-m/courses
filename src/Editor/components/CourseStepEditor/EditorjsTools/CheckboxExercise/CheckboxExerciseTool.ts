import { createApp } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { BaseTool } from '@editorjs/editorjs'
import CheckboxExerciseVue from './CheckboxExercise.vue'

export type TOption = {
    value: string,
    isCorrect?: boolean
}

type TCheckboxComponent = ComponentPublicInstance<{}, {}, { innerOptions: [] }>
type TCheckboxConstructorParams = {
    data: {
        options: TOption[]
    }
}

export default class CheckboxExerciseTool implements BaseTool {
    private form: null | HTMLElement

    private options: TOption[]

    private vueComponent: TCheckboxComponent | null

    constructor({ data }: TCheckboxConstructorParams) {
        this.form = null
        this.vueComponent = null
        this.options = data.options || [{ value: '' }]
    }

    render() {
        if (!this.vueComponent) {
            this.form = document.createElement('div')
            this.vueComponent = createApp(CheckboxExerciseVue, {
                options: this.options
            }).mount(this.form) as TCheckboxComponent
        }
        return this.form as HTMLElement
    }

    save() {
        return {
            options: this.vueComponent!.$data.innerOptions
        }
    }

    static get toolbox() {
        return {
            icon: '<span>✅</span>',
            title: 'multiple'
        }
    }
}
