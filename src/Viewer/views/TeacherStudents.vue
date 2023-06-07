<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h2>{{ $t('students') }}</h2>
        <ul data-test="studentsList">
            <li
                v-for="student in students"
                :key="`s${student.userId}/c${student.courseId}`"
                :data-test="`s${student.userId}/c${student.courseId}`"
            >
                {{ student.userId }} {{ student.courseId }}
                <el-button
                    :data-test="`s${student.userId}/c${student.courseId}.archive`"
                    @click="archiveStudent(student)"
                >
                    ❌
                </el-button>
            </li>
        </ul>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { PageStatus } from '@/constants/PageStatus'
import request from '@/utils/request'
import { Student } from '@/types/api-types'

export default defineComponent({
    data() {
        return {
            pageStatus: PageStatus.loading,
            students: [] as Student[]
        }
    },

    mounted() {
        this.getStudents()
    },

    methods: {
        getStudents() {
            this.pageStatus = PageStatus.loading
            request<Student[]>('/api/learning/students').then(({ data, errors }) => {
                if (data && !errors.length) {
                    this.students = data
                    this.pageStatus = PageStatus.ready
                } else {
                    this.pageStatus = PageStatus.error
                }
            })
        },
        archiveStudent(student: Student) {
            request<Student[]>('/api/learning/archive-student', {
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
