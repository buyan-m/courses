<template>
    <el-form data-test="inviteForm">
        <p :class="$style.description">
            {{ $t('invite') }}
        </p>
        <el-input
            v-model="studentCode"
            data-test="inviteForm.input"
        >
            <template #append>
                <el-button
                    data-test="inviteForm.submit"
                    @click="$emit('sendInvite', studentCode)"
                >
                    📧
                </el-button>
            </template>
        </el-input>
    </el-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['sendInvite'],
    data: () => ({
        studentCode: ''
    })
})
</script>
<style module>
.description {
    margin-top: 0;
    margin-bottom: 0;
    font-size: var(--el-font-size-small);
}
</style>
<i18n>
{
    "en": {
        "invite": "Invite a student by their share code"
    }
}
</i18n>
