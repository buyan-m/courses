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
import { defineProps, ref } from 'vue'
import { FormInstance } from 'element-plus'

const props = defineProps<{ answers: string[] }>()
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
function submit() {
    const formInstance = form.value! as FormInstance
    formInstance.validate((valid) => {
        if (valid) {
            emit('answer')
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

</script>
