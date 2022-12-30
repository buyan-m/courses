<template>
    <el-form :class="$style.form">
        <div :class="$style.answers">
            <el-tag
                v-for="(answer, index) in correctAnswers"
                :key="index"
                closable
                @close="removeOption(index)"
            >
                {{ answer }}
            </el-tag>
            <el-button
                v-if="!inputVisible"
                class="button-new-tag ml-1"
                size="small"
                @click="showInput"
            >
                + Answer
            </el-button>
        </div>
        <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            :class="$style.input"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        />
    </el-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        answers: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            correctAnswers: [] as string[],
            inputValue: '',
            inputVisible: false
        }
    },
    created() {
        this.correctAnswers = [...this.answers] as string[]
    },
    methods: {
        removeOption(index: number) {
            this.correctAnswers.splice(index, 1)
        },
        handleInputConfirm() {
            if (this.inputValue) {
                this.correctAnswers.push(this.inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                (this.$refs.InputRef as HTMLElement).focus()
            })
        }
    }
})
</script>
<style module>
.form {
    border: 1px solid var(--el-border-color);
    padding: 20px;
}

.answers {
    display: flex;
    gap: 10px;
}
.input {
    margin-top: 10px;
}
</style>
