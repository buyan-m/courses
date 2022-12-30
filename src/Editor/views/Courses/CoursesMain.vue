<template>
    <SingleColumnLayout>
        <h1>Главная курсов</h1>
        <p>Страница с доступными для редактирования курсами, возможно какой-то дашборд</p>
        <ul>
            <li
                v-for="(course, id) in coursesMap"
                :key="id"
            >
                <router-link
                    :to="{name: 'editor-course-update', params: {courseId: id}}"
                >
                    {{ course.name }}
                </router-link>
            </li>
        </ul>
        <router-link :to="{name: 'editor-course-create'}">
            <el-button>Создать курс</el-button>
        </router-link>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { TCoursesMap } from '@/types/api/editor-responses'

export default defineComponent({
    components: { SingleColumnLayout },
    data() {
        return {
            coursesMap: {} as TCoursesMap
        }
    },
    created() {
        request<TCoursesMap>('/api/editor/courses').then(({ data }) => {
            this.coursesMap = data!
        }, () => {
            // handling
        })
    }
})
</script>
