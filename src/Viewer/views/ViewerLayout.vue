<template>
    <EditorBasicLayout>
        <router-view />
    </EditorBasicLayout>
</template>
<script lang="ts">
import EditorBasicLayout from '@/Viewer/layouts/ViewerLayout.vue'

export default {
    components: {
        EditorBasicLayout
    }
}
</script>
