<script lang="ts" setup>
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
import { createYoutubeURL } from '@/utils/embeds'
import type {
    TAnswer, AnswerWithId, PageViewerDTO as ViewerPageResponse, EditorBlockType, Option
} from '@/types/api-types'
import { AnswerCorrectness } from '@/types/api-types'

type TConvertorInput = {
    data: unknown,
    passHandler?: (answer: unknown) => void,
    answer?: unknown
}
type TConvertor = (obj: TConvertorInput) => VNode

const $style = useCssModule()

const CONVERTERS = {
    paragraph({ data } : TConvertorInput & { data: { text: string } }) {
        return h('p', { innerHTML: data.text })
    },
    heading({ data } : TConvertorInput & { data: { text: string } }) {
        return h('h2', {}, data.text)
    },
    list({ data } : TConvertorInput & { data: { style: 'ordered' | 'unordered', items: string[] } }) {
        let el
        if (data.style === 'ordered') {
            el = 'ol'
        } else {
            el = 'ul'
        }
        return h(el, {}, data.items.map((text) => h('li', { innerHTML: text, class: $style.listItem })))
    },
    note({ data } : TConvertorInput & { data: { text: string } }) {
        return h(NoteBlock, { text: data.text })
    },
    image({ data } : TConvertorInput & { data: { file: { url: string }, caption: string } }) {
        return h(ViewerImageWrapper, { src: data.file.url, caption: data.caption })
    },
    audio({ data } : TConvertorInput & { data: { url: string } }) {
        return h(SoundCloud, { url: data.url })
    },
    video({ data } : TConvertorInput & { data: { videoId: string } }) {
        return h('iframe', { src: createYoutubeURL(data.videoId), class: $style.youtubeEmbed })
    },
    radio({
        data, passHandler, answer
    }: TConvertorInput & { data: { options: Option[] } }) {
        return h(RadioExercise, {
            options: data.options,
            answer,
            onAnswer: passHandler
        })
    },
    checkbox({
        data, passHandler, answer
    }: TConvertorInput & { data: { options: Option[] } }) {
        return h(CheckExercise, {
            options: data.options,
            answer,
            onAnswer: passHandler
        })
    },
    input({
        data, passHandler, answer
    }: TConvertorInput & { data: { answers: string[] } }) {
        return h(InputExercise, {
            answers: data.answers,
            answer,
            onAnswer: passHandler
        })
    }
} as Record<EditorBlockType, TConvertor>

const TYPES_REQUIRE_ANSWER = ['radio', 'checkbox', 'input']
const props = defineProps<{ content: ViewerPageResponse['structure'], savedAnswers: Record<string, TAnswer> }>()
const emit = defineEmits(['answersReceived'])
const convertedBlocks = ref([] as VNode[])
const questions = ref([] as string[])
const answers = ref([] as AnswerWithId[])

function answerHandler(blockId: string, blockType: string) {
    questions.value.push(blockId)
    return (answer: unknown) => {
        questions.value = questions.value.filter((el) => el !== blockId)
        answers.value.push({
            id: blockId,
            answer: {
                type: blockType,
                value: answer,
                correctness: AnswerCorrectness['not-verified']
            } as TAnswer
        })
    }
}

function convert(structure: ViewerPageResponse['structure']) {
    return structure.blocks.map((block) => {
        if (TYPES_REQUIRE_ANSWER.indexOf(block.type) !== -1) {
            const answer = props.savedAnswers[block.id]
            return CONVERTERS[block.type](
                {
                    data: block.data,
                    passHandler: answerHandler(block.id, block.type),
                    answer
                }
            )
        }
        return CONVERTERS[block.type]({
            data: block.data
        })
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
