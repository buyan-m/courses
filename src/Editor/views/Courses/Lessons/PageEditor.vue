<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading' || pageStatus === 'updating'">
        <router-link :to="{name: 'editor-course-update', params: {courseId: $route.params.courseId}}">
            back to course
        </router-link>
        <HeadingEditable
            :text="page.name"
            @change="headingChangeHandler"
        />
        <CourseStepEditor
            v-if="shouldWeShowEditor"
            ref="editor"
            :initial-page="initialPageStructure"
            @save="editorReturnDataHandler"
        />
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CourseStepEditor from '@/Editor/components/CourseStepEditor/CourseStepEditor.vue'
import HeadingEditable from '@/Editor/components/HeadingEditable/HeadingEditable.vue'
import type { OutputData as TEditorOutputData } from '@editorjs/editorjs'
import { PageStatus } from '@/constants/PageStatus'
import request from '@/utils/request'
import type { TPage, TPageCreateResponse } from '@/types/api/editor-responses'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'

export default defineComponent({
    components: {
        SingleColumnLayout,
        CourseStepEditor,
        HeadingEditable
    },
    data() {
        return {
            initialPageStructure: {
                blocks: [
                    {
                        type: 'paragraph',
                        data: { text: 'Hello! Let me introduce our editor' }
                    }
                ]
            } as TPage['structure'],
            page: { name: 'placeholder', updatedName: 'placeholder' },
            pageStatus: PageStatus.loading
        }
    },
    computed: {
        shouldWeShowEditor() {
            return this.pageStatus !== PageStatus.loading
        }
    },
    created() {
        if (this.$route.params.pageId) {
            request<TPage>(`/api/editor/pages/${this.$route.params.pageId}`).then(({ data, errors }) => {
                if (data) {
                    this.initialPageStructure = data.structure
                    this.pageStatus = PageStatus.ready
                    this.page = { name: data.name, updatedName: data.name }
                } else {
                    this.pageStatus = PageStatus.error
                }
            })
        } else {
            this.pageStatus = PageStatus.ready
        }
    },
    methods: {
        editorReturnDataHandler(content: TEditorOutputData) {
            const routeId = this.$route.params.pageId || 'create'
            const { lessonId } = this.$route.params
            this.pageStatus = PageStatus.updating
            request<TPageCreateResponse>(
                `/api/editor/pages/${routeId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.page.updatedName,
                        structure: content,
                        lessonId
                    })
                }
            ).then(({ data, errors }) => {
                this.pageStatus = PageStatus.ready

                if (!this.$route.params.pageId && data) {
                    const { courseId } = this.$route.params
                    this.$router.push({ name: 'editor-lesson-update-page', params: { pageId: data.pageId, lessonId, courseId } })
                }
                if (errors.length) {
                    this.pageStatus = PageStatus.error
                }
            })
        },
        headingChangeHandler(value: string) {
            this.page.updatedName = value
        }
    }
})
</script>

<i18n lang="json">
    {
        "en": {
            "Pages": "Pages",
            "Save": "Save"
        }
    }
</i18n>
