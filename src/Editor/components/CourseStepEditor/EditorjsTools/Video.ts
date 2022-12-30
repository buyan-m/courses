import './styles.css'

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

export default class Audio {
    /**
     * @param {object} tool - tool properties got from editor.js
     * @param {ImageToolData} tool.data - previously saved data
     * @param {ImageConfig} tool.config - user config for Tool
     * @param {object} tool.api - Editor.js API
     * @param {boolean} tool.readOnly - read-only mode flag
     */
    constructor({
        data, config, api, readOnly
    }) {
        this.data = data

        return this
    }

    render() {
        if (!this.data.videoId) {
            const url = new URL(window.prompt('youtube url'))
            this.data.videoId = url.searchParams.get('v')

            if (false) {
                // тут асинхронный коллбэк, так как prompt тут не останется
                // this.api.getCurrentBlockIndex + this.api.delete(index)
            }
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
