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
import { TAnswer, TTestAnswer } from '@/types/api/learning-responses'

type TConvertor = (data: unknown, handler?: (answer: unknown) => void, answer?: unknown) => VNode

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
    radio(data: { options: TOption[] }, passHandler, answer) {
        return h(RadioExercise, { options: data.options, onAnswer: passHandler, answer })
    },
    checkbox(data: { options: TOption[] }, passHandler, answer) {
        return h(CheckExercise, { options: data.options, onAnswer: passHandler, answer })
    },
    input(data: { answers: string[] }, passHandler, answer) {
        return h(InputExercise, { answers: data.answers, onAnswer: passHandler, answer })
    }
} as Record<EditorBlockType, TConvertor>

const TYPES_REQUIRE_ANSWER = ['radio', 'checkbox', 'input']
const props = defineProps<{ content: TPage['structure'], savedAnswers: Record<string, TAnswer> }>()
const emit = defineEmits(['answersReceived'])
const convertedBlocks = ref([] as VNode[])
const questions = ref([] as string[])
const answers = ref([] as TTestAnswer[])

function answerHandler(blockId: string, blockType: string) {
    questions.value.push(blockId)
    return (answer: unknown) => {
        questions.value = questions.value.filter((el) => el !== blockId)
        answers.value.push({
            id: blockId,
            answer: {
                type: blockType,
                value: answer
            } as TAnswer
        })
    }
}

function convert(structure: TPage['structure']) {
    return structure.blocks.map((block) => {
        if (TYPES_REQUIRE_ANSWER.indexOf(block.type) !== -1) {
            const answer = props.savedAnswers[block.id]
            return CONVERTERS[block.type](block.data, answerHandler(block.id, block.type), answer)
        }
        return CONVERTERS[block.type](block.data)
    })
}

watch(() => props.content, (newValue) => {
    answers.value = []
    convertedBlocks.value = convert(newValue)
    if (questions.value.length === 0) {
        emit('answersReceived', [])
    }
})

watch(() => props.savedAnswers, () => {
    answers.value = []
    convertedBlocks.value = convert(props.content)
    if (questions.value.length === 0) {
        emit('answersReceived', [])
    }
})

watch(() => questions.value, (newValue) => {
    if (newValue.length === 0) {
        emit('answersReceived', answers.value)
    }
})

const page = () => h('article', { 'data-test': 'pageContent' }, convertedBlocks.value)
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
    width: 100%;
    height: 500px;
}
@media screen and (max-width: 1000px) {
    .youtubeEmbed {
        width: 100%;
        height: calc(56.25vw - 60px);
    }
}
</style>
