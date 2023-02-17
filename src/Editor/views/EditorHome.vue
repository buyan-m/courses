<template>
    <SingleColumnLayout>
        <h2>
            {{ $t('editor') }}
        </h2>
        <p>
            {{ $t('description') }}
        </p>
        <section :class="$style.courses">
            <CourseCard
                v-for="course in courses"
                :key="course._id"
                :course="course"
                data-test="courseCard"
            />
        </section>
        <router-link :to="{name: 'editor-course-create'}">
            <el-button>{{ $t('create') }}</el-button>
        </router-link>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import CourseCard from '@/Editor/components/CourseCard/CourseCard.vue'
import { TCourseStructure } from '@/types/api/editor-responses'
import request from '@/utils/request'

export default defineComponent({
    components: { CourseCard, SingleColumnLayout },
    data() {
        return {
            courses: [] as TCourseStructure[]
        }
    },
    created() {
        request<TCourseStructure[]>('/api/editor/courses').then(({ data, errors }) => {
            if (errors.length === 0) {
                this.courses = data!
            }
        })
    }
})
</script>
<style module>
.courses {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 20px;
}
</style>
<i18n>
{
    "ru": {
        "editor":  "Редактор курсов",
        "description": "Здесь вы сможете создать нужный вам курс",
        "courses": "Созданные вами курсы",
        "create": "Создать новый курс"
    },
    "en": {
        "editor":  "Courses' editor",
        "description": "You can create a course here",
        "courses": "Your courses",
        "create": "Create new course"
    }
}
</i18n>
