<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>
            {{ $lessonStore.heading }}
        </h1>
        <LessonPageContent
            :content="$lessonStore.pageContent"
            :saved-answers="$lessonStore.savedAnswers"
            @answers-received="answersReceived"
            @feedback-updated="updateFeedback"
        />
        <template v-if="!$lessonStore.isUserTeacher">
            <el-button
                v-if="$lessonStore.nextPage"
                :disabled="!$lessonStore.pageCompleted"
                @click="goToNextPage"
            >
                {{ $t('next') }}
            </el-button>
            <el-button
                v-if="!$lessonStore.nextPage"
                :disabled="!$lessonStore.pageCompleted"
                @click="completeLesson"
            >
                {{ $t('done') }}
            </el-button>
        </template>
        <el-button
            @click="saveFeedback"
        >
            {{ $t('save-feedback') }}
        </el-button>
    </SingleColumnLayout>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import LessonPageContent from '@/Viewer/components/LessonPageContent/LessonPageContent.vue'
import { PageStatus } from '@/constants/PageStatus'
import type { AnswerFeedback, AnswerWithId } from '@/types/api-types'
import { useLessonPageStore } from './LessonPage.store'

const $lessonStore = useLessonPageStore()
const $route = useRoute()
const $router = useRouter()

const pageStatus = ref<PageStatus>(PageStatus.loading)

const { pageId, studentId } = $route.params

function updateContent() {
    pageStatus.value = PageStatus.loading

    return $lessonStore.getLessonPage(pageId as string, studentId as string).then(() => {
        pageStatus.value = PageStatus.ready
    }, () => {
        pageStatus.value = PageStatus.error
    })
}

function answersReceived(answers: AnswerWithId[]) {
    $lessonStore.setAnswers(answers)
}

function saveFeedback() {
    $lessonStore.sendFeedbackToStudent()
}

function updateFeedback({ id, answerFeedback }: { id: string, answerFeedback: AnswerFeedback }) {
    $lessonStore.updateFeedback({ id, answerFeedback })
}

function goToNextPage() {
    pageStatus.value = PageStatus.loading

    $lessonStore.getNextPage().then((nextPageId) => {
        if (nextPageId) {
            $router.push({
                name: 'viewer-lesson-page',
                params: {
                    pageId: nextPageId,
                    lessonId: $route.params.lessonId,
                    courseId: $route.params.courseId
                }
            })
        } else {
            pageStatus.value = PageStatus.error
        }
    }).catch((error) => {
        // show error notification
        pageStatus.value = PageStatus.error
    })
}

function completeLesson() {
    pageStatus.value = PageStatus.loading

    $lessonStore.completeLesson($route.params.lessonId as string)
        .then(() => {
            $router.push({
                name: 'viewer-course',
                params: {
                    courseId: $route.params.courseId
                }
            })
        }).catch((error) => {
            // show error notification
            pageStatus.value = PageStatus.error
        })
}

watch(() => pageId, (value) => {
    if (value) {
        updateContent()
    } else {
        // history back triggered
    }
})

updateContent()
</script>
<i18n>
{
    "en": {
        "next": "Next page",
        "done": "Complete the lesson",
        "save-feedback":  "Send the feedback"
    }
}
</i18n>
