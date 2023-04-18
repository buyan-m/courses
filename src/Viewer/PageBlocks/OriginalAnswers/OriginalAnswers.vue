<template>
    <p :class="$style.originalAnswers">
        {{ $t('test-was-modified') }}
        <span
            v-for="answer in originalAnswers"
            :key="answer"
            :class="$style.originalAnswersItem"
        >
            {{ answer }}
        </span>
    </p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        originalAnswers: {
            type: Array
        }
    }
})
</script>
<i18n>
{
    "en": {
        "test-was-modified": "Seems like the test was modified after the answers had been received. There are original answers:"
    }
}
</i18n>
<style module>
.originalAnswers {
    margin-top: 0;
    font-size: var(--el-font-size-small);
    color: var(--el-text-color-secondary);
    font-style: italic;
}

.originalAnswersItem {
    padding-left: 5px;
    padding-right: 5px;
    font-weight: 600;
}
</style>
