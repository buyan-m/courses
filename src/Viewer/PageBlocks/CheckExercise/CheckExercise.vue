<template>
    <el-form>
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
import type { TOption } from '@/types/api/page-content'
import { TCheckAnswer } from '@/types/api/learning-responses'
import OriginalAnswers from '@/Viewer/PageBlocks/OriginalAnswers/OriginalAnswers.vue'

const $styles = useCssModule()
const props = defineProps<{ options: TOption[], answer?: TCheckAnswer }>()
const emit = defineEmits(['answer'])
const innerOptions = ref(props.options.map((el) => ({
    checked: false,
    ...el
})))
const originalAnswers = ref([] as string[])

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

function alreadyAnsweredCallback(alreadyAnsweredValue?: TCheckAnswer) {
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

function getOptionStyles(option: TOption & { checked: boolean }) {
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
