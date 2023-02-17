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
import OkulLogo from '@/components/OkulLogo/OkulLogo.vue'

export default {
    components: { OkulLogo },
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
