<template>
    <SingleColumnLayout>
        <h1>Главная курсов</h1>
        <p>Страница с доступными для редактирования курсами, возможно какой-то дашборд</p>
        <ul>
            <li
                v-for="course in courses"
                :key="course._id"
            >
                <router-link
                    :to="{name: 'editor-course-update', params: {courseId: course._id}}"
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
import type { TCourseStructure } from '@/types/api/editor-responses'

export default defineComponent({
    components: { SingleColumnLayout },
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
