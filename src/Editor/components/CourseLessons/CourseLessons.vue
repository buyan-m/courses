<template>
    <section :class="$style.list">
        <el-card
            v-for="(lesson, index) in computedLessons"
            :key="index"
            :class="$style.lesson"
            shadow="never"
            :data-test-id="`lessonCard.${lesson._id}`"
            data-test="lessonCard"
        >
            <el-input
                v-model="lesson.name"
                type="textarea"
                placeholder="Create new lesson"
                autosize
                resize="none"
                data-test="lessonCard.name"
                @input="lessonChanged(lesson)"
            />
            <div
                v-if="lesson._id"
                :class="$style.pages"
            >
                <div
                    v-for="(page, index) in lesson.pages"
                    :key="page._id + index"
                    :class="$style.page"
                    data-test="lessonPage"
                    :data-test-id="`lessonPage.${page._id}`"
                >
                    <router-link
                        :to="{name: 'editor-lesson-update-page', params: {pageId: page._id, lessonId: lesson._id}}"
                    >
                        {{ page.name }}
                    </router-link>
                </div>
                <router-link
                    :to="{
                        name: 'editor-lesson-new-page',
                        params: { lessonId: lesson._id, courseId: courseId }
                    }"
                >
                    <el-button>
                        {{ $t('New page') }}
                    </el-button>
                </router-link>
            </div>
        </el-card>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { LessonResponse } from '@/types/api-types'

export default defineComponent({
    props: {
        lessons: {
            type: Array,
            default: () => [] as LessonResponse[]
        },
        courseId: {
            type: String,
            required: true
        }
    },
    emits: {
        saveLesson: (lesson: LessonResponse) => !!lesson
    },

    data() {
        return {
            changeLessonTimeout: 0,
            computedLessons: [] as LessonResponse[]
        }
    },
    watch: {
        lessons: {
            handler(val: LessonResponse[]) {
                this.computedLessons = val.map((el: LessonResponse) => ({ ...el }))
            },
            deep: true
        }
    },

    created() {
        this.computedLessons = (this.lessons as LessonResponse[]).map((el) => ({ ...el }))
    },

    methods: {
        lessonChanged(lesson: LessonResponse) {
            if (this.changeLessonTimeout) {
                clearTimeout(this.changeLessonTimeout)
            }
            this.changeLessonTimeout = setTimeout(() => {
                this.changeLessonTimeout = 0
                this.$emit('saveLesson', lesson)
            }, 700)
        }
    }
})
</script>
<style module>
.lesson {
    width: 372px
}
.list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.pages {
    padding-top: 20px;
}
.page:last-of-type {
    margin-bottom: 20px
}
</style>
<i18n>
{
    "en": {
        "New page": "Add a page to lesson"
    },
    "ru": {
        "New page":  "Добавить страницу урока"
    }
}
</i18n>
