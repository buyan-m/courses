import './styles.css'
import type { BaseTool } from '@editorjs/editorjs'
import type { TEditorBlockVideo } from '@/types/api/page-content'

type TVideoConstructorParams = {
    data: TEditorBlockVideo['data']
}

export default class Video implements BaseTool {
    private readonly data: TEditorBlockVideo['data']

    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     */
    constructor({
        data
    }: TVideoConstructorParams) {
        this.data = data
    }

    render() {
        if (!this.data.videoId) {
            const url = new URL(window.prompt('youtube url')!)
            this.data.videoId = url.searchParams.get('v')!
        }

        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${this.data.videoId}`
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
