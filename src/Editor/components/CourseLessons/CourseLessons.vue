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
import type { TLesson } from '@/types/api/editor-responses'

export default defineComponent({
    props: {
        lessons: {
            type: Array,
            default: () => [] as TLesson[]
        },
        courseId: {
            type: String,
            required: true
        }
    },
    emits: {
        saveLesson: (lesson: TLesson) => !!lesson
    },

    data() {
        return {
            changeLessonTimeout: 0,
            computedLessons: [] as TLesson[]
        }
    },
    watch: {
        lessons: {
            handler(val: TLesson[]) {
                this.computedLessons = val.map((el: TLesson) => ({ ...el }))
            },
            deep: true
        }
    },

    created() {
        this.computedLessons = (this.lessons as TLesson[]).map((el: TLesson) => ({ ...el }))
    },

    methods: {
        lessonChanged(lesson: TLesson) {
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
