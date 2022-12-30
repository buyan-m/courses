import './styles.css'

export default class Note {
    render() {
        const note = document.createElement('blockquote')
        // note.classList.add('') ??
        note.setAttribute('contenteditable', 'true')
        note.setAttribute('style', 'background-color: var(--el-fill-color)')
        return note
    }

    save(block) {
        return block.innerText
    }

    static get toolbox() {
        return {
            icon: '<span>i</span>',
            title: 'Note'
        }
    }
}
