<template>
    <EditorBasicLayout>
        <router-view />
    </EditorBasicLayout>
</template>
<script lang="ts">
import EditorBasicLayout from '@/Editor/layouts/EditorBasicLayout.vue'

export default {
    components: {
        EditorBasicLayout
    }
}
</script>
