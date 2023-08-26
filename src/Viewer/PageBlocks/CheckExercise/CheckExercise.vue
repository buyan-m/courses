<template>
    <el-form
        data-test="checkboxExercise"
    >
        <el-form-item
            v-for="(option, index) in innerOptions"
            :key="index"
            :class="getOptionStyles(index)"
        >
            <el-checkbox
                v-model="option.checked"
                :disabled="option.checked"
                @change="checkAnswer"
            >
                {{ option.value }}
            </el-checkbox>
        </el-form-item>
        <AnswerFeedback
            v-if="answer"
            :answer="answer"
            :auto-correctness="autoCorrectness"
            :is-editable="isTeacher"
            @save-feedback="saveFeedback"
        />
        <OriginalAnswers
            v-if="originalAnswers.length"
            :original-answers="originalAnswers"
        />
    </el-form>
</template>
<script lang="ts" setup>
import {
    defineProps, ref, useCssModule, watch
} from 'vue'
import type { CheckAnswer, Option } from '@/types/api-types'
import OriginalAnswers from '@/Viewer/PageBlocks/OriginalAnswers/OriginalAnswers.vue'
import AnswerFeedback from '@/Viewer/PageBlocks/AnswerFeedback/AnswerFeedback.vue'
import { AnswerCorrectness, AnswerTypes, TAnswerFeedback } from '@/types/api-types'

const $styles = useCssModule()
const props = defineProps<{
    options: Option[],
    answer?: CheckAnswer,
    isTeacher: boolean
}>()
const emit = defineEmits<{
    answer: [text: CheckAnswer],
    saveFeedback: [fb: TAnswerFeedback]
}>()
const innerOptions = ref(props.options.map((el) => ({
    checked: false,
    ...el
})))
const originalAnswers = ref([] as string[])
const answersCheckedMap = ref<Record<string | number, AnswerCorrectness>>({})
const autoCorrectness = ref<AnswerCorrectness>(AnswerCorrectness['not-verified'])

const stylesMap: Record<AnswerCorrectness, string> = {
    [AnswerCorrectness.correct]: $styles.correctRow,
    [AnswerCorrectness.incorrect]: $styles.wrongRow,
    [AnswerCorrectness['not-verified']]: ''
}

function saveFeedback(feedback: TAnswerFeedback) {
    emit('saveFeedback', feedback)
}

function checkAnswer() {
    let correctness = AnswerCorrectness.correct
    const showCorrectness = innerOptions.value.some((el) => el.isCorrect)
    const value = [] as string[]

    innerOptions.value.forEach((el, index) => {
        if (el.checked) value.push(el.value)

        if ((el.checked && !el.isCorrect) || (!el.checked && el.isCorrect)) correctness = AnswerCorrectness.incorrect

        if (!el.checked) return

        if (showCorrectness) {
            answersCheckedMap.value[index] = el.isCorrect ? AnswerCorrectness.correct : AnswerCorrectness.incorrect
        } else {
            answersCheckedMap.value[index] = AnswerCorrectness['not-verified']
        }
    })

    emit('answer', {
        type: AnswerTypes.checkbox,
        value,
        correctness: showCorrectness ? correctness : AnswerCorrectness['not-verified'],
        feedback: ''
    })
}

function alreadyAnsweredCallback(alreadyAnsweredValue?: CheckAnswer) {
    if (alreadyAnsweredValue) {
        let answersCorrectness = AnswerCorrectness['not-verified']
        if (innerOptions.value.some(({ isCorrect }) => isCorrect)) {
            answersCorrectness = AnswerCorrectness.incorrect
        }

        alreadyAnsweredValue.value.forEach((el) => {
            const index = innerOptions.value.findIndex(({ value }) => value === el)
            const element = innerOptions.value[index]
            if (element) {
                element.checked = true

                if (element.isCorrect) {
                    answersCheckedMap.value[index] = AnswerCorrectness.correct
                } else {
                    answersCheckedMap.value[index] = answersCorrectness
                }
            } else {
                originalAnswers.value.push(el)
            }
        })

        if (Object.values(answersCheckedMap.value).every((el) => el === AnswerCorrectness.correct)) {
            autoCorrectness.value = AnswerCorrectness.correct
        }
    }
}

function getOptionStyles(index: number) {
    if (innerOptions.value[index].checked) {
        return `${$styles.row} ${stylesMap[answersCheckedMap.value[index]]}`
    }
    return $styles.row
}

watch(() => props.answer, (alreadyAnsweredValue) => {
    alreadyAnsweredCallback(alreadyAnsweredValue)
})
alreadyAnsweredCallback(props.answer)
</script>
<style module>
.correctRow {
    background-color: var(--el-color-success-light-5);
}
.wrongRow {
    background-color: var(--el-color-error-light-5);
}
.row {
    width: 100%;
}
</style>
