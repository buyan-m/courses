<template>
    <el-form
        ref="form"
        :rules="answerRules"
        :model="answer"
        @submit.prevent="submit"
    >
        <el-form-item prop="text">
            <el-input
                v-model="answer.text"
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
    </el-form>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { FormInstance } from 'element-plus'
import { TTextAnswer } from '@/types/api/learning-responses'

const props = defineProps<{ answers: string[], answer?: TTextAnswer }>()
const emit = defineEmits(['answer'])
const answer = ref({ text: '' })
const inputClass = ref('')
const inputDisabled = ref(false)
const form = ref(null)

function checkAnswer(value: string) {
    if (props.answers.some((el) => el === value)) {
        return true
    }
    return false
}

function alreadyAnsweredCallback(alreadyAnsweredValue?: TTextAnswer) {
    if (alreadyAnsweredValue) {
        answer.value.text = alreadyAnsweredValue.value
        inputDisabled.value = true
    }
}

function submit() {
    // обдумать как сделать вариант без проверки для отправки сразу
    const formInstance = form.value! as FormInstance
    formInstance.validate((valid) => {
        if (valid) {
            emit('answer', answer.value.text)
            inputDisabled.value = true
        }
    })
}

const answerRules = ref({
    text: [{
        validator: (_:unknown, value: string) => checkAnswer(value),
        message: () => `${answer.value.text} is incorrect answer`,
        trigger: 'never'
    }]
})

watch(() => props.answer, (alreadyAnsweredValue) => {
    alreadyAnsweredCallback(alreadyAnsweredValue)
})
alreadyAnsweredCallback(props.answer)
</script>
