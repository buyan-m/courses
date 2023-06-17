<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

export default defineComponent({
    name: 'App'
})
</script>
<style>
body {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
}
html, body, #app {
    height: 100%;
}
*, :before, :after {
    box-sizing: border-box;
}
a {
    font-weight: 500;
    text-decoration: inherit;
    color: var(--el-color-primary)
}
a:visited {
    color: var(--el-color-primary)
}
a:hover {
    color: var(--el-color-primary-light-3)
}

h1,h2,h3,h4,h5,h6 {
    color: var(--el-text-color-regular);
    font-weight: inherit
}

h1 {
    font-size: calc(var(--el-font-size-base) + 6px)
}

h2 {
    font-size: calc(var(--el-font-size-base) + 4px)
}

h3 {
    font-size: calc(var(--el-font-size-base) + 2px)
}

h4,h5,h6 {
    font-size: inherit
}

h1 {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    font-size: 1.9rem
}

@media screen and (min-width: 480px) {
    h1 {
        font-size:2.2rem
    }
}

h2 {
    margin-top: 2.25rem;
    margin-bottom: 1.25rem;
    padding-bottom: .3rem;
    line-height: 1.25;
    font-size: 1.65rem
}

h2+h3 {
    margin-top: 1.5rem
}

h3 {
    margin-top: 2rem;
    font-size: 1.35rem
}

h4 {
    font-size: 1.15rem
}
h1:first-child,h2:first-child,h3:first-child,h4:first-child,h5:first-child,
h6:first-child,p:first-child {
    margin-top: 0
}

h1:last-child,h2:last-child,h3:last-child,h4:last-child,h5:last-child,h6:last-child,p:last-child {
    margin-bottom: 0
}

p {
    margin: 1rem 0;
    line-height: 1.7;
}
ul, ol {
    padding:10px 40px;
}
</style>
