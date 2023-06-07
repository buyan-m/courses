<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>

        <section :class="$style.teachingSection">
            <el-button
                v-if="isTeachButtonVisible"
                data-test="becomeTeacherButton"
                @click="useCourseToTeach"
            >
                {{ $t('teach') }}
            </el-button>
            <div v-if="isUserTeacherOfTheCourse">
                {{ $t('teaching') }}
                {{ $t('invite') }}
                <el-form data-test="inviteForm">
                    <el-input
                        v-model="studentId"
                        data-test="inviteForm.input"
                    >
                        <template #append>
                            <el-button
                                data-test="inviteForm.submit"
                                @click="sendInvite"
                            >
                                📧
                            </el-button>
                        </template>
                    </el-input>
                </el-form>
            </div>
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
import type { CourseResponse } from '@/types/api-types'
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
            } as CourseResponse,
            pageStatus: PageStatus.loading,
            studentId: ''
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
            request<CourseResponse>(`/api/viewer/courses/${courseId}`).then(({ data }) => {
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
        },

        sendInvite() {
            request('/api/learning/invite', {
                method: 'post',
                body: JSON.stringify({
                    userId: this.studentId,
                    courseId: this.course._id
                })
            }).then(({ data, errors }) => {
                if (!data && errors.length) {
                    alert(errors[0])
                }
            })
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
