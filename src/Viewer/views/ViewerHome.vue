<template>
    <SingleColumnLayout v-loading="pageStatus === 'loading'">
        <h2>{{ $t('featured') }}</h2>
        <div :class="$style.featuredCourses">
            <CourseCard
                v-for="course in featuredCourses"
                :key="course._id"
                :course="course"
            />
        </div>
        <h2>{{ $t('search') }}</h2>
        <el-input
            v-model="searchText"
            :class="$style.searchField"
            :placeholder="$t('search-placeholder')"
        >
            <template #prefix>
                🔍
            </template>
        </el-input>

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
import { PageStatus } from '@/constants/PageStatus'
import CourseCard from '@/Viewer/components/CourseCard/CourseCard.vue'
import type { ViewerCourseResponse } from '@/types/api-types'

export default defineComponent({
    components: { CourseCard, SingleColumnLayout },
    data() {
        return {
            featuredCourses: [] as ViewerCourseResponse[],
            searchText: '',
            searchedCourses: [] as ViewerCourseResponse[],
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
                this.searchedCourses = [] as ViewerCourseResponse[]
            }
        }
    },
    created() {
        request<ViewerCourseResponse>('/api/viewer/courses/featured').then(({ data, errors }) => {
            if (!errors.length && data) {
                this.featuredCourses = [data]
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
            request<ViewerCourseResponse[]>(
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
.featuredCourses {
    padding-bottom: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
.searchField {
    margin-bottom: 20px;
}
</style>
<i18n>
{
    "ru": {
        "search-placeholder": "Поиск по имени или описанию курса",
        "featured": "Актуальные курсы",
        "search": "Поиск"
    },
    "en": {
        "search-placeholder": "Search for course name or description",
        "featured": "Popular courses",
        "search": "Search"
    }
}
</i18n>
