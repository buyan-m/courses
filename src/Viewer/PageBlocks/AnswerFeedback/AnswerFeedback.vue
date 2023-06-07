<template>
    <el-form
        v-if="isEditable"
        data-test="editableFeedback"
    >
        <el-form-item>
            <el-input
                v-model="innerFeedback"
                :class="$style.textarea"
                data-test="feedbackBlockInput"
                type="textarea"
            />
            <el-badge />
            <el-radio-group
                v-model="innerCorrectness"
                :class="$style.correctness"
            >
                <el-radio-button
                    :label="AnswerCorrectness.correct"
                    data-test="feedbackBlockPass"
                >
                    {{ markMap[AnswerCorrectness.correct] }}
                </el-radio-button>
                <el-radio-button
                    :label="AnswerCorrectness.incorrect"
                    data-test="feedbackBlockWrong"
                >
                    {{ markMap[AnswerCorrectness.incorrect] }}
                </el-radio-button>
            </el-radio-group>
            <el-button
                :class="$style.button"
                data-test="feedbackBlockSave"
                @click="saveFeedback"
            >
                {{ $t('save') }}
            </el-button>
        </el-form-item>
    </el-form>
    <p
        v-else
        data-test="feedback"
        :class="$style.feedback"
    >
        {{ mark }}
        <span
            v-if="answer.feedback"
            :class="$style.feedbackText"
            data-test="feedbackText"
        >
            {{ answer.feedback }}
        </span>
    </p>
</template>
<script lang="ts" setup>
import {
    defineEmits, defineProps, ref, watch, useCssModule
} from 'vue'
import { AnswerCorrectness, TAnswer, TAnswerFeedback } from '@/types/api-types'

const markMap = {
    [AnswerCorrectness.correct]: '✅',
    [AnswerCorrectness.incorrect]: '❌',
    [AnswerCorrectness['not-verified']]: '❔'
} as Record<AnswerCorrectness, string>

const props = defineProps<{
    answer: TAnswer,
    isEditable: boolean
}>()

const $style = useCssModule()

const emits = defineEmits<{ saveFeedback: [feedback: TAnswerFeedback] }>()
const innerFeedback = ref(props.answer.feedback || '')
const innerCorrectness = ref(props.answer.correctness || AnswerCorrectness['not-verified'])
const mark = ref(markMap[props.answer.correctness])

watch(() => props.answer.feedback, (val) => {
    innerFeedback.value = val || ''
})

watch(() => props.answer.correctness, (val) => {
    mark.value = markMap[val]
})

function saveFeedback() {
    emits('saveFeedback', {
        feedback: innerFeedback.value,
        correctness: innerCorrectness.value
    })
}

</script>
<i18n>
{
    "en": {
        "save": "save"
    }
}
</i18n>
<style module>
.textarea {
    flex: 1 1 0;
    margin-right: 20px;
}

.button {
    align-self: end;
}

.feedback {
    font-size: var(--el-font-size-small);
    background-color: var(--el-color-info-light-7);
    padding: 5px;
}

.feedbackText {
    font-style: italic;
}

.correctness {
    align-self: end;
    margin-right: 20px;
}
</style>
