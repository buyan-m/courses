<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>{{ course.name }}</h1>
        <p>{{ course.description }}</p>

        <section
            v-if="isTeachSectionAvailable"
            :class="$style.teachingSection"
        >
            <el-button
                v-if="isTeachButtonVisible"
                data-test="becomeTeacherButton"
                @click="useCourseToTeach"
            >
                {{ $t('teach') }}
            </el-button>
            <template v-if="isUserTeacherOfTheCourse">
                {{ $t('teaching') }}
                <div :class="$style.inviteAndArchive">
                    <InviteStudent
                        @send-invite="sendInvite"
                    />
                    <el-button
                        v-if="isArchivingAvailable"
                        type="danger"
                        data-test="removeCourseButton"
                        @click="confirmCourseArchiving"
                    >
                        {{ $t('remove-course') }}
                    </el-button>
                </div>
            </template>
        </section>

        <div :class="$style.lessons">
            <LessonCard
                v-for="lesson in course.lessons"
                :key="lesson._id"
                :lesson="lesson"
            />
        </div>
    </SingleColumnLayout>
</template>
<script lang="ts">
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import { PageStatus } from '@/constants/PageStatus'
import { defineComponent } from 'vue'
import request from '@/utils/request'
import type { ViewerCourseResponse } from '@/types/api-types'
import { CourseRoles } from '@/types/api-types'
import LessonCard from '@/Viewer/components/LessonCard/LessonCard.vue'
import InviteStudent from '@/Viewer/components/InviteStudent/InviteStudent.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
    components: {
        InviteStudent, LessonCard, SingleColumnLayout
    },

    data() {
        return {
            course: {
                _id: '',
                name: '',
                description: '',
                lessons: [],
                role: CourseRoles.visitor
            } as ViewerCourseResponse,
            pageStatus: PageStatus.loading,
            studentId: ''
        }
    },

    computed: {
        isUserTeacherOfTheCourse() {
            return [CourseRoles.teacher, CourseRoles.owner].includes(this.course.role)
        },
        isTeachButtonVisible() {
            return this.course.role === CourseRoles.visitor
        },
        isTeachSectionAvailable() {
            return this.course.role !== CourseRoles.student
        },
        isArchivingAvailable() {
            return this.course.role !== CourseRoles.owner
        }
    },

    created() {
        const { courseId } = this.$route.params
        if (courseId) {
            request<ViewerCourseResponse>(`/api/viewer/courses/${courseId}`).then(({ data }) => {
                if (data) {
                    this.course = data
                    this.pageStatus = PageStatus.ready
                }
            })
        } else {
            this.pageStatus = PageStatus.ready
        }
    },

    methods: {
        useCourseToTeach() {
            request(`/api/learning/become-teacher/${this.course._id}`, { method: 'put' })
                .then(({ errors }) => {
                    if (!errors.length) {
                        this.course.role = CourseRoles.teacher
                        ElMessage({
                            message: this.$t('you-are-the-teacher-now'),
                            type: 'success'
                        })
                    } else {
                        ElMessage({
                            message: errors[0],
                            type: 'error'
                        })
                    }
                })
        },

        sendInvite(code: string) {
            request('/api/learning/invite', {
                method: 'post',
                body: JSON.stringify({
                    shareCode: code,
                    courseId: this.course._id
                })
            }).then(({ data, errors }) => {
                if (!data && errors.length) {
                    ElMessage({
                        message: errors[0],
                        type: 'error'
                    })
                }
            })
        },

        confirmCourseArchiving() {
            ElMessageBox.confirm(
                this.$t('course-archiving-confirmation'),
                this.$t('remove-course'),
                {
                    type: 'warning',
                    confirmButtonText: this.$t('archive'),
                    confirmButtonClass: 'removeCourseConfirmButton',
                    cancelButtonText: this.$t('cancel')
                }
            ).then((action) => {
                if (action === 'confirm') {
                    request(`/api/learning/archive-teacher/${this.course._id}`, {
                        method: 'put'
                    }).then(({ errors }) => {
                        if (errors.length) {
                            ElMessage({
                                message: errors[0],
                                type: 'error'
                            })
                        } else {
                            this.course.role = CourseRoles.visitor
                        }
                    })
                }
            }, () => {
                // cancel action, nothing to do except handling rejection
            })
        }
    }
})
</script>
<style module>
.teachingSection {
    padding: 10px;
    margin-bottom: 20px;
    background-color: var(--el-disabled-bg-color);
}

.lessons {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.inviteAndArchive {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

</style>
<i18n>
{
    "en": {
        "teach": "use this course as a teacher",
        "teaching": "You are a teacher of this course",
        "you-are-the-teacher-now": "You can add students to the course now",
        "course-archiving-confirmation": "Do you want to stop teaching with this course?",
        "archive": "Archive",
        "cancel": "Cancel",
        "remove-course": "Archive course"
    }
}
</i18n>
