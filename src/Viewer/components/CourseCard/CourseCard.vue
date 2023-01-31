<template>
    <router-link :to="{name: 'viewer-course', params: {courseId: course._id}}">
        <el-card :class="$style.card">
            <div :class="$style.heading">
                {{ course.name }}
            </div>
            <p :class="$style.description">
                {{ course.description }}
            </p>
        </el-card>
    </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        course: {
            type: Object,
            required: true
        }
    }
})
</script>
<style module>
.card {
    width: 300px;
}
.heading {
    font-size: var(--el-font-size-large)
}
.description {
    color: var(--el-color-info-rgb)
}
</style>
