<template>
    <SingleColumnLayout>
        <h1>{{ lesson.name }}</h1>
        <ul>
            <li
                v-for="page in lesson.pages"
                :key="page.id"
            >
                <router-link
                    :to="{name: 'viewer-lesson-page', params: {pageId: page.id}}"
                >
                    {{ page.name }}
                </router-link>
            </li>
        </ul>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { PageStatus } from '@/constants/PageStatus'
import { defineComponent } from 'vue'
import type { TLessonId } from '@/types/api/common'
import type { TLessonResponse } from '@/types/api/viewer-responses'
import request from '@/utils/request'

export default defineComponent({
    components: { SingleColumnLayout },

    data() {
        return {
            lesson: {
                name: '',
                pages: [],
                updatedName: ''
            },
            pageStatus: PageStatus.loading
        }
    },
    computed: {
        lessonId(): TLessonId {
            return this.$route.params.lessonId as TLessonId
        },
        newPageRoute() {
            return {
                name: 'editor-lesson-new-page',
                params: {
                    lessonId: this.lessonId,
                    courseId: this.$route.params.courseId
                }
            }
        }
    },
    created() {
        if (this.lessonId) {
            request<TLessonResponse>(`/api/lessons/${this.lessonId}`).then(({ data }) => {
                if (data) {
                    this.lesson = data
                    this.lesson.updatedName = data.name
                    this.pageStatus = PageStatus.ready
                } else {
                    // handle error
                }
            })
        } else {
            this.pageStatus = PageStatus.ready
        }
    }
})
</script>
