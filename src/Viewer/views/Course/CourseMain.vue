<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>
        <div :class="$style.lessons">
            <LessonCard
                v-for="lesson in course.lessons"
                :key="lesson._id"
                :lesson="lesson"
            />
        </div>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { PageStatus } from '@/constants/PageStatus'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { TCourseStructure } from '@/types/api/editor-responses'
import LessonCard from '@/Viewer/components/LessonCard/LessonCard.vue'

export default defineComponent({
    components: { LessonCard, SingleColumnLayout },

    data() {
        return {
            course: {
                _id: '',
                name: '',
                description: '',
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
<style module>
.lessons {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
