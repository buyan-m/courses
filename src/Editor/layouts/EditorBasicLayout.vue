<template>
    <div :class="$style.background">
        <EditorHeader
            :warning="warning"
        />
        <div :class="$style.container">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EditorHeader from '@/Editor/components/EditorHeader/EditorHeader.vue'

export default defineComponent({
    components: { EditorHeader },
    props: {
        warning: {
            type: String,
            default: ''
        }
    }
})
</script>
<style module>
.container {
    max-width: 1200px;
    margin: 0 auto;
}
.background {
    background: var(--el-bg-color-page);
    min-height: 100%;
}
</style>
