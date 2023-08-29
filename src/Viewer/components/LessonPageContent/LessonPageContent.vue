<script lang="ts" setup>
import {
    ref, h, watch, useCssModule
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
    TAnswer,
    AnswerWithId,
    PageViewerDTO as ViewerPageResponse,
    EditorBlockType,
    EditorBlockExerciseType,
    Option,
    TAnswerFeedback
} from '@/types/api-types'
import { AnswerTypes } from '@/types/api-types'

type TConvertorInput = {
    data: unknown,
    passHandler?: (answer: TAnswer) => void,
    feedbackHandler?: (feedback: TAnswerFeedback) => void,
    answer?: unknown
}
type TConvertor = (obj: TConvertorInput) => VNode

const $style = useCssModule()

const props = defineProps<{
    content: ViewerPageResponse['structure'],
    savedAnswers: Record<string, TAnswer>,
    isTeacher: boolean
}>()

const emit = defineEmits<{
    answerReceived:[answer: AnswerWithId],
    feedbackUpdated: [answer: AnswerWithId],
}>()

const convertedBlocks = ref([] as VNode[])

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
        data, passHandler, answer, feedbackHandler
    }: TConvertorInput & { data: { options: Option[] } }) {
        return h(RadioExercise, {
            options: data.options,
            answer,
            isTeacher: props.isTeacher,
            onAnswer: passHandler,
            onSaveFeedback: feedbackHandler
        })
    },
    checkbox({
        data, passHandler, answer, feedbackHandler
    }: TConvertorInput & { data: { options: Option[] } }) {
        return h(CheckExercise, {
            options: data.options,
            answer,
            isTeacher: props.isTeacher,
            onAnswer: passHandler,
            onSaveFeedback: feedbackHandler
        })
    },
    input({
        data, passHandler, answer, feedbackHandler
    }: TConvertorInput & { data: { answers: string[] } }) {
        return h(InputExercise, {
            answers: data.answers,
            answer,
            isTeacher: props.isTeacher,
            onAnswer: passHandler,
            onSaveFeedback: feedbackHandler
        })
    }
} as Record<EditorBlockType | EditorBlockExerciseType, TConvertor>

function answerHandler(id: string) {
    return (answer: TAnswer) => {
        emit('answerReceived', { id, answer })
    }
}

function getFeedbackHandler(blockId: string) {
    return ({ feedback, correctness }: TAnswerFeedback) => {
        const answer = props.savedAnswers[blockId]
        if (answer) {
            answer.feedback = feedback
            answer.correctness = correctness
            emit('feedbackUpdated', { id: blockId, answer })
        } else {
            // send report
        }
    }
}

function convert(structure: ViewerPageResponse['structure']) {
    return structure.blocks.map((block) => {
        if (block.type in AnswerTypes) {
            const answer = props.savedAnswers[block.id]
            return CONVERTERS[block.type](
                {
                    data: block.data,
                    passHandler: answerHandler(block.id),
                    feedbackHandler: getFeedbackHandler(block.id),
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
    convertedBlocks.value = convert(newValue)
})

watch(() => props.savedAnswers, () => {
    convertedBlocks.value = convert(props.content)
})

const page = () => h('article', { 'data-test': 'pageContent' }, convertedBlocks.value)
</script>
<template>
    <page
        :class="$style.lesson"
    />
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
