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
                    @click="sendInvite"
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
    props: {
        onSendInvite: {
            type: Function,
            required: true
        }
    },
    data: () => ({
        studentCode: ''
    }),
    methods: {
        sendInvite() {
            this.onSendInvite(this.studentCode)
                .then((result: boolean) => {
                    if (result) this.studentCode = ''
                })
        }
    }
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
