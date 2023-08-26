<template>
    <el-form
        ref="form"
        :rules="answerRules"
        :model="innerAnswer"
        data-test="inputExercise"
        @submit.prevent="submit"
    >
        <el-form-item prop="text">
            <el-input
                v-model="innerAnswer.text"
                :class="inputClass"
                :disabled="inputDisabled"
            >
                <template #append>
                    <el-button
                        @click="submit"
                    >
                        ✅
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
        <p
            v-if="visibleAnswer"
            :class="$style.visibleAnswer"
        >
            {{ $t('your-answer') }} "{{ visibleAnswer }}"
        </p>
        <AnswerFeedback
            v-if="props.answer"
            :answer="props.answer"
            :auto-correctness="autoCorrectness"
            :is-editable="isTeacher"
            @save-feedback="saveFeedback"
        />
    </el-form>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { FormInstance } from 'element-plus'
import type { TextAnswer } from '@/types/api-types'
import { AnswerCorrectness, AnswerTypes, TAnswerFeedback } from '@/types/api-types'
import AnswerFeedback from '@/Viewer/PageBlocks/AnswerFeedback/AnswerFeedback.vue'

const props = defineProps<{
    answers?: string[],
    answer?: TextAnswer,
    isTeacher: boolean
}>()

const emit = defineEmits<{
    answer: [text: TextAnswer],
    saveFeedback: [fb: TAnswerFeedback]
}>()

const innerAnswer = ref({ text: '' })
const inputClass = ref('')
const inputDisabled = ref(false)
const form = ref(null)
const visibleAnswer = ref('')
const autoCorrectness = ref(AnswerCorrectness['not-verified'])

function saveFeedback(feedback: TAnswerFeedback) {
    emit('saveFeedback', feedback)
}

function checkAnswer(value: string) {
    if (!props.answers || !props.answers.length) {
        visibleAnswer.value = value
        return true
    }
    if (props.answers.some((el) => el === value)) {
        return true
    }
    return false
}

function alreadyAnsweredCallback(alreadyAnsweredValue?: TextAnswer) {
    if (alreadyAnsweredValue) {
        innerAnswer.value.text = alreadyAnsweredValue.value
        inputDisabled.value = true
        autoCorrectness.value = props.answers?.some(
            (text: string) => text === alreadyAnsweredValue.value
        ) ? AnswerCorrectness.correct : AnswerCorrectness.incorrect
    }
}

function submit() {
    const formInstance = form.value! as FormInstance
    formInstance.validate((valid) => {
        if (valid) {
            emit('answer', {
                type: AnswerTypes.input,
                value: innerAnswer.value.text,
                correctness: props.answers?.length ? AnswerCorrectness.correct : AnswerCorrectness['not-verified'],
                feedback: ''
            })
            inputDisabled.value = !!props.answers?.length
        }
    })
}

const answerRules = ref({
    text: [{
        validator: (_:unknown, value: string) => checkAnswer(value),
        message: () => `${innerAnswer.value.text} is incorrect answer`,
        trigger: 'never'
    }]
})

watch(() => props.answer, (alreadyAnsweredValue) => {
    alreadyAnsweredCallback(alreadyAnsweredValue)
})
alreadyAnsweredCallback(props.answer)
</script>
<i18n>
    {
        "en": {
            "your-answer": "Your answer: "
        }
    }
</i18n>
<style module>
.visibleAnswer {
    font-size: var(--el-font-size-small);
    color: var(--el-color-info)
}
</style>
