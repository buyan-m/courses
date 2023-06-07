<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading' || pageStatus === 'updating'">
        <template v-if="shouldWeShowEditor">
            <div :class="$style.serviceHeader">
                <router-link :to="{name: 'editor-course-update', params: {courseId: $route.params.courseId}}">
                    back to course
                </router-link>
                <span>
                    {{ $t('show-answers') }}
                    <el-switch
                        v-model="page.isAnswersVisible"
                    />
                </span>
            </div>
            <HeadingEditable
                :text="page.name"
                data-test="heading"
                @change="headingChangeHandler"
            />
            <CourseStepEditor
                v-if="shouldWeShowEditor"
                ref="editor"
                :initial-page="initialPageStructure"
                @save="editorReturnDataHandler"
            />
        </template>
        <p
            v-if="pageStatus === 'error'"
            :class="$style.error"
            data-test="errorText"
        >
            {{ errorText }}
        </p>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CourseStepEditor from '@/Editor/components/CourseStepEditor/CourseStepEditor.vue'
import HeadingEditable from '@/Editor/components/HeadingEditable/HeadingEditable.vue'
import type { OutputData as TEditorOutputData } from '@editorjs/editorjs'
import { PageStatus } from '@/constants/PageStatus'
import request from '@/utils/request'
import type { Page, EditorPageCreateResponse } from '@/types/api-types'
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
                        id: 'd3f4ult',
                        type: 'paragraph',
                        data: { text: 'Hello! Let me introduce our editor' }
                    }
                ]
            } as Page['structure'],
            page: { name: 'placeholder', updatedName: 'placeholder', isAnswersVisible: true },
            position: 0,
            pageStatus: PageStatus.loading as PageStatus,
            errorText: ''
        }
    },
    computed: {
        shouldWeShowEditor() {
            return this.pageStatus === PageStatus.ready || this.pageStatus === PageStatus.updating
        }
    },
    created() {
        if (this.$route.params.pageId) {
            request<Page>(`/api/editor/pages/${this.$route.params.pageId}`).then(({ data, errors }) => {
                if (data) {
                    this.initialPageStructure = data.structure
                    this.position = data.position
                    this.pageStatus = PageStatus.ready
                    this.page = { name: data.name, updatedName: data.name, isAnswersVisible: data.isAnswersVisible }
                } else {
                    this.pageStatus = PageStatus.error
                    // eslint-disable-next-line prefer-destructuring
                    this.errorText = errors[0]
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
            request<EditorPageCreateResponse>(
                `/api/editor/pages/${routeId}`,
                {
                    method: routeId === 'create' ? 'POST' : 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.page.updatedName,
                        isAnswersVisible: this.page.isAnswersVisible,
                        structure: content,
                        lessonId,
                        position: this.position // TODO: add position control
                    })
                }
            ).then(({ data, errors }) => {
                this.pageStatus = PageStatus.ready

                if (!this.$route.params.pageId && data) {
                    const { courseId } = this.$route.params
                    this.$router.push({
                        name: 'editor-lesson-update-page',
                        params: { pageId: data.pageId, lessonId, courseId }
                    })
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
            "Save": "Save",
            "show-answers": "The correctness of the answers will be visible to a student"
        }
    }
</i18n>
<style module>
.serviceHeader {
    display: flex;
    justify-content: space-between;
}
.error {
    color: var(--el-color-error);
    font-size: var(--el-font-size-large)
}

</style>
