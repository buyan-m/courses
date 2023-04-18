<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>

        <section :class="$style.teachingSection">
            <el-button
                v-if="isTeachButtonVisible"
                @click="useCourseToTeach"
            >
                {{ $t('teach') }}
            </el-button>
            <span v-if="isUserTeacherOfTheCourse">
                {{ $t('teaching') }}
            </span>
        </section>

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

    computed: {
        isTeachButtonVisible(): boolean {
            return true
        },

        isUserTeacherOfTheCourse() {
            return true
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
    },

    methods: {
        useCourseToTeach() {
            // became a teacher
        }
    }
})
</script>
<style module>
.teachingSection {
    padding: 10px;
    margin-bottom: 20px;
    background-color: var(--el-disabled-bg-color);
}

.lessons {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
<i18n>
{
    "en": {
        "teach": "use this course as a teacher",
        "teaching": "You are a teacher of this course"
    }
}
</i18n>
