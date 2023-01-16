<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>{{ course.name }}</h1>
        <ul>
            <li
                v-for="lesson in course.lessons"
                :key="lesson.id"
            >
                <router-link
                    :to="{name: 'viewer-lesson', params: {lessonId: lesson._id}}"
                >
                    {{ lesson.name }}
                </router-link>
                <span v-if="lesson.state === 'finished'">✅</span>
            </li>
        </ul>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { PageStatus } from '@/constants/PageStatus'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { TCourseStructure } from '@/types/api/editor-responses'

export default defineComponent({
    components: { SingleColumnLayout },

    data() {
        return {
            course: {
                _id: '',
                name: '',
                lessons: []
            } as TCourseStructure,
            pageStatus: PageStatus.loading
        }
    },

    created() {
        const { courseId } = this.$route.params
        if (courseId) {
            request<TCourseStructure>(`/api/viewer/courses/${courseId}`).then(({ data }) => {
                this.course = data!
                this.pageStatus = PageStatus.ready
            })
        } else {
            this.pageStatus = PageStatus.ready
        }
    }
})
</script>
