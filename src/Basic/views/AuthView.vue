<template>
    <div :class="$style.formWrapper">
        <OkulLogo :class="$style.logo" />
        <AuthForm
            v-if="mode === ModeEnum.auth"
            :errors="authErrors"
            @change-mode="changeMode"
            @auth="auth"
        />
        <RegisterForm
            v-if="mode === ModeEnum.register"
            :errors="registerErrors"
            @change-mode="changeMode"
            @register="register"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AuthForm from '@/Basic/components/AuthForm/AuthForm.vue'
import request from '@/utils/request'
import RegisterForm from '@/Basic/components/RegisterForm/RegisterForm.vue'
import { RouteLocationRaw } from 'vue-router'
import OkulLogo from '@/components/OkulLogo/OkulLogo.vue'

enum Mode {
    'auth' = 'auth',
    'register' = 'register',
    'recovery' = 'recovery'
}

export default defineComponent({
    components: { OkulLogo, RegisterForm, AuthForm },
    data() {
        return {
            mode: Mode.auth as Mode,
            ModeEnum: Mode,
            registerErrors: [] as string[],
            authErrors: [] as string[]
        }
    },
    created() {
        request('/api/auth-check').then(({ errors }) => {
            if (!errors.length) {
                this.$router.push({ name: 'main' })
            }
        })
    },
    methods: {
        changeMode(newMode: Mode) {
            this.mode = Mode[newMode]
        },
        auth({ email, password }: { email: string, password: string }) {
            request('/api/auth', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(({ errors }) => {
                if (!errors.length) {
                    this.redirect()
                } else {
                    this.authErrors = errors
                }
            })
        },
        register({ name, email, password }: { email: string, password: string, name: string }) {
            request('/api/register', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            }).then(({ errors }) => {
                if (!errors.length) {
                    this.redirect()
                } else {
                    this.registerErrors = errors
                }
            })
        },
        redirect() {
            const to = this.$route.query.redirect as RouteLocationRaw || { name: 'main' }
            this.$router.push(to)
        }
    }
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
</style>
