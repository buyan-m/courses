import './styles.css'
import type { BaseTool } from '@editorjs/editorjs'

export default class Note implements BaseTool {
    render() {
        const note = document.createElement('blockquote')
        // note.classList.add('') ??
        note.setAttribute('contenteditable', 'true')
        note.setAttribute('style', 'background-color: var(--el-fill-color)')
        return note
    }

    save(block: HTMLElement) {
        return block.innerText
    }

    static get toolbox() {
        return {
            icon: '<span>i</span>',
            title: 'Note'
        }
    }
}
