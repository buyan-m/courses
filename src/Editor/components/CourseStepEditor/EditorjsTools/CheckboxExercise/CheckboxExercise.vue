<template>
    <el-form
        :class="$style.form"
        @submit.prevent
    >
        <el-form-item
            v-for="(option, index) in innerOptions"
            :key="index"
            :class="$style.row"
        >
            <el-input
                ref="input"
                v-model="option.value"
                type="text"
                :placeholder="$t('option')"
                @keydown.delete.stop
                @keydown.enter.stop.prevent="addOption"
                @keyup.enter.stop.prevent
            >
                <template #prefix>
                    <el-checkbox v-model="option.isCorrect">
                        <template />
                    </el-checkbox>
                </template>
                <template #append>
                    <el-button @click="removeOption(index)">
                        x
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-button @click.prevent="addOption">
            +
        </el-button>
    </el-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { TOption } from './CheckboxExerciseTool'

export default defineComponent({
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            innerOptions: [] as TOption[]
        }
    },
    created() {
        this.innerOptions = (this.options as TOption[]).map((el, index) => ({ ...el }))
    },
    methods: {
        addOption() {
            this.innerOptions.push({
                value: '',
                isCorrect: false
            })
            this.$nextTick().then(() => this.$nextTick()).then(() => {
                const inputs = this.$refs.input as HTMLInputElement[]
                if (inputs.length) {
                    inputs[inputs.length - 1].focus()
                }
            })
        },
        removeOption(index: number) {
            this.innerOptions.splice(index, 1)
        }
    }
})
</script>
<style module>
.form {
    border: 1px solid var(--el-border-color);
    padding: 20px;
}

.row {
    width: 100%
}
</style>
<i18n>
{
    "en":  {
        "option": "Option"
    },
    "ru": {
        "option": "Вариант"
    }
}
</i18n>
