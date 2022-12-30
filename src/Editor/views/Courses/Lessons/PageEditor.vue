<template>
    <TwoColumnsLayout>
        <template #primary>
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
        </template>
        <template #secondary>
            <div>{{ $t('Pages') }}</div>
        </template>
    </TwoColumnsLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CourseStepEditor from '@/Editor/components/CourseStepEditor/CourseStepEditor.vue'
import TwoColumnsLayout from '@/layouts/columns/TwoColumnsLayout.vue'
import HeadingEditable from '@/Editor/components/HeadingEditable/HeadingEditable.vue'
import type { OutputData as TEditorOutputData } from '@editorjs/editorjs'
import { PageStatus } from '@/constants/PageStatus'
import request from '@/utils/request'
import type { TPage, TPageCreateResponse } from '@/types/api/editor-responses'

export default defineComponent({
    components: {
        TwoColumnsLayout,
        CourseStepEditor,
        HeadingEditable
    },
    data() {
        return {
            initialPageStructure: { blocks: [{ type: 'paragraph', data: { text: 'Hello! Let me introduce our editor' } }] },
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
            request<TPage>(`/api/editor/page/${this.$route.params.pageId}`).then(({ data, errors }) => {
                if (data) {
                    this.initialPageStructure = data.structure
                    this.pageStatus = PageStatus.ready
                    this.page = { name: data.name, updatedName: data.name }
                } else {
                    console.error(errors)
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

            request<TPageCreateResponse>(
                `/api/editor/page/${routeId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.page.updatedName,
                        structuredData: content,
                        lessonId
                    })
                }
            ).then(({ data, errors }) => {
                if (!this.$route.params.pageId && data) {
                    const { courseId } = this.$route.params
                    this.$router.push({ name: 'editor-lesson-update-page', params: { pageId: data.pageId, lessonId, courseId } })
                }
                if (errors.length) {
                    console.error(errors)
                }
            })
        },
        headingChangeHandler(value: string) {
            this.page.updatedName = value
        },
        abortHeadingChanges() {
            // ??
            this.page.updatedName = this.page.name
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
