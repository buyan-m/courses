<template>
    <BaseHeader
        :warning="warning"
    />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseHeader from '@/components/BaseHeader/BaseHeader.vue'

export default defineComponent({
    components: { BaseHeader },
    props: {
        warning: {
            type: String,
            default: ''
        }
    }
})
</script>
