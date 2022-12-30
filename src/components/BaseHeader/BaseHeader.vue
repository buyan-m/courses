<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
    >
        <el-menu-item index="1">
            ¿¿Project??
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>
                Workspace
            </template>
            <el-menu-item index="2-1">
                item one
            </el-menu-item>
            <el-menu-item index="2-2">
                item two
            </el-menu-item>
            <el-menu-item index="2-3">
                item three
            </el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>
                    item four
                </template>
                <el-menu-item index="2-4-1">
                    item one
                </el-menu-item>
                <el-menu-item index="2-4-2">
                    item two
                </el-menu-item>
                <el-menu-item index="2-4-3">
                    item three
                </el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item
            index="3"
        >
            <router-link :to="{name: 'viewer-home'}">
                Курсы
            </router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link :to="{name: 'editor-home'}">
                Редактор
            </router-link>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts">
export default {}
</script>
