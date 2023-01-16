import './styles.css'
import request from '@/utils/request'
import type { BaseTool } from '@editorjs/editorjs'

type TSoundCloudResponse = {
    author_name: string
    author_url: string
    description: string
    height: number
    html: string
    provider_name: string
    thumbnail_url: string
    title: string
    width: string
}

type TAudioConstructorConfig = {
    data: {
        url: string | null
    }
}

export default class Audio implements BaseTool {
    private data: { url: string | null }

    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     */
    constructor({ data }: TAudioConstructorConfig) {
        this.data = data
    }

    render() {
        if (!this.data.url) {
            const url = window.prompt('soundcloud url')!
            this.data.url = url
        }

        const div = document.createElement('div')
        // но вообще генерацию html нужно на сервере хранить при добавлении элемента,
        // чтобы не борщить с вызовами api
        request<TSoundCloudResponse>(`https://soundcloud.com/oembed?format=json&maxheight=80&url=${decodeURI(this.data.url)}`, {
            headers: { 'Content-Type': 'text/plain' },
            credentials: 'omit'
        }).then((resp) => {
            div.innerHTML = resp.data!.html
        })
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
