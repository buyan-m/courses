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
    </el-form>
</template>
<script lang="ts" setup>
import { defineProps, ref, useCssModule } from 'vue'
import type { TOption } from '@/types/api/page-content'

const $styles = useCssModule()
const props = defineProps<{ options: TOption[] }>()
const emit = defineEmits(['answer'])
const innerOptions = ref(props.options.map((el) => ({
    checked: false,
    ...el
})))

function checkAnswer() {
    if (innerOptions.value.some((el) => !el.checked && el.isCorrect)) {
        return
    }
    emit('answer')
}

function getOptionStyles(option) {
    if (option.checked) {
        return `${$styles.row} ${option.isCorrect ? $styles.correctRow : $styles.wrongRow}`
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
