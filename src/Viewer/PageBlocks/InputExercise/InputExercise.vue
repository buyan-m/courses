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
        <AnswerFeedback
            v-if="props.answer"
            :answer="props.answer"
            :is-editable="isTeacher"
            @save-feedback="saveFeedback"
        />
    </el-form>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { FormInstance } from 'element-plus'
import type { TextAnswer } from '@/types/api-types'
import { TAnswerFeedback } from '@/types/api-types'
import AnswerFeedback from '@/Viewer/PageBlocks/AnswerFeedback/AnswerFeedback.vue'

const props = defineProps<{
    answers: string[],
    answer?: TextAnswer,
    isTeacher: boolean
}>()

const emit = defineEmits<{
    answer: [text: string],
    saveFeedback: [fb: TAnswerFeedback]
}>()

const innerAnswer = ref({ text: '' })
const inputClass = ref('')
const inputDisabled = ref(false)
const form = ref(null)

function saveFeedback(feedback: TAnswerFeedback) {
    emit('saveFeedback', feedback)
}

function checkAnswer(value: string) {
    if (props.answers.some((el) => el === value)) {
        return true
    }
    return false
}

function alreadyAnsweredCallback(alreadyAnsweredValue?: TextAnswer) {
    if (alreadyAnsweredValue) {
        innerAnswer.value.text = alreadyAnsweredValue.value
        inputDisabled.value = true
    }
}

function submit() {
    // обдумать как сделать вариант без проверки для отправки сразу
    const formInstance = form.value! as FormInstance
    formInstance.validate((valid) => {
        if (valid) {
            emit('answer', innerAnswer.value.text)
            inputDisabled.value = true
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
