<template>
    <router-link
        :class="$style.card"
        :to="{name: 'editor-course-update', params: {courseId: course._id}}"
    >
        <h4>{{ course.name }}</h4>
        <p>{{ course.description }}</p>
    </router-link>
</template>
<script lang="ts">
export default {
    props: {
        course: {
            type: Object,
            required: true
        }
    }
}
</script>
<style module>
.card {
    display: block;
    width: 274px;
    height: 200px;
    border: var(--el-border);
    padding: 20px;

}
.card:hover {
    background-color: var(--el-color-success-light-8);
}
</style>
