<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <ul>
            <li
                v-for="course in featuredCourses"
                :key="course._id"
            >
                <router-link
                    :to="{name: 'viewer-course', params: {courseId: course.course.id}}"
                >
                    {{ course.name }}
                    {{ `${Math.floor(course.progress * 100)}%` }}
                </router-link>
            </li>
        </ul>
        <el-input
            v-model="searchText"
            :class="$style.searchField"
            placeholder="Course name or description"
        />
        <div :class="$style.searchedCourses">
            <CourseCard
                v-for="course in searchedCourses"
                :key="course._id"
                :course="course"
            />
        </div>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import request from '@/utils/request'
import type { TCourseStructure } from '@/types/api/editor-responses'
import { PageStatus } from '@/constants/PageStatus'
import CourseCard from '@/Viewer/components/CourseCard/CourseCard.vue'

export default defineComponent({
    components: { CourseCard, SingleColumnLayout },
    data() {
        return {
            featuredCourses: [] as TCourseStructure[],
            searchText: '',
            searchedCourses: [] as TCourseStructure[],
            searchTimeout: 0,
            searchRequest: new Promise(() => {}),
            searchRequestController: new AbortController(),
            searchState: PageStatus.ready,
            pageStatus: PageStatus.loading
        }
    },
    watch: {
        searchText(val) {
            this.searchRequestController.abort()
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout)
            }
            if (val && val.length > 4) {
                this.searchTimeout = setTimeout(() => this.search(val), 500)
            } else {
                this.searchedCourses = [] as TCourseStructure[]
            }
        }
    },
    created() {
        request<TCourseStructure[]>('/api/viewer/courses/featured').then(({ data, errors }) => {
            if (!errors.length) {
                this.featuredCourses = data!
                this.pageStatus = PageStatus.ready
            } else {
                this.pageStatus = PageStatus.error
            }
        })
    },
    methods: {
        search(text: string) {
            this.searchRequestController = new AbortController()
            const { signal } = this.searchRequestController
            this.searchState = PageStatus.loading
            request<TCourseStructure[]>(
                `/api/viewer/courses/search?text=${encodeURIComponent(text)}`,
                {
                    signal
                }
            )
                .then(({ data, errors }) => {
                    if (!errors.length) {
                        this.searchedCourses = data!
                        this.searchState = PageStatus.ready
                    } else {
                        this.searchState = PageStatus.error
                    }
                })
        }
    }
})
</script>
<style module>
.searchedCourses {
    padding-top: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
.searchField {
    margin-bottom: 20px;
}
</style>
