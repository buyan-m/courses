<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
    >
        <el-menu-item index="1">
            ???
        </el-menu-item>
        <el-menu-item
            index="2"
        >
            <router-link :to="{name: 'viewer-home'}">
                {{ $t('courses') }}
            </router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link :to="{name: 'editor-home'}">
                {{ $t('editor') }}
            </router-link>
        </el-menu-item>
        <div :class="$style.spacer" />
        <el-menu-item
            index="4"
            @click="logout"
        >
            {{ $t('logout') }}
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts">
import request from '@/utils/request'

export default {
    methods: {
        logout() {
            request('/api/logout').then(() => {
                window.location.reload()
            })
        }
    }
}
</script>
<style module>
.spacer {
    flex-grow: 1;
}
</style>
<i18n>
{
    "en": {
        "courses": "Courses",
        "editor": "Editor",
        "logout": "Logout"
    },
    "ru": {
        "courses": "Курсы",
        "editor": "Редактор",
        "logout":  "Выход"
    }
}
</i18n>
