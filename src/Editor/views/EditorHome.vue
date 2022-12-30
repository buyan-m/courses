<template>
    <TwoColumnsLayout>
        <template #secondary>
            <p>кек</p>
        </template>
        <template #primary>
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
        </template>
    </TwoColumnsLayout>
</template>
<script lang="ts">
import TwoColumnsLayout from '@/layouts/columns/TwoColumnsLayout.vue'

export default {
    components: { TwoColumnsLayout }
}
</script>
<style module>
.button {
    text-decoration: none;
}
</style>
