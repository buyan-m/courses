import './styles.css'
import type { API, BaseTool } from '@editorjs/editorjs'
import type { TEditorBlockVideo } from '@/types/api/page-content'
import { createYoutubeURL } from '@/utils/embeds'

type TVideoConstructorParams = {
    data: TEditorBlockVideo['data'],
    api: API
}

export default class Video implements BaseTool {
    private readonly data: TEditorBlockVideo['data']

    private readonly api: API

    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     */
    constructor({
        data,
        api
    }: TVideoConstructorParams) {
        this.data = data
        this.api = api
    }

    render() {
        if (!this.data.videoId) {
            const url = new URL(window.prompt('youtube url')!)
            this.data.videoId = url.searchParams.get('v')!
        }
        if (!this.data.videoId) {
            this.api.blocks.delete(this.api.blocks.getCurrentBlockIndex())
            throw new Error('Can\'t add block without videoId')
        }
        const iframe = document.createElement('iframe')
        iframe.src = createYoutubeURL(this.data.videoId)
        return iframe
    }

    save() {
        return this.data
    }

    static get toolbox() {
        return {
            icon: '<span>Y</span>',
            title: 'Video'
        }
    }
}
