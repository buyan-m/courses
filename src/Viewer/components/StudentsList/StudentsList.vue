<template>
    <ul data-test="studentsList">
        <li
            v-for="student in students"
            :key="`s${student.userId}/c${student.courseId}`"
            :class="$style.listItem"
            :data-test="`s${student.userId}/c${student.courseId}`"
        >
            <RouterLink
                :to="{
                    name: 'viewer-course-student',
                    params: {
                        courseId: student.courseId,
                        studentId: student.userId
                    }
                }"
            >
                {{ student.name }} / {{ student.courseTitle }}
            </RouterLink>
            <el-button
                link
                :data-test="`s${student.userId}/c${student.courseId}.archive`"
                @click="archiveStudent(student)"
            >
                ❌
            </el-button>
        </li>
    </ul>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { TCourseStudentsResponse } from '@/types/api-types'

type Props = {
    students: TCourseStudentsResponse
}

defineProps<Props>()

const emit = defineEmits<{ archiveStudent: [value: TCourseStudentsResponse[0]] }>()

function archiveStudent(student: TCourseStudentsResponse[0]) {
    emit('archiveStudent', student)
}

</script>
<style module>
.listItem {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--el-border-color);
    padding: 5px 0;
    list-style: none;
}

</style>
