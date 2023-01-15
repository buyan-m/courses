<template>
    <AuthForm />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AuthForm from '@/Basic/components/AuthForm/AuthForm.vue'
import request from '@/utils/request'

export default defineComponent({
    components: { AuthForm },
    created() {
        request('/api/auth-check').then(({ errors }) => {
            if (!errors.length) {
                this.$router.push({ name: 'main' })
            }
        })
    }
})
</script>
