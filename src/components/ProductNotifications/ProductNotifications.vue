<template>
    <div
        :class="$style.container"
        data-test="notificationsBlock"
    >
        <ul :class="$style.list">
            <li
                v-for="_id in notifications"
                :key="_id"
                data-test="notification"
                :class="{
                    [$style.newNotification]: notificationsMap[_id].status === NotificationStates.new,
                    [$style.notification]: true
                }"
            >
                <router-link
                    :to="prepareLink(notificationsMap[_id])"
                    @click="readNotification(notificationsMap[_id])"
                >
                    <span
                        :class="$style.text"
                        v-html="prepareDetails(notificationsMap[_id])"
                    />
                </router-link>
                <time
                    :class="$style.time"
                    :datetime="notificationsMap[_id].cdate"
                >
                    {{ prepareTime(notificationsMap[_id].cdate) }}
                </time>
            </li>
            <li
                v-show="hasMore"
                ref="anchor"
                v-loading="state === PageStatus.loading"
                :class="$style.anchor"
            />
        </ul>
        <el-button
            type="primary"
            :class="$style.button"
            @click="readAllNotifications"
        >
            {{ $t('read-all') }}
        </el-button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {
    NotificationsResponse,
    NotificationStates,
    NotificationTypes,
    TNotification
} from '@/types/api-types'
import request from '@/utils/request'
import { PageStatus } from '@/constants/PageStatus'

const NOTIFICATIONS_LIMIT = 10

function prepareTime(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleString()
}

type TNotificationsFilter = {
    offset: number
}

export default defineComponent({
    data() {
        return {
            notifications: [] as string[],
            notificationsMap: {} as Record<string, TNotification>,
            unreadCount: 0,
            NotificationStates,
            PageStatus,
            state: PageStatus.loading,
            observer: null as IntersectionObserver | null,
            totalCount: 0
        }
    },
    computed: {
        hasMore() {
            return this.totalCount > this.notifications.length
        }
    },

    mounted() {
        this.getNotifications({ offset: 0 })
        this.watchForLoadMore()
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect()
        }
    },
    methods: {
        getNotifications({ offset }: TNotificationsFilter) {
            this.state = PageStatus.loading
            request<NotificationsResponse>(`/api/notifications?offset=${offset}&limit=${NOTIFICATIONS_LIMIT}`)
                .then(({ data, errors }) => {
                    if (!errors.length && data?.pageInfo) {
                        data.notifications.forEach((el) => {
                            if (!this.notificationsMap[el._id]) {
                                this.notifications.push(el._id)
                            }
                            this.notificationsMap[el._id] = el
                        })

                        this.notifications.sort((aId, bId) => {
                            if (this.notificationsMap[aId].cdate > this.notificationsMap[bId].cdate) return -1
                            if (this.notificationsMap[aId].cdate < this.notificationsMap[bId].cdate) return 1
                            return 0
                        })

                        this.unreadCount = data.pageInfo.unreadCount
                        this.totalCount = data.pageInfo.totalCount
                        if (
                            NOTIFICATIONS_LIMIT > data.notifications.length
                            && this.totalCount > this.notifications.length
                        ) {
                            this.getNotifications({ offset: 0 })
                        }
                        this.$emit('notification-count-updated', this.unreadCount)
                        setTimeout(() => {
                            this.state = PageStatus.ready
                        }, 500)
                    } else {
                        this.state = PageStatus.error
                    }
                })
        },

        watchForLoadMore() {
            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting
                && this.state === PageStatus.ready
                && this.notifications.length < this.totalCount
                && entries[0].boundingClientRect.height > 10
                ) {
                    // debugger
                    this.getNotifications({ offset: this.notifications.length })
                }
            }, { threshold: 0.2 })
            this.observer.observe(this.$refs.anchor as Element)
        },
        prepareDetails(notification: TNotification): string {
            if (notification.type === NotificationTypes.courseInvitation) {
                return this.$t(NotificationTypes.courseInvitation, {
                    username: notification.details.inviter.name,
                    courseTitle: notification.details.course.name
                })
            }
            if (notification.type === NotificationTypes.pagePass) {
                return this.$t(NotificationTypes.pagePass, {
                    username: notification.details.student.name,
                    courseTitle: notification.details.course.name,
                    lesson: notification.details.lesson.name
                })
            }

            if (notification.type === NotificationTypes.feedbackReceived) {
                return this.$t(NotificationTypes.feedbackReceived, {
                    username: notification.details.teacher.name,
                    courseTitle: notification.details.course.name,
                    lesson: notification.details.lesson.name
                })
            }
            return ''
        },

        prepareLink(notification: TNotification) {
            if (notification.type === NotificationTypes.courseInvitation) {
                return {
                    name: 'viewer-course',
                    params: {
                        courseId: notification.details.course._id
                    }
                }
            }

            if (notification.type === NotificationTypes.pagePass) {
                return {
                    name: 'viewer-lesson-teacher-page',
                    params: {
                        courseId: notification.details.course._id,
                        lessonId: notification.details.lesson._id,
                        studentId: notification.details.student._id,
                        pageId: notification.details.page._id
                    }
                }
            }

            if (notification.type === NotificationTypes.feedbackReceived) {
                return {
                    name: 'viewer-lesson-page',
                    params: {
                        courseId: notification.details.course._id,
                        lessonId: notification.details.lesson._id,
                        pageId: notification.details.page._id
                    }
                }
            }

            return {}
        },

        readAllNotifications() {
            request('/api/notifications/read-all', { method: 'put' })
                .then(({ errors }) => {
                    if (!errors.length) {
                        Object.values(this.notificationsMap).forEach((el) => {
                            // eslint-disable-next-line no-param-reassign
                            el.status = NotificationStates.viewed
                        })
                        this.unreadCount = 0
                        this.$emit('notification-count-updated', 0)
                    }
                })
        },

        readNotification(notification: TNotification) {
            if (notification.status === NotificationStates.new) {
                return request(`/api/notifications/read/${notification._id}`, { method: 'put' })
                    .then(({ errors }) => {
                        if (!errors.length) {
                        // eslint-disable-next-line no-param-reassign
                            notification.status = NotificationStates.viewed
                            this.unreadCount -= 1
                            this.$emit('notification-count-updated', this.unreadCount)
                        }
                    })
            }
            return undefined
        },

        prepareTime
    }
})
</script>
<i18n>
{
    "en": {
        "courseInvitation": "<b>{username}</b> invited you to join the course <b>{courseTitle}</b>",
        "pagePass": "<b>{username}</b> has passed the test in lesson <b>{lesson}</b> from <b>{courseTitle}</b>",
        "feedbackReceived": "<b>{username}</b> has checked your test in lesson <b>{lesson}</b> from <b>{courseTitle}</b>",
        "read-all": "Read all"
    }
}
</i18n>
<style module>
.newNotification {
    background-color: var(--el-fill-color-darker);
}
.list {
    width: 350px;
    list-style: none;
    padding: 0;
    max-height: 400px;
    overflow: auto;
}
.notification {
    padding: 10px 20px 20px 20px;
    position: relative;
    border-bottom: var(--el-border);
}
.time {
    font-size: var(--el-font-size-small);
    position: absolute;
    bottom: 5px;
    right: 20px;
}
.text {
    font-size: var(--el-font-size-base);
    white-space: pre-wrap;
}
.button {
    margin: 10px 20px 5px 20px;
    align-self: end;
}
.container {
    display: flex;
    flex-direction: column;
}
.anchor {
    height: 60px;
}
</style>
