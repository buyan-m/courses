<template>
    <SingleColumnLayout>
        <HeadingEditable
            :text="lesson.name"
            placeholder="Lesson name"
            @change="headingChangeHandler"
        />
        <ul>
            <li
                v-for="page in lesson.pages"
                :key="page._id"
            >
                <router-link
                    :to="{name: 'editor-lesson-update-page', params: {pageId: page._id}}"
                >
                    {{ page.name }}
                </router-link>
                <el-button @click="removePage(page._id)">
                    X
                </el-button>
            </li>
        </ul>
        <el-button @click="saveLesson">
            Сохранить
        </el-button>
        <router-link
            v-if="lessonId"
            :to="newPageRoute"
        >
            <el-button>Создать страницу урока</el-button>
        </router-link>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import HeadingEditable from '@/Editor/components/HeadingEditable/HeadingEditable.vue'
import { PageStatus } from '@/constants/PageStatus'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { TLessonResponse, TLessonCreateResponse, TPage } from '@/types/api/editor-responses'
import type { TPageId } from '@/types/api/common'
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
    components: { SingleColumnLayout, HeadingEditable },

    data() {
        return {
            lesson: {
                name: '',
                pages: [] as TPage[]
            },
            updatedName: 'Lesson',
            pageStatus: PageStatus.loading
        }
    },
    computed: {
        lessonId(): string { return this.$route.params.lessonId as string },
        newPageRoute(): RouteLocationRaw {
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
            request<TLessonResponse>(`/api/editor/lessons/${this.lessonId}`).then(({ data }) => {
                if (data) {
                    this.lesson = data
                    this.updatedName = data.name
                    this.pageStatus = PageStatus.ready
                } else {
                    // handle error
                    this.pageStatus = PageStatus.error
                }
            })
        } else {
            this.pageStatus = PageStatus.ready
        }
    },
    methods: {
        saveLesson() {
            const routeId = this.$route.params.lessonId || 'create'
            const { courseId } = this.$route.params

            request<TLessonCreateResponse>(
                `/api/editor/lessons/${routeId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...this.lesson,
                        name: this.updatedName,
                        courseId
                    })
                    // delete updated name before sent
                }
            ).then(({ data }) => {
                if (data) {
                    if (!this.$route.params.lessonId) {
                        this.$router.push({ name: 'editor-lesson-update', params: { lessonId: data.lessonId, courseId } })
                    }
                } else {
                    // handle error
                }
            })
        },

        headingChangeHandler(value: string) {
            this.updatedName = value
        },

        removePage(pageId: TPageId) {
            request(`/api/editor/pages/${pageId}`, { method: 'delete' }).then(() => {
                this.lesson.pages = this.lesson.pages.filter((page: TPage) => page._id !== pageId)
            })
        }
    }
})
</script>
<i18n lang="json">
{
    "en": {
        "f": "Create page"
    }
}
</i18n>
