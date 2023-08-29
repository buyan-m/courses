<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>{{ student?.name }} / {{ course?.name }}</h1>
        <ul>
            <li
                v-for="lesson in progress"
                :key="lesson.lessonId"
            >
                <span>
                    {{ lesson.name }}
                    <template v-if="lesson.passed && lesson.checked">
                        ✅
                    </template>
                    <template v-if="lesson.passed && !lesson.checked">
                        ❗
                    </template>
                </span>
                <router-link
                    v-for="page in lesson.pages"
                    :key="page._id"
                    :to="{
                        name: 'viewer-lesson-teacher-page',
                        params: {
                            lessonId: lesson.lessonId,
                            courseId: $route.params.courseId,
                            studentId: $route.params.studentId,
                            pageId: page._id
                        }
                    }"
                >
                    {{ page.name }}
                </router-link>
            </li>
        </ul>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import request from '@/utils/request'
import {
    DetailedStudentCourseInfo,
    Progress,
    TPageId,
    ViewerCourseResponse
} from '@/types/api-types'
import { PageStatus } from '@/constants/PageStatus'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'

type AggregatedProgress = {
    lessonId: string,
    name: string,
    passed: boolean
    checked: boolean
    pages: {
        _id: TPageId
        name: string
    }[],
}
type MinimalAnswer = {
    _id: string,
    checked: boolean
}
export default defineComponent({
    name: 'CourseStudent',
    components: {
        SingleColumnLayout
    },
    data() {
        return {
            answerPages: [] as DetailedStudentCourseInfo['answerPages'],
            student: undefined as DetailedStudentCourseInfo['student'] | undefined,
            progress: undefined as AggregatedProgress[] | undefined,
            pageStatus: PageStatus.loading,
            course: undefined as ViewerCourseResponse | undefined
        }
    },
    mounted() {
        const { studentId, courseId } = this.$route.params
        request<ViewerCourseResponse>(`/api/viewer/courses/${courseId}`).then(({ data }) => {
            if (data) {
                this.course = data
                this.pageStatus = PageStatus.ready
            }
        })
        request<DetailedStudentCourseInfo>(`/api/learning/students/${courseId}/${studentId}`)
            .then(({ data, errors }) => {
                if (!errors.length && data) {
                    const answerMap = data.answerPages.reduce<Record<string, MinimalAnswer>>((res, answerPage) => {
                        res[answerPage._id] = answerPage
                        return res
                    }, {})
                    this.answerPages = data.answerPages
                    this.student = data.student
                    const mappedProgress = data.progress.progress.reduce<Record<string, Progress>>((res, pr) => {
                        res[pr.objectId] = pr
                        return res
                    }, {})
                    this.progress = data.progress.lessons.map((lesson) => (
                        {
                            lessonId: lesson._id,
                            name: lesson.name,
                            pages: lesson.pages.filter(({ _id }) => answerMap[_id]),
                            passed: !!mappedProgress[lesson._id],
                            checked: lesson.pages.every(({ _id }) => !answerMap[_id] || answerMap[_id].checked)
                        }
                    ))

                    this.pageStatus = PageStatus.ready
                } else {
                    this.pageStatus = PageStatus.error
                }
            })
    }
})
</script>
<script setup lang="ts">
</script>
