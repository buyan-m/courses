<template>
    <el-form>
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
    </el-form>
</template>
<script lang="ts" setup>
import {
    defineProps, defineEmits, ref, useCssModule
} from 'vue'
import type { TOption } from '@/types/api/exercises'

const $styles = useCssModule()
const answerChecked = ref(false)
const checkedAnswerIndex = ref(-1)
const props = defineProps<{ options: TOption[] }>()
const emit = defineEmits(['answer'])

function checkAnswer() {
    answerChecked.value = true
    emit('answer')
}

function getOptionStyles(index: number) {
    if (index === checkedAnswerIndex.value) {
        return `${$styles.row} ${props.options[index].isCorrect ? $styles.correctRow : $styles.wrongRow}`
    }
    return $styles.row
}
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
