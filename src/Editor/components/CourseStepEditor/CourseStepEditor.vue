<template>
    <section>
        <div
            :id="editorId"
            ref="editor"
        />
        <el-button
            @click="returnValue"
        >
            {{ $t('Save') }}
        </el-button>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EditorJS from '@editorjs/editorjs'
import type { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import Note from './EditorjsTools/Note'
import Audio from './EditorjsTools/Audio'
import Video from './EditorjsTools/Video'
import Radio from './EditorjsTools/RadioExercise/RadioExerciseTool'
import Checkbox from './EditorjsTools/CheckboxExercise/CheckboxExerciseTool'
import Input from './EditorjsTools/InputExercise/InputExerciseTool'

export default defineComponent({
    props: {
        initialPage: {
            type: Object,
            default: () => ({})
        }
    },

    emits: ['save'],

    data() {
        return {
            editorId: '',
            editor: null as unknown as EditorJS
        }
    },

    mounted() {
        const random = Math.ceil(Math.random() * 10000)

        this.editorId = `editor_${random}`

        this.$nextTick(() => {
            this.editor = new EditorJS({
                holder: this.editorId,
                tools: {
                    header: Header,
                    list: List,
                    note: Note,
                    audio: Audio,
                    video: Video,
                    radio: Radio,
                    checkbox: Checkbox,
                    input: Input,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: '/api/image-upload',
                                byUrl: ''
                            }
                        }
                    }
                },
                data: this.initialPage as unknown as OutputData
            })
        })
    },
    methods: {
        returnValue() {
            this.editor.save().then((data) => {
                this.$emit('save', data)
            })
        }
    }
})
</script>
