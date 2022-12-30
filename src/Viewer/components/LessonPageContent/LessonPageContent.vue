<script lang="ts" setup>
import type { TPage } from '@/types/api/editor-responses'
import type { EditorBlockType } from '@/types/api/common'
import {
    ref, h, defineProps, defineEmits, watch
} from 'vue'
import type { VNode } from 'vue'
import RadioExercise from '@/Viewer/PageBlocks/RadioExercise/RadioExercise.vue'
import CheckExercise from '@/Viewer/PageBlocks/CheckExercise/CheckExercise.vue'
import ViewerImageWrapper from '@/Viewer/PageBlocks/ViewerImageWrapper/ViewerImageWrapper.vue'
import type { TOption } from '@/types/api/exercises'

type TConvertor = (data: unknown, handler?: () => void) => VNode

const CONVERTERS = {
    paragraph(data: { text: string }) {
        return h('p', {}, data.text)
    },
    heading(data: { text: string }) {
        return h('h2', {}, data.text)
    },
    image(data: { url: string }) {
        return h(ViewerImageWrapper, { src: data.url })
    },
    audio(data: { url: string }) {
        return h('a', { href: data.url }, 'soundcloud')
    },
    radio(data: { options: TOption[] }, passHandler) {
        return h(RadioExercise, { options: data.options, onAnswer: passHandler })
    },
    checkbox(data: { options: TOption[] }, passHandler) {
        return h(CheckExercise, { options: data.options, onAnswer: passHandler })
    }
} as Record<EditorBlockType, TConvertor>

const TYPES_REQUIRE_ANSWER = ['radio', 'checkbox']
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
    <page />
</template>
