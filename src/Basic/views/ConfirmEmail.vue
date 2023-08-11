<template>
    <div :class="$style.formWrapper">
        <OkulLogo :class="$style.logo" />
        <div :class="$style.container" v-loading="pageState === PageStatus.loading">
            <p>email: {{ email }}</p>
            <p>{{$t('code-invalid')}}</p>
            <ElButton
                @click="sendAnotherEmail"
                :disabled="buttonDisabled"
            >
                {{ $t('send-another') }}
            </ElButton>
        </div>
    </div>
</template>
<script>
import { PageStatus } from '@/constants/PageStatus';
import request from '@/utils/request';
import { ElButton } from 'element-plus';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            pageState: PageStatus.loading,
            PageStatus: PageStatus,
            email: '',
            buttonDisabled: false
        };
    },
    created() {
        const { email, code } = this.$route.query;
        if (!email || !code) {
            this.pageState = PageStatus.error;
        } else {
            this.email = email
            request('/api/email-confirm', {
                method: 'put',
                body: JSON.stringify({ code, email })
            }).then(({ data, errors }) => {
                if (data && !errors.length) {
                    this.pageState = PageStatus.ready;
                    this.$router.push({
                        name: 'viewer-home'
                    });
                }
                else {
                    this.pageState = PageStatus.error;
                }
            });
        }
    },
    methods: {
        sendAnotherEmail() {
            request('/api/request-email-confirm', {method: 'post', body: JSON.stringify({email: this.$route.query.email})})
            this.buttonDisabled = true
            setTimeout(() => {this.buttonDisabled = false}, 60 * 1000)
        }
    },
    components: { ElButton }
})
</script>
<style module>
.formWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.logo {
    fill: var(--el-text-color-regular);
    width: 100px;
    height: auto;
    margin-bottom: 40px;
}
.container {
    width: 400px;
    height: 200px;
    border: 1px solid var(--el-border-color);
    padding: 20px;
    color: var(--el-color-error)
}
</style>
<i18n>
    {
        "en": {
            "code-invalid": "We can't approve your email. Try to get another confirmation email.",
            "send-another": "Send a confirmation email"
        }
    }
</i18n>