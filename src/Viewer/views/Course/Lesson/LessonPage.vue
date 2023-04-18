<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h1>
            {{ $store.heading }}
        </h1>
        <LessonPageContent
            :content="$store.pageContent"
            :saved-answers="$store.savedAnswers"
            @answersReceived="answersReceived"
        />
        <el-button
            v-if="$store.nextPage"
            :disabled="!$store.pageCompleted"
            @click="goToNextPage"
        >
            next
        </el-button>
        <el-button
            v-if="!$store.nextPage"
            :disabled="!$store.pageCompleted"
            @click="completeLesson"
        >
            done
        </el-button>
    </SingleColumnLayout>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import LessonPageContent from '@/Viewer/components/LessonPageContent/LessonPageContent.vue'
import { PageStatus } from '@/constants/PageStatus'
import { TTestAnswer } from '@/types/api/learning-responses'
import { useLessonPageStore } from './LessonPage.store'

const $store = useLessonPageStore()
const $route = useRoute()
const $router = useRouter()

const pageStatus = ref<PageStatus>(PageStatus.loading)

const { pageId } = $route.params

function updateContent() {
    pageStatus.value = PageStatus.loading

    return $store.getLessonPage(pageId as string).then(() => {
        pageStatus.value = PageStatus.ready
    }, () => {
        pageStatus.value = PageStatus.error
    })
}

function answersReceived(answers: TTestAnswer[]) {
    $store.setAnswers(answers)
}

function goToNextPage() {
    pageStatus.value = PageStatus.loading

    $store.getNextPage().then((nextPageId) => {
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

    $store.completeLesson($route.params.lessonId as string)
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
