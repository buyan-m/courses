import type { BaseTool } from '@editorjs/editorjs'

export default class Note implements BaseTool {
    private data

    constructor({ data = { text: '' } } : { data: { text: string } }) {
        this.data = data
    }

    render() {
        const note = document.createElement('blockquote')
        note.setAttribute('contenteditable', 'true')
        if (this.data.text) {
            note.innerHTML = this.data.text
        }
        note.setAttribute('style', 'background-color: var(--el-fill-color); padding: 10px 20px;margin-bottom:20px')
        return note
    }

    save(block: HTMLElement) {
        return {
            text: block.innerHTML
        }
    }

    static get toolbox() {
        return {
            icon: '<span>i</span>',
            title: 'Note'
        }
    }
}
