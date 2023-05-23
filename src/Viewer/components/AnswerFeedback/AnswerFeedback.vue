<template>
    <div>
        <el-form v-if="isUserTeacher">
            <el-form-item>
                <el-input
                    v-model="feedbackTextarea"
                    type="textarea"
                />
                <el-button>{{ $t('save') }}</el-button>
            </el-form-item>
        </el-form>

        <p v-else>
            {{ mark }}
            {{ props.answer.feedback }}
        </p>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { AnswerCorrectness } from '@/types/api-types'
import type { AnswerFeedback } from '@/types/api-types'

const markMap = {
    [AnswerCorrectness.correct]: '✅',
    [AnswerCorrectness.incorrect]: '❌',
    [AnswerCorrectness['not-verified']]: '❔'
} as Record<AnswerCorrectness, string>

const props = defineProps<{ answer: AnswerFeedback }>()

const feedbackTextarea = ref('')

function isUserTeacher(): boolean {
    return false
}

function mark(): string {
    return markMap[props.answer.correctness]
}

</script>
<i18n>
{
    "en": {
        "save": "save"
    }
}
</i18n>
