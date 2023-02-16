<template>
    <el-form
        ref="formRef"
        :model="authForm"
        :class="$style.form"
        :rules="authFormValidationRules"
        hide-required-asterisk
    >
        <h3 :class="$style.heading">
            Auth
        </h3>
        <el-form-item
            label="Email"
            prop="email"
            data-test="auth.emailRow"
        >
            <el-input
                v-model="authForm.email"
                type="email"
                autocomplete="email"
                data-test="auth.email"
            />
        </el-form-item>
        <el-form-item
            label="Password"
            prop="password"
            data-test="auth.passwordRow"
        >
            <el-input
                v-model="authForm.password"
                type="password"
                data-test="auth.password"
                autocomplete="current-password"
                @keydown.enter="auth"
            />
        </el-form-item>
        <div :class="$style.footer">
            <span
                v-if="errors.length && formUntouched"
                :class="$style.formError"
                data-test="auth.apiError"
            >
                {{ errors[0] }}
            </span>
            <el-button
                v-else
                type="primary"
                data-test="auth.login"
                @click="auth"
            >
                Log in
            </el-button>
            <el-button
                data-test="auth.switchToRegister"
                @click="changeMode(register)"
            >
                Register
            </el-button>
        </div>
    </el-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { FormInstance } from 'element-plus'
import authValidationRules from '@/constants/AuthValidationRules'

export default defineComponent({
    props: {
        errors: {
            type: Object,
            default: () => [] as string[]
        }
    },
    emits: {
        changeMode: (mode: string) => true,
        auth: (credentials: { email: string, password: string }) => true
    },
    data() {
        return {
            authForm: {
                email: '',
                password: ''
            },
            formUntouched: true,
            authFormValidationRules: {
                email: [...authValidationRules.email],
                password: [...authValidationRules.password]
            }
        }
    },
    watch: {
        errors() {
            this.formUntouched = true
        },
        authForm: {
            handler() {
                this.formUntouched = false
            },
            deep: true
        }
    },
    methods: {
        auth() {
            const ref = this.$refs.formRef as FormInstance
            ref.validate((valid) => {
                if (valid) {
                    this.$emit('auth', {
                        email: this.authForm.email,
                        password: this.authForm.password
                    })
                }
            })
        },
        changeMode() {
            this.$emit('changeMode', 'register')
        }
    }
})
</script>
<style module>
.form {
    width: 400px;
    border: 1px solid var(--el-border-color);
    padding: 20px;
}
.footer {
    display: flex;
    justify-content: space-between;
}
.formError {
    color: var(--el-color-danger);
    font-size: 12px;
    line-height: 1;
    padding-bottom: 10px;
    display: block;
    height: 22px;
}
.heading {
    padding-bottom: 10px;
}
</style>
