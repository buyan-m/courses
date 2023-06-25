<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <p
            v-if="pageStatus === 'error'"
            :class="$style.error"
            data-test="errorText"
        >
            {{ errorText }}
        </p>
        <template v-else>
            <h1>
                {{ $lessonStore.heading }}
            </h1>
            <LessonPageContent
                :content="$lessonStore.pageContent"
                :saved-answers="$lessonStore.savedAnswers"
                :is-teacher="$lessonStore.isUserTeacher"
                @answer-received="answerReceived"
                @feedback-updated="updateFeedback"
            />
            <template v-if="!$lessonStore.isUserTeacher">
                <el-button
                    v-if="$lessonStore.nextPage"
                    :disabled="!$lessonStore.pageCompleted"
                    type="primary"
                    data-test="nextPage"
                    @click="goToNextPage"
                >
                    {{ $t('next') }}
                </el-button>
                <el-button
                    v-if="!$lessonStore.nextPage"
                    :disabled="!$lessonStore.pageCompleted"
                    type="primary"
                    data-test="completeLesson"
                    @click="completeLesson"
                >
                    {{ $t('done') }}
                </el-button>
            </template>
            <template v-else>
                <el-button
                    data-test="resetAnswers"
                    type="danger"
                    @click="resetAnswers"
                >
                    {{ $t('reset') }}
                </el-button>
                <el-button
                    v-if="isSaveFeedbackAvailable"
                    type="warning"
                    @click="cancelFeedback"
                >
                    {{ $t('cancel') }}
                </el-button>
                <el-button
                    v-if="$lessonStore.isUserTeacher"
                    :disabled="!isSaveFeedbackAvailable"
                    type="primary"
                    data-test="feedbackSend"
                    @click="sendFeedback"
                >
                    {{ $t('save-feedback') }}
                </el-button>
            </template>
        </template>
    </SingleColumnLayout>
</template>
<script lang="ts" setup>
import { ref, watch, useCssModule } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import LessonPageContent from '@/Viewer/components/LessonPageContent/LessonPageContent.vue'
import { PageStatus } from '@/constants/PageStatus'
import type { AnswerWithId } from '@/types/api-types'
import { useLessonPageStore } from './LessonPage.store'

const $lessonStore = useLessonPageStore()
const $route = useRoute()
const $router = useRouter()
const $style = useCssModule()

const pageStatus = ref<PageStatus>(PageStatus.loading)
const isSaveFeedbackAvailable = ref(false)
const errorText = ref('')

function updateContent() {
    pageStatus.value = PageStatus.loading
    return $lessonStore.getLessonPage($route.params.pageId as string, $route.params.studentId as string).then(() => {
        pageStatus.value = PageStatus.ready
    }, (err) => {
        pageStatus.value = PageStatus.error
        errorText.value = err
    })
}

function answerReceived(answer: AnswerWithId) {
    $lessonStore.setAnswer(answer)
}

function sendFeedback() {
    $lessonStore.sendFeedbackToStudent().then(() => {
        $router.push({
            name: 'teacher-students'
        })
    }, (err) => {
        // show the error
    })
}

function cancelFeedback() {
    $router.push({
        name: 'teacher-students'
    })
}

function updateFeedback(answer: AnswerWithId) {
    isSaveFeedbackAvailable.value = true
    $lessonStore.updateFeedback(answer)
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

function resetAnswers() {
    $lessonStore.resetAnswers()
}

watch(() => $route.params.pageId, (value) => {
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
        "save-feedback":  "Send the feedback",
        "cancel": "Cancel",
        "reset": "Reset student's answers"
    }
}
</i18n>
<style module>
.error {
    color: var(--el-color-error)
}
</style>
