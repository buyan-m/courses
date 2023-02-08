<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <section :class="$style.courseSection">
            <HeadingEditable
                :text="$store.course.name"
                @change="headingUpdate"
            />

            <el-input
                v-model="$store.course.description"
                type="textarea"
                resize="none"
                autosize
                @input="descriptionUpdate"
            />
            <transition
                :leave-active-class="$style.opacityLeaveActive"
                :leave-to-class="$style.opacityLeaveTo"
            >
                <div
                    v-if="$store.courseStatus === CourseStatus.requesting"
                    v-loading="true"
                    :class="$style.preloader"
                />
            </transition>
        </section>

        <CourseLessons
            v-if="$store.courseStatus !== CourseStatus.new"
            :lessons="$store.course.lessons"
            :course-id="$store.courseId"
            @saveLesson="lessonChanged"
        />
    </SingleColumnLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PageStatus } from '@/constants/PageStatus'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import HeadingEditable from '@/Editor/components/HeadingEditable/HeadingEditable.vue'
import CourseLessons from '@/Editor/components/CourseLessons/CourseLessons.vue'
import type { TLesson } from '@/types/api/editor-responses'
import { CourseStatus } from '@/constants/CourseStatus'
import { useCourseUpdateStore } from './CourseUpdate.store'

const $store = useCourseUpdateStore()
const $route = useRoute()
const $router = useRouter()

const pageStatus = ref(PageStatus.loading)

const routeCourseId = ref($route.params.courseId as string)

let changeCourseTimeout = 0

$store.getCourse(routeCourseId.value).then(() => {
    pageStatus.value = PageStatus.ready
})

function saveCourse() {
    if (changeCourseTimeout) {
        clearTimeout(changeCourseTimeout)
    }
    changeCourseTimeout = setTimeout(() => {
        $store.saveCourse().then((courseId) => {
            if (!routeCourseId.value && courseId) {
                routeCourseId.value = courseId
                $router.push({ name: 'editor-course-update', params: { courseId } })
            }
        })
    }, 700)
}

function lessonChanged(lesson: TLesson) {
    $store.saveLesson(lesson)
}

function headingUpdate(heading: string) {
    $store.courseHeadingUpdate(heading)
    saveCourse()
}

function descriptionUpdate(description: string) {
    $store.courseDescriptionUpdate(description)
    saveCourse()
}

</script>
<style module>
.courseSection {
    position: relative;
    margin-bottom: 40px;
}
.preloader {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 1;
    width: 40px;
    height: 40px;
}

.opacityLeaveActive {
    transition: opacity 0.5s ease;
}

.opacityLeaveTo {
    opacity: 0;
}
</style>
<i18n lang="json">
{
    "en": {
        "f": "Create lesson"
    }
}
</i18n>
