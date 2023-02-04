<template>
    <div :class="$style.card">
        <p v-html="text" />
    </div>
</template>
<script lang="ts">
export default {
    props: {
        text: {
            required: true,
            type: String
        }
    }
}
</script>
<style module>
.card {
    padding: 10px 20px;
    background-color: var(--el-color-primary-light-9);
    border-radius: var(--el-border-radius-base);
    border-left: 5px solid var(--el-color-primary);
    margin: 20px 0;
}
</style>
