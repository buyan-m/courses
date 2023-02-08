<template>
    <SingleColumnLayout>
        <h1>Главная курсов</h1>
        <p>Страница с доступными для редактирования курсами, возможно какой-то дашборд</p>
        <section :class="$style.courses">
            <CourseCard
                v-for="course in courses"
                :key="course._id"
                :course="course"
                data-test="courseCard"
            />
        </section>
        <router-link :to="{name: 'editor-course-create'}">
            <el-button>{{ $t('create') }}</el-button>
        </router-link>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { TCourseStructure } from '@/types/api/editor-responses'
import CourseCard from '@/Editor/components/CourseCard/CourseCard.vue'

export default defineComponent({
    components: { CourseCard, SingleColumnLayout },
    data() {
        return {
            courses: [] as TCourseStructure[]
        }
    },
    created() {
        request<TCourseStructure[]>('/api/editor/courses').then(({ data }) => {
            this.courses = data!
        }, () => {
            // handling
        })
    }
})
</script>
<style module>
.courses {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 20px;
}
</style>
<i18n>
{
    "ru": {
        "create" : "Создать курс"
    },
    "en": {
        "create" : "New course"
    }
}
</i18n>
