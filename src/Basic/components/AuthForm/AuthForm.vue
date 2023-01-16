<template>
    <div :class="$style.formWrapper">
        <el-form
            v-if="mode === ModeEnum.auth"
            :class="$style.form"
        >
            Auth
            <el-form-item label="Email">
                <el-input
                    v-model="email"
                    autocomplete="email"
                />
            </el-form-item>
            <el-form-item label="Password">
                <el-input
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                />
            </el-form-item>
            <div :class="$style.footer">
                <el-button
                    type="primary"
                    @click="auth"
                >
                    Log in
                </el-button>
                <span>
                    new?
                    <el-button @click="changeMode(ModeEnum.register)">
                        register
                    </el-button>
                </span>
            </div>
        </el-form>

        <el-form
            v-if="mode === ModeEnum.register"
            :class="$style.form"
        >
            Register
            <el-form-item label="Name">
                <el-input
                    v-model="name"
                    autocomplete="username"
                />
            </el-form-item>
            <el-form-item label="Email">
                <el-input
                    v-model="email"
                    autocomplete="email"
                />
            </el-form-item>
            <el-form-item label="Password">
                <el-input
                    v-model="password"
                    type="password"
                    autocomplete="new-password"
                />
            </el-form-item>
            <div :class="$style.footer">
                <el-button
                    type="primary"
                    @click="register"
                >
                    Register
                </el-button>
                <span>
                    have an account?
                    <el-button @click="changeMode(ModeEnum.auth)">
                        auth
                    </el-button>
                </span>
            </div>
        </el-form>
    </div>
</template>
<script lang="ts">
import request from '@/utils/request'
import { defineComponent } from 'vue'
import { RouteLocationRaw } from 'vue-router'

enum Mode {
    'auth' = 'auth',
    'register' = 'register',
    'recovery' = 'recovery'
}

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            name: '',
            mode: Mode.auth as Mode,
            ModeEnum: Mode
        }
    },
    methods: {
        changeMode(newMode: Mode) {
            this.mode = Mode[newMode]
        },
        auth() {
            request('/api/auth', {
                method: 'post',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then(({ errors }) => {
                if (!errors.length) {
                    this.redirect()
                }
            })
        },
        register() {
            request('/api/register', {
                method: 'post',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                    name: this.name
                })
            }).then(({ errors }) => {
                if (!errors.length) {
                    this.redirect()
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
.form {
    width: 400px;
    border: 1px solid var(--el-border-color);
    padding: 20px;
}
.formWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.footer {
    display: flex;
    justify-content: space-between;
}
</style>
