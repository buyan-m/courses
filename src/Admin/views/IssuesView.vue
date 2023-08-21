<template>
    <SingleColumnLayout>
        <IssueRow
            v-for="issue in issues"
            :key="issue._id"
            :issue="issue"
        />
        <div :class="$style.footer">
            {{ offset }} - {{ issues.length }} / {{ count }}
            <el-button @click="loadNextPage">
                ➡️
            </el-button>
        </div>
    </SingleColumnLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import request from '@/utils/request'
import { AdminIssuesResponse } from '@/types/api-types'
import SingleColumnLayout from '@/layouts/columns/SingleColumnLayout.vue'
import IssueRow from '@/Admin/components/IssueRow/IssueRow.vue'

type TFilter = {
    offset: number
}

export default defineComponent({
    components: {
        SingleColumnLayout,
        IssueRow
    },
    data() {
        return {
            issues: [] as AdminIssuesResponse['items'],
            count: 0,
            offset: 0
        }
    },
    mounted() {
        if (Array.isArray(this.$route.query.offset) || !this.$route.query.offset) {
            this.offset = 0
        } else {
            this.offset = parseInt(this.$route.query.offset, 10) || 0
        }

        this.getIssues({ offset: this.offset })
    },
    methods: {
        getIssues({ offset }: TFilter) {
            request<AdminIssuesResponse>(`/api/admin/issues?offset=${offset}`).then(({ data }) => {
                if (data) {
                    this.issues = data.items
                    this.count = data.count
                }
            })
        },

        loadNextPage() {
            this.offset += this.issues.length
            this.getIssues({ offset: this.offset })
        }
    }
})
</script>
<style module>
.footer {
    margin-top: 10px;
}
</style>
