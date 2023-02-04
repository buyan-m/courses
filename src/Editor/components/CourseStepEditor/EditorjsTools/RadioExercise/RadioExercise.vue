<template>
    <el-form
        :class="$style.form"
        @submit.prevent
    >
        <el-radio-group
            v-model="radioCheck"
            :class="$style.radioGroup"
        >
            <el-form-item
                v-for="(option, index) in innerOptions"
                :key="index"
                :class="$style.row"
            >
                <el-input
                    v-model="option.value"
                    type="text"
                    placeholder="option"
                >
                    <template #prefix>
                        <el-radio :label="index">
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
        </el-radio-group>
        <el-button @click.prevent="addOption">
            +
        </el-button>
    </el-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { TOption } from '@/types/api/page-content'

export default defineComponent({
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            innerOptions: [] as TOption[],
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
    created() {
        this.innerOptions = [...this.options] as TOption[]
        this.radioCheck = this.innerOptions.findIndex((el: TOption) => el.isCorrect)
    },
    methods: {
        addOption() {
            this.innerOptions.push({
                value: '',
                isCorrect: false
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

.radioGroup {
    width: 100%
}
</style>
