<template>
    <el-form
        :class="$style.form"
        data-test="radioExercise"
        @submit.prevent
    >
        <el-form-item
            v-for="(option, index) in innerOptions"
            :key="option"
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
                    <el-radio
                        v-model="radioCheck"
                        :label="index"
                    >
                        <template />
                    </el-radio>
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
import type { Option } from '@/types/api-types'

export default defineComponent({
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            innerOptions: [] as Option[],
            radioCheck: -1
        }
    },
    watch: {
        radioCheck(nVal, oVal) {
            if (this.innerOptions[oVal]) {
                this.innerOptions[oVal].isCorrect = false
            }
            if (this.innerOptions[nVal]) {
                this.innerOptions[nVal].isCorrect = true
            }
        }
    },
    mounted() {
        this.innerOptions = (this.options as Option[]).map((el) => ({ ...el }))
        this.radioCheck = this.innerOptions.findIndex((el: Option) => el.isCorrect)
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
            if (this.innerOptions[index].isCorrect) {
                this.radioCheck = -1
            }
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

.radioGroup {
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
