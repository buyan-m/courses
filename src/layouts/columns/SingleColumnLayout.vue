<template>
    <section :class="$style.paper">
        <slot />
    </section>
</template>
<script lang="ts">
export default {

}
</script>
<style module>
.paper {
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
    padding: 20px;
    margin-top: 20px;
}
</style>
