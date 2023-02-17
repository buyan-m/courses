<template>
    <ViewerBasicLayout>
        <router-view />
    </ViewerBasicLayout>
</template>
<script lang="ts">
import ViewerBasicLayout from '@/Viewer/layouts/ViewerLayout.vue'

export default {
    components: {
        ViewerBasicLayout
    }
}
</script>
