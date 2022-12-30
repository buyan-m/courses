<template>
    <div :class="$style.background">
        <BaseHeader />
        <div :class="$style.container">
            <slot />
        </div>
    </div>
</template>
<script lang="ts">
import BaseHeader from '@/components/BaseHeader/BaseHeader.vue'

export default {
    components: { BaseHeader }
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
