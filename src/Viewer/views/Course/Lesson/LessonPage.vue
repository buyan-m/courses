<template>
    <SingleColumnLayout>
        <LessonPageContent
            :content="pageContent"
            @answersReceived="answersReceived"
        />
        <el-button
            v-if="nextPage"
            :disabled="!pageCompleted"
            @click="goToNextPage"
        >
            next
        </el-button>
        <el-button
            v-if="!nextPage"
            :disabled="!pageCompleted"
            @click="completeLesson"
        >
            done
        </el-button>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import LessonPageContent from '@/Viewer/components/LessonPageContent/LessonPageContent.vue'
import request from '@/utils/request'
import type { TViewerPage, TNextPage } from '@/types/api/viewer-responses'

export default defineComponent({
    components: { LessonPageContent, SingleColumnLayout },
    data() {
        return {
            pageContent: [] as unknown as TViewerPage['structure'],
            pageCompleted: false,
            nextPage: false
        }
    },
    computed: {
        pageId() {
            return this.$route.params.pageId
        }
    },
    watch: {
        pageId(value) {
            if (value) {
                this.updateContent()
            } else {
                // history back triggered
            }
        }
    },
    created() {
        this.updateContent()
    },
    methods: {
        answersReceived() {
            this.pageCompleted = true
        },
        goToNextPage() {
            request<TNextPage>(`/api/viewer/pages/${this.pageId}/next`, { method: 'post', body: JSON.stringify({ answers: [] }) }).then(({ data }) => {
                if (data) {
                    this.$router.push({
                        name: 'viewer-lesson-page',
                        params: {
                            pageId: data.pageId,
                            lessonId: this.$route.params.lessonId,
                            courseId: this.$route.params.courseId
                        }
                    })
                } else {
                    // handle error
                }
            })
        },
        updateContent() {
            this.pageContent = { blocks: [] }
            request<TViewerPage>(`/api/viewer/pages/${this.pageId}`).then(({ data }) => {
                this.pageContent = data!.structure
                this.nextPage = data!.nextPageAvailable
                this.pageCompleted = false
            })
        },
        completeLesson() {
            this.$router.push({
                name: 'viewer-course',
                params: {
                    lessonId: this.$route.params.lessonId,
                    courseId: this.$route.params.courseId
                }
            })
        }
    }
})
</script>
