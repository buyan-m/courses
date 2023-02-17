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
import type { TAuthCheckResponse } from '@/types/api/editor-responses'
import { Role } from '@/constants/Role'

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
        request<TAuthCheckResponse>('/api/auth-check').then(({ data }) => {
            if (data && data.roles.some((role) => role === Role.guest)) {
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
