<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h2>{{ $t('students') }}</h2>
        <StudentsList
            :students="students"
            @archive-student="archiveStudent"
        />
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { PageStatus } from '@/constants/PageStatus'
import request from '@/utils/request'
import { TCourseStudentsResponse, TCourseStudentsResponseItem } from '@/types/api-types'
import StudentsList from '@/Viewer/components/StudentsList/StudentsList.vue'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'

export default defineComponent({
    components: { StudentsList, SingleColumnLayout },
    data() {
        return {
            pageStatus: PageStatus.loading,
            students: [] as TCourseStudentsResponse
        }
    },

    mounted() {
        this.getStudents()
    },

    methods: {
        getStudents() {
            this.pageStatus = PageStatus.loading
            const { courseId } = this.$route.params
            request<TCourseStudentsResponse>(`/api/learning/students/${courseId}`).then(({ data, errors }) => {
                if (data && !errors.length) {
                    this.students = data
                    this.pageStatus = PageStatus.ready
                } else {
                    this.pageStatus = PageStatus.error
                }
            })
        },
        archiveStudent(student: TCourseStudentsResponseItem) {
            request('/api/learning/archive-student', {
                body: JSON.stringify(student),
                method: 'PUT'
            }).then(({ errors }) => {
                if (!errors.length) {
                    this.students = this.students.filter((el) => el !== student)
                }
            })
        }
    }
})
</script>
<i18n>
{
    "en": {
        "students": "Students"
    }
}
</i18n>
