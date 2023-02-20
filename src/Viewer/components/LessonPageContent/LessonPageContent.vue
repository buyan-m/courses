<script lang="ts" setup>
import type { TPage } from '@/types/api/editor-responses'
import type { EditorBlockType } from '@/types/api/common'
import {
    ref, h, defineProps, defineEmits, watch, useCssModule
} from 'vue'
import type { VNode } from 'vue'
import RadioExercise from '@/Viewer/PageBlocks/RadioExercise/RadioExercise.vue'
import CheckExercise from '@/Viewer/PageBlocks/CheckExercise/CheckExercise.vue'
import InputExercise from '@/Viewer/PageBlocks/InputExercise/InputExercise.vue'
import NoteBlock from '@/Viewer/PageBlocks/NoteBlock/NoteBlock.vue'
import SoundCloud from '@/Viewer/PageBlocks/SoundCloud/SoundCloud.vue'
import ViewerImageWrapper from '@/Viewer/PageBlocks/ViewerImageWrapper/ViewerImageWrapper.vue'
import type { TOption } from '@/types/api/page-content'
import { createYoutubeURL } from '@/utils/embeds'

type TConvertor = (data: unknown, handler?: () => void) => VNode

const $style = useCssModule()

const CONVERTERS = {
    paragraph(data: { text: string }) {
        return h('p', { innerHTML: data.text })
    },
    heading(data: { text: string }) {
        return h('h2', {}, data.text)
    },
    list(data: { style: 'ordered' | 'unordered', items: string[] }) {
        let el
        if (data.style === 'ordered') {
            el = 'ol'
        } else {
            el = 'ul'
        }
        return h(el, {}, data.items.map((text) => h('li', { innerHTML: text, class: $style.listItem })))
    },
    note(data: { text: string }) {
        return h(NoteBlock, { text: data.text })
    },
    image(data: { file: { url: string }, caption: string }) {
        return h(ViewerImageWrapper, { src: data.file.url, caption: data.caption })
    },
    audio(data: { url: string }) {
        return h(SoundCloud, { url: data.url })
    },
    video(data: { videoId: string }) {
        return h('iframe', { src: createYoutubeURL(data.videoId), class: $style.youtubeEmbed })
    },
    radio(data: { options: TOption[] }, passHandler) {
        return h(RadioExercise, { options: data.options, onAnswer: passHandler })
    },
    checkbox(data: { options: TOption[] }, passHandler) {
        return h(CheckExercise, { options: data.options, onAnswer: passHandler })
    },
    input(data: { answers: string[] }, passHandler) {
        return h(InputExercise, { answers: data.answers, onAnswer: passHandler })
    }
} as Record<EditorBlockType, TConvertor>

const TYPES_REQUIRE_ANSWER = ['radio', 'checkbox', 'input']
const props = defineProps<{ content: TPage['structure'] }>()
const emit = defineEmits(['answersReceived'])
const convertedBlocks = ref([] as VNode[])
const questions = ref([] as number[])

function answerHandler(blockNumber: number) {
    questions.value.push(blockNumber)
    return () => {
        questions.value = questions.value.filter((el) => el !== blockNumber)
    }
}

function convert(structure: TPage['structure']) {
    return structure.blocks.map((block, index) => {
        if (TYPES_REQUIRE_ANSWER.indexOf(block.type) !== -1) {
            return CONVERTERS[block.type](block.data, answerHandler(index))
        }
        return CONVERTERS[block.type](block.data)
    })
}

watch(() => props.content, (newValue) => {
    convertedBlocks.value = convert(newValue)
    if (questions.value.length === 0) {
        emit('answersReceived')
    }
})

watch(() => questions.value, (newValue) => {
    if (newValue.length === 0) {
        emit('answersReceived')
    }
})

const page = () => h('article', convertedBlocks.value)
</script>
<template>
    <page :class="$style.lesson" />
</template>
<style module>
.lesson {
    font-size: 18px;
    line-height: 1.7;
    padding-bottom: 20px;
}

.listItem {
    margin-bottom: 10px;
}
.youtubeEmbed {
    width: 800px;
    height: 450px;
}
</style>
