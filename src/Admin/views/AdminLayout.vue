<template>
    <AdminBasicLayout>
        <router-view />
    </AdminBasicLayout>
</template>
<script lang="ts">
import AdminBasicLayout from '@/Admin/layouts/AdminLayout.vue'

export default {
    components: {
        AdminBasicLayout
    }
}
</script>
