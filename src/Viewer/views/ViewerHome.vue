<template>
    <SingleColumnLayout>
        Карточки доступных курсов
        <ul>
            <li
                v-for="(course, index) in courses"
                :key="index"
            >
                <router-link
                    :to="{name: 'viewer-course', params: {courseId: course.course.id}}"
                >
                    {{ course.course.name }}
                    {{ `${Math.floor(course.progress * 100)}%` }}
                </router-link>
            </li>
        </ul>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import request from '@/utils/request'
import type { TCoursesMap } from '@/types/api/editor-responses'

export default defineComponent({
    components: { SingleColumnLayout },
    data() {
        return {
            courses: []
        }
    },
    created() {
        request<TCoursesMap>('/api/viewer/courses').then(({ data }) => {
            this.courses = data!
        }, () => {
            // handling
        })
    }
})
</script>
