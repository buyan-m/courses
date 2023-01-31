<template>
    <SingleColumnLayout>
        <h2>
            Редактор курсов
        </h2>
        <p>
            Страница с описанием возможностей редактора курсов, быстрые ссылки, миссия проекта
        </p>
        <router-link
            :class="$style.button"
            :to="{name: 'editor-courses-main'}"
        >
            <el-button>
                Курсы
            </el-button>
        </router-link>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'

export default {
    components: { SingleColumnLayout }
}
</script>
<style module>
.button {
    text-decoration: none;
}
</style>
