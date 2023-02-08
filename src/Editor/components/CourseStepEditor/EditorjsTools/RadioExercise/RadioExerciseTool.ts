import { createApp } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { BaseTool } from '@editorjs/editorjs'
import type { TOption } from '@/types/api/page-content'
import i18n from '@/i18n'
import elementPlus from 'element-plus'
import RadioExerciseVue from './RadioExercise.vue'

type TRadioComponent = ComponentPublicInstance<{}, {}, { innerOptions: [] }>
type TRadioConstructorParams = {
    data: {
        options: TOption[]
    }
}

export default class RadioExerciseTool implements BaseTool {
    private form: null | HTMLElement

    private options: TOption[]

    private vueComponent: TRadioComponent | null

    constructor({ data }: TRadioConstructorParams) {
        this.form = null
        this.vueComponent = null
        this.options = data.options || [{ value: '' }]
    }

    render() {
        if (!this.vueComponent) {
            this.form = document.createElement('div')
            this.vueComponent = createApp(RadioExerciseVue, {
                options: this.options
            })
                .use(i18n)
                .use(elementPlus)
                .mount(this.form) as TRadioComponent
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
            icon: '<span>R</span>',
            title: 'single answer'
        }
    }
}
