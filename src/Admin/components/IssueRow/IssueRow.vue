<template>
    <div :class="$style.item">
        <p :class="$style.info">
            <span>{{ issue.user.name }}</span>
            <span :class="{[$style.suspicious]: !issue.emailIsCorrect}">
                {{ issue.writtenEmail }}
            </span>
            <template v-if="!issue.emailIsCorrect || issue.gotEmail !== issue.writtenEmail">
                ({{ issue.gotEmail }})
            </template>

            <span :class="$style.url">{{ issue.url }}</span>
            <span>{{ preparedDate }}</span>
        </p>
        <p :class="$style.text">
            {{ issue.issueText }}
        </p>
    </div>
</template>
<script lang="ts" setup>
import type { AdminIssuesResponse } from '@/types/api-types'
import { useCssModule } from 'vue'

const props = defineProps<{ issue: AdminIssuesResponse['items'][0] }>()
const $style = useCssModule()
function prepareDate(cdate: string) {
    const date = new Date(cdate)
    return `${date.toLocaleString()}`
}
const preparedDate = prepareDate(props.issue.cdate)

</script>
<style module>
    .suspicious {
        color: var(--el-color-danger);
    }
    .item {
        border-bottom: var(--el-border);
        list-style: none;
    }
    .info {
        margin-bottom: 0;
        font-size: 14px;
        color: var(--el-color-info);
        display: flex;
        white-space: nowrap;
        flex-wrap: wrap;
        gap: 10px;
    }
    .text {
        margin-top: 0;
    }
    .url {
        color: var(--el-color-primary);
    }
</style>
