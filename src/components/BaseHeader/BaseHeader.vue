<template>
    <el-menu
        :class="$style.menu"
        mode="horizontal"
    >
        <el-menu-item index="1">
            <router-link :to="{name: 'main'}">
                <OkulLogo :class="$style.logo" />
            </router-link>
        </el-menu-item>
        <el-menu-item
            index="2"
            :class="$style.item"
        >
            <router-link :to="{name: 'viewer-home'}">
                {{ $t('courses') }}
            </router-link>
        </el-menu-item>
        <el-menu-item
            index="3"
            :class="$style.item"
        >
            <router-link :to="{name: 'editor-home'}">
                {{ $t('editor') }}
            </router-link>
        </el-menu-item>
        <div :class="$style.spacer" />
        <div
            v-if="warning"
            :class="$style.warning"
        >
            {{ warning }}
        </div>
        <el-menu-item
            index="5"
            @click="logout"
        >
            {{ $t('logout') }}
        </el-menu-item>
        <el-menu-item
            index="6"
            data-test="shareMenuOpener"
            @click="getCode"
        >
            {{ $t('get-code') }}
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue'
import { ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import OkulLogo from '@/components/OkulLogo/OkulLogo.vue'
import ShareCode from '@/Basic/components/ShareCode/ShareCode.vue'

export default defineComponent({
    components: { OkulLogo },
    props: {
        warning: {
            type: String,
            default: ''
        }
    },
    methods: {
        logout() {
            request('/api/logout').then(() => {
                window.location.reload()
            })
        },
        getCode() {
            ElMessageBox.alert(
                h(ShareCode, {
                    onSuccess: () => ElMessageBox.close()
                }),
                this.$t('get-code-title'),
                { confirmButtonText: this.$t('close') }
            )
        }
    }
})
</script>
<style module>
.spacer {
    flex-grow: 1;
}
.menu {
    padding: 0 0
}
.logo {
    fill: var(--el-text-color-primary);
    width: 100px;
    height: auto;
    vertical-align: middle;
}
.item {
    font-size: 20px
}

.warning {
    padding: 0 10px;
    display: flex;
    align-items: center;
    background-color: var(--el-color-warning-light-7);
    white-space: pre-line;
}
</style>
<i18n>
{
    "en": {
        "courses": "Courses",
        "editor": "Editor",
        "logout": "Logout",
        "get-code": "A code for your teachers",
        "close": "Close",
        "get-code-title": "A code for your teachers"
    },
    "ru": {
        "courses": "Курсы",
        "editor": "Редактор",
        "logout": "Выход",
        "get-code": "Код для твоего учителя",
        "close": "Закрыть",
        "get-code-title": "Код для твоего учителя"
    }
}
</i18n>
