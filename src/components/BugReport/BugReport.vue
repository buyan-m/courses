<template>
    <button
        :class="$style.button"
        type="button"
        @click="open"
    >
        🐞
    </button>
    <section
        v-if="opened"
        :class="$style.form"
    >
        <h4>
            {{ $t('report-heading') }}
        </h4>
        <el-button
            :class="$style.close"
            link
            @click="close"
        >
            <el-icon>
                <CloseBold />
            </el-icon>
        </el-button>
        <p :class="$style.label">
            {{ $t('your-email') }}
        </p>
        <el-input
            v-model="reporterEmail"
            type="email"
            :placeholder="$t('email')"
        />
        <p :class="$style.label">
            {{ $t('your-report') }}
        </p>
        <el-input
            v-model="report"
            :placeholder="$t('describe')"
            type="textarea"
            rows="9"
        />
        <el-button
            :class="$style.sendButton"
            type="primary"
            :loading="sending"
            @click="send"
        >
            {{ $t('send') }}
        </el-button>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/common-store/user'
import request from '@/utils/request'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
    components: {
        CloseBold
    },
    data: () => ({
        opened: false,
        reporterEmail: '',
        report: '',
        sending: false
    }),

    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        close() {
            this.opened = false
        },

        open() {
            this.opened = true
            this.userStore.getCurrentUser()
        },

        send() {
            this.sending = true
            request('/api/issue-report', {
                method: 'put',
                body: JSON.stringify({
                    email: this.reporterEmail,
                    actualEmail: this.userStore.userInfo.email,
                    report: this.report,
                    url: this.$route.fullPath
                })
            }).then(({ errors }) => {
                this.sending = false
                if (!errors.length) {
                    this.opened = false
                } else {
                    ElMessageBox.alert(
                        errors[0],
                        this.$t('error'),
                        { confirmButtonText: this.$t('close') }
                    )
                }
            })
        }
    }
})
</script>
<style module>
.button {
    position: fixed;
    bottom: 0;
    right: 0;
    border: var(--el-border);
    padding: 5px;
    background: #fff;
}
.form {
    width: 300px;
    position: fixed;
    height: 400px;
    bottom: 0;
    right: 0;
    background: #fff;
    padding: 20px;
    border: var(--el-border);
}

.close {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
}

.label {
    margin-bottom: 5px;
    margin-top: 5px;
}

.sendButton {
    margin-top: 10px;
    width: 100%;
}
</style>
<i18n>
    {
        "en": {
            "email": "Email",
            "describe": "Please, provide us the comprehensive description what you have experienced. It will help us to find exact problem and fix it.",
            "report-heading": "Report an issue",
            "your-report": "Your report",
            "your-email": "Your email",
            "send": "Send the issue",
            "error": "An error occured while sending the issue"
        }
    }
</i18n>
