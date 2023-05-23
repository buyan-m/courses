<template>
    <EditorBasicLayout
        :warning="guestWarning"
    >
        <router-view />
    </EditorBasicLayout>
</template>
<script lang="ts">
import EditorBasicLayout from '@/Editor/layouts/EditorBasicLayout.vue'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { AuthCheckResponse } from '@/types/api-types'
import { Roles } from '@/types/api-types'

export default defineComponent({
    components: {
        EditorBasicLayout
    },
    data() {
        return {
            guestWarning: ''
        }
    },
    created() {
        request<AuthCheckResponse>('/api/auth-check').then(({ data }) => {
            if (data && data.roles.some((role) => role === Roles.guest)) {
                this.guestWarning = this.$t('guest-warn')
            }
        })
    }
})
</script>
<i18n>
{
    "en": {
        "guest-warn": "Your email wasn't approved.\nYou can't create courses now"
    },
    "ru": {
        "guest-warn": "Ваш email не был подтвержден.\nВы пока не можете создавать курсы"
    }
}
</i18n>
