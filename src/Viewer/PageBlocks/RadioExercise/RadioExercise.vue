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
import { TAnswerFeedback } from '@/types/api-types'
import OriginalAnswers from '@/Viewer/PageBlocks/OriginalAnswers/OriginalAnswers.vue'
import AnswerFeedback from '@/Viewer/PageBlocks/AnswerFeedback/AnswerFeedback.vue'

const $styles = useCssModule()
const props = defineProps<{
    options: Option[],
    answer?: RadioAnswer,
    isTeacher: boolean
}>()
const emit = defineEmits<{
    answer:[answer: string],
    saveFeedback: [fb: TAnswerFeedback]
}>()

const answerChecked = ref(false)
const checkedAnswerIndex = ref(-1)
const originalValue = ref('')
const isOriginalValueVisible = ref(false)

function saveFeedback(feedback: TAnswerFeedback) {
    emit('saveFeedback', feedback)
}

function alreadyAnsweredCallback(answer?: RadioAnswer) {
    if (answer) {
        checkedAnswerIndex.value = props.options.findIndex(({ value }) => answer.value === value)
        if (checkedAnswerIndex.value === -1) {
            isOriginalValueVisible.value = true
            originalValue.value = answer.value
        }
        answerChecked.value = true
    }
}

watch(() => props.answer, (answer) => {
    alreadyAnsweredCallback(answer)
})

function checkAnswer() {
    answerChecked.value = true
    emit('answer', props.options[checkedAnswerIndex.value].value)
}

function getOptionStyles(index: number) {
    if (index === checkedAnswerIndex.value) {
        return `${$styles.row} ${props.options[index].isCorrect ? $styles.correctRow : $styles.wrongRow}`
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
