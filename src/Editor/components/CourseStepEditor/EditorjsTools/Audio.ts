import './styles.css'
import type { BaseTool } from '@editorjs/editorjs'
import { createSoundcloudEmbed } from '@/utils/embeds'
import { API } from '@editorjs/editorjs'

type TAudioConstructorConfig = {
    data: {
        url: string | null
    },
    api: API
}

export default class Audio implements BaseTool {
    private data: { url: string | null }

    private api: API

    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     */
    constructor({ data, api }: TAudioConstructorConfig) {
        this.data = data
        this.api = api
    }

    render() {
        if (!this.data.url) {
            const url = window.prompt('soundcloud url')!
            this.data.url = url
        }
        const div = document.createElement('div')
        // но вообще генерацию html нужно на сервере хранить при добавлении элемента,
        // чтобы не борщить с вызовами api
        if (this.data.url) {
            createSoundcloudEmbed(this.data.url).then((html) => {
                div.innerHTML = html
            }, () => {
                this.api.blocks.delete(this.api.blocks.getCurrentBlockIndex())
            })
        } else {
            throw new Error('Can\'t add block without url')
        }

        return div
    }

    save() {
        return this.data
    }

    static get toolbox() {
        return {
            icon: '<span>S</span>',
            title: 'Audio'
        }
    }
}
