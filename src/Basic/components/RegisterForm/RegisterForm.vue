<template>
    <el-form
        ref="formRef"
        :model="registerForm"
        :rules="registerFormValidationRules"
        :class="$style.form"
        hide-required-asterisk
    >
        <h3 :class="$style.heading">
            Register
        </h3>
        <el-form-item
            label="Name"
            prop="name"
            data-test="auth.nameRow"
        >
            <el-input
                v-model="registerForm.name"
                data-test="auth.name"
                autocomplete="username"
            />
        </el-form-item>
        <el-form-item
            label="Email"
            prop="email"
            data-test="auth.emailRow"
        >
            <el-input
                v-model="registerForm.email"
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
                v-model="registerForm.password"
                type="password"
                data-test="auth.password"
                autocomplete="new-password"
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
                data-test="auth.register"
                @click="register"
            >
                Register
            </el-button>
            <span>
                <el-button
                    data-test="auth.switchToAuth"
                    @click="changeMode"
                >
                    Log in
                </el-button>
            </span>
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
        register: (credentials: { email: string, password: string, name: string }) => true
    },

    data() {
        return {
            registerForm: {
                email: '',
                password: '',
                name: ''
            },
            formUntouched: true,
            registerFormValidationRules: {
                email: [...authValidationRules.email],
                password: [...authValidationRules.password],
                name: [...authValidationRules.name]
            }
        }
    },
    watch: {
        errors() {
            this.formUntouched = true
        },
        registerForm: {
            handler() {
                this.formUntouched = false
            },
            deep: true
        }
    },
    methods: {
        register() {
            const ref = this.$refs.formRef as FormInstance
            ref.validate((valid) => {
                if (valid) {
                    this.$emit('register', {
                        email: this.registerForm.email,
                        password: this.registerForm.password,
                        name: this.registerForm.name
                    })
                }
            })
        },
        changeMode() {
            this.$emit('changeMode', 'auth')
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
