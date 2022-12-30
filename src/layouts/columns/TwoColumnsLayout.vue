<template>
    <div :class="$style.layout">
        <aside :class="`${$style.paper} ${$style.sidebar}`">
            <slot name="secondary" />
        </aside>

        <section :class="`${$style.paper} ${$style.container}`">
            <slot name="primary" />
        </section>
    </div>
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
}
.layout {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
}
.sidebar {
    flex: 0 0 200px;
}
.container {
    flex: 1 1 100%;
}
</style>
