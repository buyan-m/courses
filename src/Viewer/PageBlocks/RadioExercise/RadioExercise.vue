<template>
    <el-form
        data-test="radioExercise"
    >
        <el-radio-group
            v-model="checkedAnswerIndex"
            @change="checkAnswer"
        >
            <el-form-item
                v-for="(option, index) in props.options"
                :key="index"
                :class="getOptionStyles(index)"
            >
                <el-radio
                    :disabled="answerChecked"
                    :label="index"
                >
                    {{ option.value }}
                </el-radio>
            </el-form-item>
        </el-radio-group>
        <AnswerFeedback
            v-if="answer"
            :answer="answer"
            :auto-correctness="autoCorrectness"
            :is-editable="isTeacher"
            @save-feedback="saveFeedback"
        />
        <OriginalAnswers
            v-if="isOriginalValueVisible"
            :original-answers="[originalValue]"
        />
    </el-form>
</template>
<script lang="ts" setup>
import {
    defineEmits, defineProps, ref, useCssModule, watch
} from 'vue'
import type { Option, RadioAnswer } from '@/types/api-types'
import { AnswerCorrectness, AnswerTypes, TAnswerFeedback } from '@/types/api-types'
import OriginalAnswers from '@/Viewer/PageBlocks/OriginalAnswers/OriginalAnswers.vue'
import AnswerFeedback from '@/Viewer/PageBlocks/AnswerFeedback/AnswerFeedback.vue'

const $styles = useCssModule()
const props = defineProps<{
    options: Option[],
    answer?: RadioAnswer,
    isTeacher: boolean
}>()
const emit = defineEmits<{
    answer:[answer: RadioAnswer],
    saveFeedback: [fb: TAnswerFeedback]
}>()

const answerChecked = ref(false)
const checkedAnswerIndex = ref(-1)
const originalValue = ref('')
const isOriginalValueVisible = ref(false)
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

function alreadyAnsweredCallback(answer?: RadioAnswer) {
    if (answer) {
        checkedAnswerIndex.value = props.options.findIndex(({ value }) => answer.value === value)
        if (checkedAnswerIndex.value === -1) {
            isOriginalValueVisible.value = true
            originalValue.value = answer.value
        } else {
            let correctness = AnswerCorrectness['not-verified']
            if (props.options.some(({ isCorrect }) => isCorrect)) {
                correctness = AnswerCorrectness.incorrect
            }
            if (props.options[checkedAnswerIndex.value].isCorrect) {
                correctness = AnswerCorrectness.correct
            }
            answersCheckedMap.value[checkedAnswerIndex.value] = correctness

            autoCorrectness.value = correctness
        }
        answerChecked.value = true
    }
}

watch(() => props.answer, (answer) => {
    alreadyAnsweredCallback(answer)
})

function checkAnswer() {
    answerChecked.value = true
    let correctness = AnswerCorrectness['not-verified']

    if (props.options.some(({ isCorrect }) => isCorrect)) {
        correctness = AnswerCorrectness.incorrect
    }

    if (props.options[checkedAnswerIndex.value].isCorrect) {
        correctness = AnswerCorrectness.correct
    }

    answersCheckedMap.value[checkedAnswerIndex.value] = correctness

    emit('answer', {
        type: AnswerTypes.radio,
        value: props.options[checkedAnswerIndex.value].value,
        correctness,
        feedback: ''
    })
}

function getOptionStyles(index: number) {
    if (index === checkedAnswerIndex.value) {
        return `${$styles.row} ${stylesMap[answersCheckedMap.value[index]]}`
    }
    return $styles.row
}

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
.originalValue {

}
</style>
