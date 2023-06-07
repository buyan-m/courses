<template>
    <el-form
        data-test="checkboxExercise"
    >
        <el-form-item
            v-for="(option, index) in innerOptions"
            :key="index"
            :class="getOptionStyles(option)"
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
import { TAnswerFeedback } from '@/types/api-types'

const $styles = useCssModule()
const props = defineProps<{
    options: Option[],
    answer?: CheckAnswer,
    isTeacher: boolean
}>()
const emit = defineEmits<{
    answer: [text: string[]],
    saveFeedback: [fb: TAnswerFeedback]
}>()
const innerOptions = ref(props.options.map((el) => ({
    checked: false,
    ...el
})))
const originalAnswers = ref([] as string[])

function saveFeedback(feedback: TAnswerFeedback) {
    emit('saveFeedback', feedback)
}

function checkAnswer() {
    if (innerOptions.value.some((el) => !el.checked && el.isCorrect)) {
        return
    }
    emit(
        'answer',
        innerOptions.value.reduce((acc, el) => {
            if (el.checked) acc.push(el.value)
            return acc
        }, [] as string[])
    )
}

function alreadyAnsweredCallback(alreadyAnsweredValue?: CheckAnswer) {
    if (alreadyAnsweredValue) {
        alreadyAnsweredValue.value.forEach((el) => {
            const element = innerOptions.value.find(({ value }) => value === el)
            if (element) {
                element.checked = true
            } else {
                originalAnswers.value.push(el)
            }
        })
        // formDisabled.value = true
    }
}

function getOptionStyles(option: Option & { checked: boolean }) {
    if (option.checked) {
        return `${$styles.row} ${option.isCorrect ? $styles.correctRow : $styles.wrongRow}`
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
