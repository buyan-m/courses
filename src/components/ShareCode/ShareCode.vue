<template>
    <div>
        <p :class="$style.description">
            {{ $t('description') }}
        </p>
        <p
            :class="$style.textField"
            disabled
            @click="copyToClipboard"
        >
            <span data-test="shareMenuField">
                {{ code }}
            </span>
            <el-button
                :class="$style.button"
                @click.prevent
            >
                <el-icon><CopyDocument /></el-icon>
            </el-button>
        </p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { ShareCodeDTO } from '@/types/api-types'

export default defineComponent({
    components: {
        CopyDocument
    },
    emits: ['success'],
    data: () => ({
        code: ''
    }),
    mounted() {
        this.getCode()
    },
    methods: {
        getCode() {
            request<ShareCodeDTO>('/api/share-code').then(({ data, errors }) => {
                if (!errors.length && data) {
                    this.code = data._id
                }
            })
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.code).then(() => {
                ElMessage({
                    message: this.$t('success'),
                    type: 'success'
                })
                this.$emit('success')
            }, (error) => {
                ElMessage({
                    message: `Error: ${error}`,
                    type: 'error'
                })
            })
        }
    }
})
</script>
<style module>
.textField {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 10px;

    background-color: var(--el-fill-color-light);
    color: var(--el-color-info);
    border-radius: var(--el-border-radius-base);
    border: var(--el-border);
    margin-top: 0;
}
.button {
    border: 0;
}

.description {
    margin-bottom: 0;
    margin-top: 20px;
}
</style>
<i18n>
{
    "en": {
        "description": "Share this code with your teacher to give them access to your results",
        "success": "Copied to your clipboard😉"
    }
}
</i18n>
