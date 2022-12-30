<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <HeadingEditable
            :text="course.name"
            @change="headingChangeHandler"
        />
        <ul>
            <li
                v-for="lesson in course.lessons"
                :key="lesson.id"
            >
                <router-link
                    :to="{name: 'editor-lesson-update', params: {lessonId: lesson.id}}"
                >
                    {{ lesson.name }}
                </router-link>
            </li>
        </ul>
        <el-button
            v-if="formWasEdited"
            @click="saveCourse"
        >
            Сохранить курс
        </el-button>
        <router-link
            v-if="courseId"
            :to="{name: 'editor-lessons-new'}"
        >
            <el-button :disabled="formWasEdited">
                Создать урок
            </el-button>
        </router-link>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { PageStatus } from '@/constants/PageStatus'
import { defineComponent } from 'vue'
import HeadingEditable from '@/Editor/components/HeadingEditable/HeadingEditable.vue'
import request from '@/utils/request'
import { TCoursesMap, TCourseStructure } from '@/types/api/editor-responses'

export default defineComponent({
    components: { HeadingEditable, SingleColumnLayout },

    data() {
        return {
            course: {
                id: 'NOT_ID',
                name: 'Create new course',
                lessons: []
            } as TCourseStructure,
            updatedName: 'Create new course',
            pageStatus: PageStatus.loading,
            formWasEdited: false
        }
    },
    computed: {
        courseId() { return this.$route.params.courseId }
    },
    created() {
        if (this.courseId) {
            request<TCourseStructure>(`/api/editor/courses/${this.courseId}`).then(({ data }) => {
                this.course = data!
                this.updatedName = data!.name
                this.pageStatus = PageStatus.ready
            })
        } else {
            this.pageStatus = PageStatus.ready
        }
    },
    methods: {
        headingChangeHandler(value: string) {
            this.updatedName = value
            this.formWasEdited = true
        },
        saveCourse() {
            const routeId = this.$route.params.courseId || 'create'

            request(`/api/editor/courses/${routeId}`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.updatedName,
                    lessons: this.course.lessons
                })
            })
                .then(({ data: { courseId } }) => {
                    if (!this.$route.params.courseId) {
                        this.$router.push({ name: 'editor-course-update', params: { courseId } })
                    }
                })
            this.formWasEdited = false
        }
    }
})
</script>
<i18n lang="json">
{
    "en": {
        "f": "Create lesson"
    }
}
</i18n>
