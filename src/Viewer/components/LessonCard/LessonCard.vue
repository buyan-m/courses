<template>
    <router-link :to="targetLink">
        <el-card
            shadow="never"
        >
            <div :class="$style.heading">
                {{ lesson.name }}
                <span v-if="lesson.completed">✅</span>
            </div>
            <p :class="$style.description">
                {{ lesson.pages.length }} pages
            </p>
        </el-card>
    </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
    props: {
        lesson: {
            type: Object,
            required: true
        }
    },
    computed: {
        targetLink(): RouteLocationRaw {
            if (!this.lesson.pages[0]) {
                return {}
            }
            return {
                name: 'viewer-lesson-page',
                params: {
                    lessonId: this.lesson._id,
                    pageId: this.lesson.pages[0]._id
                }
            }
        }
    }
})
</script>
<style module>
.heading {
    font-size: var(--el-font-size-large)
}
.description {
    color: var(--el-color-info-rgb)
}
</style>
