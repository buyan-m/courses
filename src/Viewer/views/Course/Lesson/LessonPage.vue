<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
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
import { PageStatus } from '@/constants/PageStatus'

export default defineComponent({
    components: { LessonPageContent, SingleColumnLayout },
    data() {
        return {
            pageContent: [] as unknown as TViewerPage['structure'],
            pageCompleted: false,
            nextPage: false,
            pageStatus: PageStatus.loading
        }
    },
    computed: {
        pageId():string {
            return this.$route.params.pageId as unknown as string
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
            const { pageId } = this.$route.params
            this.pageStatus = PageStatus.loading
            request<TNextPage>(`/api/viewer/pages/${pageId}/next`, {
                method: 'post',
                body: JSON.stringify({ answers: [] })
            }).then(({ data }) => {
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
                    this.pageStatus = PageStatus.error
                }
            })
        },
        updateContent() {
            this.pageContent = { blocks: [] }
            const { pageId } = this.$route.params
            this.pageStatus = PageStatus.loading
            request<TViewerPage>(`/api/viewer/pages/${pageId}`).then(({ data }) => {
                if (data) {
                    this.pageContent = data!.structure
                    this.nextPage = data!.nextPageAvailable
                    this.pageCompleted = false
                    this.pageStatus = PageStatus.ready
                } else {
                    this.pageStatus = PageStatus.error
                }
            })
        },
        completeLesson() {
            this.pageStatus = PageStatus.loading
            request<TViewerPage>(`/api/viewer/lessons/${this.$route.params.lessonId}/complete`, { method: 'post' })
                .then(() => {
                    this.$router.push({
                        name: 'viewer-course',
                        params: {
                            courseId: this.$route.params.courseId
                        }
                    })
                })
        }
    }
})
</script>
