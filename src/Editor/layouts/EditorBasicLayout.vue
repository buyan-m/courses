<template>
    <div :class="$style.background">
        <EditorHeader />
        <div :class="$style.container">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import EditorHeader from '@/Editor/components/EditorHeader/EditorHeader.vue'

export default {
    components: { EditorHeader }
}
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
