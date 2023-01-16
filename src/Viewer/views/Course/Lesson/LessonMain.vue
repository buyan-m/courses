<template>
    <SingleColumnLayout>
        <h1>{{ lesson.name }}</h1>
        <ul>
            <li
                v-for="page in lesson.pages"
                :key="page._id"
            >
                <router-link
                    :to="{name: 'viewer-lesson-page', params: {pageId: page._id}}"
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
import type { TLessonResponse } from '@/types/api/viewer-responses'
import request from '@/utils/request'
import { TPage } from '@/types/api/viewer-responses'

export default defineComponent({
    components: { SingleColumnLayout },

    data() {
        return {
            lesson: {
                name: '',
                pages: [] as TPage[]
            },
            updatedName: '',
            pageStatus: PageStatus.loading
        }
    },
    created() {
        const { lessonId } = this.$route.params
        if (lessonId) {
            request<TLessonResponse>(`/api/viewer/lessons/${lessonId}`).then(({ data }) => {
                if (data) {
                    this.lesson = data
                    this.updatedName = data.name
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
